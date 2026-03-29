import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundDecor from "../../../components/onboardingShared/BackgroundDecor";
import useAppAuth from "../../../hooks/useAppAuth";
import { useSelector } from "react-redux";
import { useAppLanguage } from "../../../utils/appLanguage";
import { getAccountAppRoute } from "../../../utils/authRoutes";
import { useTranslation } from "../../../utils/translator";

export default function CurrentUserScreen() {
  const router = useRouter();
  const { initializeAuth, logout } = useAppAuth();
  const authAccount = useSelector((state) => state.auth.account);
  const authInitialized = useSelector((state) => state.auth.initialized);
  const { language, setLanguage } = useAppLanguage();
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRouting, setIsRouting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const welcomeText = useTranslation("Welcome back");
  const loadingText = useTranslation("Loading your space");
  const continueText = useTranslation("Continue to Dashboard");
  const completeProfileText = useTranslation("Complete Profile");
  const completeProfilePromptText = useTranslation("Complete your profile");
  const completeProfileDescriptionText = useTranslation(
    "You still have a few onboarding steps left. Continue from where you stopped when you're ready.",
  );
  const logoutText = useTranslation("Log Out");
  const offlineText = useTranslation("Offline");
  const signedInPromptText = useTranslation("Signed in as");
  const readyJourneyText = useTranslation(
    "Ready to continue your care journey?",
  );
  const finishProfileText = useTranslation(
    "Finish your profile to unlock a smoother AYOMAMA experience.",
  );

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      try {
        if (authInitialized && authAccount) {
          setAccount(authAccount);
          if (authAccount.language) {
            await setLanguage(authAccount.language);
          }
          return;
        }

        const nextAccount = await initializeAuth();
        if (!mounted) return;

        if (!nextAccount) {
          router.replace("/Onboarding");
          return;
        }

        setAccount(nextAccount);
        if (nextAccount.language) {
          await setLanguage(nextAccount.language);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    boot();

    return () => {
      mounted = false;
    };
  }, [authAccount, authInitialized, initializeAuth, router, setLanguage]);

  const accountName =
    account?.profile?.fullName ||
    account?.profile?.facilityName ||
    account?.email ||
    "AYOMAMA User";
  const accountEmail = account?.email || "";
  const accountRole = getRoleBadge(account);
  const isProfileComplete = Boolean(account?.onboardingCompleted);

  const handleContinueToDashboard = () => {
    if (!account) return;
    setIsRouting(true);
    router.replace(getAccountAppRoute(account));
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setAccount(null);
      router.replace("/Onboarding");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <BackgroundDecor />
        <View className="items-center px-6">
          <View className="h-20 w-20 items-center justify-center rounded-2xl bg-white/80">
            <Image
              source={require("../../../assets/images/AyomamaLogo.png")}
              className="h-12 w-12"
              resizeMode="contain"
            />
          </View>
          <ActivityIndicator size="large" color="#006D5B" className="mt-6" />
          <Text className="mt-4 text-sm text-[#5F6C6B]">{loadingText}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!account) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <BackgroundDecor />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between pb-8">
          <View className="flex-row items-center">
            <Image
              source={require("../../../assets/images/AyomamaLogo.png")}
              className="w-24 h-24"
              resizeMode="contain"
            />
            
          </View>
          <Pressable
            onPress={() => router.push("/language-picker")}
            className="flex-row items-center rounded-full border border-primary/10 bg-primary/5 px-3 py-2 active:opacity-70"
          >
            <Ionicons name="globe-outline" size={16} color="#042F40" />
            <Text className="ml-1.5 text-xs font-bold text-primary">
              {LANG_LABEL[language] || language.toUpperCase()}
            </Text>
            <Ionicons
              name="chevron-down"
              size={12}
              color="#042F40"
              style={{ marginLeft: 2 }}
            />
          </Pressable>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-[28px] font-bold tracking-tight text-gray-900">
            {welcomeText},
          </Text>
        </View>

        <View className="mb-8 overflow-hidden rounded-3xl bg-[#006D5B] p-6 shadow-lg">
          <View className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10" />
          <View className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white/5" />

          <View className="flex-row items-center">
            <View className="h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/20">
              <Text className="text-2xl font-bold text-white">
                {getInitials(accountName)}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-white">
                {accountName}
              </Text>
              <Text className="mt-1 text-sm text-white/70">{accountEmail}</Text>
            </View>
          </View>

          <View className="mt-4 self-start rounded-full bg-white/20 px-3 py-1.5">
            <Text className="text-xs font-semibold text-white">
              {accountRole.label}
            </Text>
          </View>
        </View>

        <View className="mb-8 rounded-[26px] border border-white/70 bg-white/85 p-5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED]">
                <Ionicons
                  name={
                    account?.isOffline
                      ? "cloud-offline-outline"
                      : "shield-checkmark-outline"
                  }
                  size={22}
                  color={account?.isOffline ? "#D97706" : "#006D5B"}
                />
              </View>
              <View className="ml-4">
                <Text className="text-[15px] font-semibold text-gray-900">
                  {signedInPromptText}
                </Text>
                <Text className="mt-1 text-sm text-gray-500">
                  {accountRole.label}
                </Text>
              </View>
            </View>
            {account?.isOffline ? (
              <View className="rounded-full bg-amber-50 px-3 py-1.5">
                <Text className="text-xs font-medium text-amber-700">
                  {offlineText}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {!isProfileComplete ? (
          <View className="mb-8 rounded-[26px] border border-[#D9E6E3] bg-white p-5">
            <Text className="text-[18px] font-bold text-[#293231]">
              {completeProfilePromptText}
            </Text>
            <Text className="mt-2 text-[14px] leading-6 text-[#5F6C6B]">
              {completeProfileDescriptionText}
            </Text>
          </View>
        ) : null}

        <View className="mt-auto pb-8">
          <TouchableOpacity
            className="mb-3 h-14 flex-row items-center justify-center rounded-2xl bg-[#006D5B] shadow-sm"
            onPress={handleContinueToDashboard}
            activeOpacity={0.8}
            disabled={isRouting || isLoggingOut}
          >
            {isRouting ? (
              <>
                <ActivityIndicator size="small" color="#fff" />
                <Text className="ml-2 text-base font-semibold text-white">
                  {isProfileComplete ? continueText : completeProfileText}
                </Text>
              </>
            ) : (
              <>
                <Text className="mr-2 text-base font-semibold text-white">
                  {isProfileComplete ? continueText : completeProfileText}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="h-14 flex-row items-center justify-center rounded-2xl bg-gray-100"
            onPress={handleLogout}
            activeOpacity={0.8}
            disabled={isRouting || isLoggingOut}
          >
            {isLoggingOut ? (
              <>
                <ActivityIndicator size="small" color="#374151" />
                <Text className="ml-2 text-base font-semibold text-gray-700">
                  {logoutText}
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="log-out-outline" size={20} color="#374151" />
                <Text className="ml-2 text-base font-semibold text-gray-700">
                  {logoutText}
                </Text>
              </>
            )}
          </TouchableOpacity>

          <Text className="mt-4 text-center text-xs text-gray-400">
            {isProfileComplete ? readyJourneyText : finishProfileText}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const LANG_LABEL = {
  en: "EN",
  ha: "HA",
  yo: "YO",
  ig: "IG",
};

function getRoleBadge(account) {
  if (!account) {
    return { label: "Member" };
  }

  if (account.role === "mother") {
    return {
      label:
        account.motherType === "postpartum"
          ? "Postpartum Mother"
          : "Pregnant Mother",
    };
  }

  if (account.role === "partner") {
    return { label: "Partner" };
  }

  if (account.role === "health_worker") {
    return {
      label:
        account.healthWorkerType === "without_clinic"
          ? "Health Worker Without Clinic"
          : "Health Worker With Clinic",
    };
  }

  return { label: "Member" };
}

function getInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
