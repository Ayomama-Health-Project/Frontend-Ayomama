import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { clearStoredTokens, getStoredTokens, persistTokens } from "../utils/authStorage";
import { authApi } from "../services/authApi";
import {
  clearSession,
  hydrateTokens,
  setInitialized,
  setSession,
  updateAccount,
} from "../store/authSlice";

let bootstrapPromise = null;

function mapAccountToLegacyUser(account) {
  if (!account) return null;
  const profile = account.profile || {};
  return {
    id: account.id,
    name: profile.fullName || "",
    fullName: profile.fullName || "",
    email: account.email,
    phone: profile.phoneNumber || "",
    phoneNumber: profile.phoneNumber || "",
    avatar: account.profilePicture || "",
    preferredLanguages: account.language,
    motherType: account.motherType,
    relationshipLabel: profile.relationshipLabel || "",
    facilityName: profile.facilityName || "",
    facilityCode: profile.facilityCode || "",
    state: profile.state || "",
    localGovernment: profile.localGovernment || "",
    occupation: profile.occupation || "",
    emergencyContacts: profile.emergencyContacts || [],
  };
}

export default function useAppAuth() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const authState = useSelector((state) => state.auth);
  const shouldFetchMe =
    Boolean(authState.accessToken) && authState.initialized && !authState.account;

  const meQuery = useQuery({
    queryKey: ["auth", "me", authState.accessToken],
    queryFn: authApi.fetchMe,
    enabled: shouldFetchMe,
    retry: false,
    staleTime: 30_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const sessionMutation = useMutation({
    mutationFn: async ({ action, payload }) => action(payload),
    onSuccess: async (data) => {
      await persistTokens(data.tokens);
      dispatch(
        setSession({
          account: data.account,
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken,
        }),
      );
      queryClient.setQueryData(["auth", "me", data.tokens.accessToken], data.account);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ action, payload }) => action(payload),
    onSuccess: (data) => {
      dispatch(updateAccount(data));
      queryClient.setQueryData(["auth", "me", authState.accessToken], data);
    },
  });

  const notificationMutation = useMutation({
    mutationFn: async (payload) => authApi.createNotificationToken(payload),
    onSuccess: async () => {
      const freshAccount = await authApi.fetchMe();
      dispatch(updateAccount(freshAccount));
      queryClient.setQueryData(["auth", "me", authState.accessToken], freshAccount);
    },
  });

  const bootstrap = useCallback(async () => {
    if (bootstrapPromise) {
      return bootstrapPromise;
    }

    if (authState.initialized && authState.account && authState.accessToken) {
      return authState.account;
    }

    bootstrapPromise = (async () => {
      dispatch(setInitialized(false));
      const stored = await getStoredTokens();

      if (!stored.accessToken && !stored.refreshToken) {
        dispatch(clearSession());
        return null;
      }

      dispatch(hydrateTokens(stored));

      try {
        const account = await authApi.fetchMe();
        dispatch(
          setSession({
            account,
            accessToken: stored.accessToken,
            refreshToken: stored.refreshToken,
          }),
        );
        return account;
      } catch (_error) {
        if (!stored.refreshToken) {
          await clearStoredTokens();
          dispatch(clearSession());
          return null;
        }

        try {
          const refreshed = await authApi.refresh({ refreshToken: stored.refreshToken });
          await persistTokens(refreshed.tokens);
          dispatch(
            setSession({
              account: refreshed.account,
              accessToken: refreshed.tokens.accessToken,
              refreshToken: refreshed.tokens.refreshToken,
            }),
          );
          return refreshed.account;
        } catch (_refreshError) {
          await clearStoredTokens();
          dispatch(clearSession());
          return null;
        }
      } finally {
        dispatch(setInitialized(true));
      }
    })();

    try {
      return await bootstrapPromise;
    } finally {
      bootstrapPromise = null;
    }
  }, [authState.accessToken, authState.account, authState.initialized, dispatch]);

  const refreshUser = useCallback(async () => {
    const account = await authApi.fetchMe();
    dispatch(updateAccount(account));
    queryClient.setQueryData(["auth", "me", authState.accessToken], account);
    return { success: true, data: account };
  }, [authState.accessToken, dispatch, queryClient]);

  const login = (payload) => sessionMutation.mutateAsync({ action: authApi.login, payload });
  const registerMother = (payload) =>
    sessionMutation.mutateAsync({ action: authApi.registerMother, payload });
  const registerPartner = (payload) =>
    sessionMutation.mutateAsync({ action: authApi.registerPartner, payload });
  const registerHealthWorker = (payload) =>
    sessionMutation.mutateAsync({ action: authApi.registerHealthWorker, payload });

  const logoutUser = useCallback(async () => {
    try {
      if (authState.refreshToken) {
        await authApi.logout({ refreshToken: authState.refreshToken });
      }
    } catch (_error) {
      // Best effort logout.
    } finally {
      await clearStoredTokens();
      dispatch(clearSession());
      queryClient.clear();
    }
    return { success: true };
  }, [authState.refreshToken, dispatch, queryClient]);

  const updateLanguagePreference = async (language) => {
    const account = await updateMutation.mutateAsync({
      action: authApi.updateLanguage,
      payload: { language },
    });
    return { success: true, data: account };
  };

  const updateProfileInformation = async (payload) => {
    const account = await updateMutation.mutateAsync({
      action: authApi.updateProfile,
      payload,
    });
    return { success: true, data: account };
  };

  const completeOnboarding = async (payload) => {
    const account = await updateMutation.mutateAsync({
      action: authApi.updateOnboarding,
      payload,
    });
    return { success: true, data: account };
  };

  const submitAntenatalData = async (payload) => updateProfileInformation(payload);

  const saveNotificationToken = async (payload) => {
    await notificationMutation.mutateAsync(payload);
    return { success: true };
  };

  const deleteNotificationToken = async (id) => {
    await authApi.deleteNotificationToken(id);
    const account = await authApi.fetchMe();
    dispatch(updateAccount(account));
    return { success: true };
  };

  const changePassword = (payload) => authApi.changePassword(payload);
  const createPartnerInvite = (payload) => authApi.createPartnerInvite(payload);
  const fetchHealthProfessionals = (limit) => authApi.fetchHealthProfessionals(limit);

  const forgotPassword = (payload) => authApi.forgotPassword(payload);
  const verifyResetOtp = (payload) => authApi.verifyResetOtp(payload);
  const resetPassword = (payload) => authApi.resetPassword(payload);

  const currentAccount = authState.account || meQuery.data || null;
  const user = mapAccountToLegacyUser(currentAccount);

  return {
    account: currentAccount,
    user,
    worker: user,
    token: authState.accessToken,
    refreshToken: authState.refreshToken,
    isAuthenticated: Boolean(authState.accessToken && currentAccount),
    isLoading:
      !authState.initialized ||
      meQuery.isFetching ||
      sessionMutation.isPending ||
      updateMutation.isPending ||
      notificationMutation.isPending,
    initializeAuth: bootstrap,
    refreshUser,
    refreshWorker: refreshUser,
    login,
    registerMother,
    registerPartner,
    registerHealthWorker,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    logout: logoutUser,
    updateLanguagePreference,
    updateProfileInformation,
    submitAntenatalData,
    completeOnboarding,
    saveNotificationToken,
    deleteNotificationToken,
    changePassword,
    createPartnerInvite,
    fetchHealthProfessionals,
  };
}
