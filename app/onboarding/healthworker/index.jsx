import * as Notifications from "expo-notifications";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PersonalInfoWithClinicStep from "../../../components/healthworkerOnboarding/PersonalInfoWithClinicStep";
import PersonalInfoWithoutClinicStep from "../../../components/healthworkerOnboarding/PersonalInfoWithoutClinicStep";
import BackgroundDecor from "../../../components/onboardingShared/BackgroundDecor";
import WelcomeProfileStep from "../../../components/onboardingShared/WelcomeProfileStep";
import LanguageStep from "../../../components/pregnantMotherOnboarding/LanguageStep";
import NotificationStep from "../../../components/pregnantMotherOnboarding/NotificationStep";
import {
  PrimaryButton,
  ProgressDots,
  SecondaryButton,
} from "../../../components/pregnantMotherOnboarding/shared";
import useAppAuth from "../../../hooks/useAppAuth";
import { getAccountAppRoute } from "../../../utils/authRoutes";
import { setAppLanguage } from "../../../utils/appLanguage";
import { requestPushNotificationToken } from "../../../utils/pushNotifications";
import { useTranslation } from "../../../utils/translator";

export default function HealthworkerOnboarding() {
  const router = useRouter();
  const {
    account,
    updateLanguagePreference,
    updateProfileInformation,
    completeOnboarding,
    saveNotificationToken,
  } =
    useAppAuth();
  const { type } = useLocalSearchParams();
  const profileType =
    typeof type === "string" && type === "without-clinic"
      ? "without-clinic"
      : "with-clinic";

  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [profile, setProfile] = useState({
    fullName: "",
    state: "",
    lga: "",
    facilityName: "",
    facilityCode: "",
    occupation: "",
  });
  const [isSubmittingStep, setIsSubmittingStep] = useState(false);
  const hasHydratedRef = useRef(false);
  const lastSavedDraftRef = useRef("");
  const backText = useTranslation("Back");
  const proceedText = useTranslation("Proceed");
  const pleaseWaitText = useTranslation("Please wait...");
  const notificationTitle = useTranslation("Stay updated on every patient moment");
  const notificationDescription = useTranslation(
    "Turn on notifications to receive visit reminders, patient alerts, and important healthworker updates right on time.",
  );

  const updateField = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed =
    step === 0
      ? true
      : step === 1
      ? Boolean(selectedLanguage)
      : step === 2
        ? profileType === "with-clinic"
          ? Boolean(
              profile.fullName.trim() &&
                profile.state.trim() &&
                profile.lga.trim() &&
                profile.facilityName.trim() &&
                profile.facilityCode.trim(),
            )
          : Boolean(
              profile.fullName.trim() &&
                profile.state.trim() &&
                profile.lga.trim() &&
                profile.occupation.trim(),
            )
        : true;

  const onboardingDraft = useMemo(
    () => ({
      selectedLanguage,
      profile,
      profileType,
    }),
    [profile, profileType, selectedLanguage],
  );

  useEffect(() => {
    if (!account || hasHydratedRef.current) return;
    if (account.onboardingCompleted) {
      router.replace(getAccountAppRoute(account));
      return;
    }

    const draft =
      account.onboardingProgress?.flow === "healthworker_onboarding"
        ? account.onboardingProgress?.draft || {}
        : {};

    setSelectedLanguage(draft.selectedLanguage || account.language || "");
    setProfile({
      fullName: draft.profile?.fullName || account.profile?.fullName || "",
      state: draft.profile?.state || account.profile?.state || "",
      lga: draft.profile?.lga || account.profile?.localGovernment || "",
      facilityName: draft.profile?.facilityName || account.profile?.facilityName || "",
      facilityCode: draft.profile?.facilityCode || account.profile?.facilityCode || "",
      occupation: draft.profile?.occupation || account.profile?.occupation || "",
    });
    setStep(
      account.onboardingProgress?.flow === "healthworker_onboarding"
        ? Math.min(account.onboardingProgress?.currentStep || 0, 3)
        : 0,
    );
    hasHydratedRef.current = true;
  }, [account, router]);

  useEffect(() => {
    if (!hasHydratedRef.current || !account || account.onboardingCompleted) return;
    const payloadString = JSON.stringify({ step, onboardingDraft });
    if (payloadString === lastSavedDraftRef.current) return;

    const timer = setTimeout(() => {
      lastSavedDraftRef.current = payloadString;
      completeOnboarding({
        onboardingCompleted: false,
        currentStep: step,
        flow: "healthworker_onboarding",
        draft: onboardingDraft,
      }).catch(() => {
        lastSavedDraftRef.current = "";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [account, completeOnboarding, onboardingDraft, step]);

  const finishOnboarding = async () => {
    setIsSubmittingStep(true);
    try {
      await updateProfileInformation({
        fullName: profile.fullName,
        state: profile.state,
        localGovernment: profile.lga,
        occupation: profile.occupation,
        facilityName: profile.facilityName,
        facilityCode: profile.facilityCode,
      });
      await completeOnboarding({
        onboardingCompleted: true,
        currentStep: 0,
        flow: "",
        draft: {},
      });
      router.replace(
        getAccountAppRoute({
          role: "health_worker",
          healthWorkerType: profileType === "without-clinic" ? "without_clinic" : "with_clinic",
          onboardingCompleted: true,
        }),
      );
    } finally {
      setIsSubmittingStep(false);
    }
  };

  const enableNotificationsAndFinish = async () => {
    try {
      await Notifications.requestPermissionsAsync();
      const expoPushToken = await requestPushNotificationToken();
      if (expoPushToken) {
        await saveNotificationToken({
          platform: Platform.OS === "ios" ? "ios" : "android",
          expoPushToken,
          deviceId: `${Platform.OS}-healthworker`,
          enabled: true,
        });
      }
    } catch (error) {
      console.error("Notification permission error:", error);
    } finally {
      await finishOnboarding();
    }
  };

  const goNext = async () => {
    if (!canProceed) return;
    try {
      setIsSubmittingStep(true);
      if (step === 1) {
        await setAppLanguage(selectedLanguage);
        await updateLanguagePreference(selectedLanguage);
      }

      if (step === 3) {
        await finishOnboarding();
        return;
      }

      setStep((prev) => prev + 1);
    } finally {
      setIsSubmittingStep(false);
    }
  };

  const goBack = () => {
    if (step === 0) {
      router.back();
      return;
    }

    setStep((prev) => prev - 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <BackgroundDecor />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ProgressDots step={step} />

        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {step === 0 ? (
            <WelcomeProfileStep />
          ) : null}

          {step === 1 ? (
            <LanguageStep
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              onSelectLanguage={setAppLanguage}
            />
          ) : null}

          {step === 2 ? (
            profileType === "with-clinic" ? (
              <PersonalInfoWithClinicStep
                values={profile}
                updateField={updateField}
              />
            ) : (
              <PersonalInfoWithoutClinicStep
                values={profile}
                updateField={updateField}
              />
            )
          ) : null}

          {step === 3 ? (
            <NotificationStep
              onEnableNotifications={enableNotificationsAndFinish}
              onSkipNotifications={finishOnboarding}
              title={notificationTitle}
              description={notificationDescription}
              primaryLoading={isSubmittingStep}
              secondaryLoading={isSubmittingStep}
            />
          ) : null}

          <View className="h-36" />
        </ScrollView>

        <View className="px-5 pb-7 pt-2">
          {step === 3 ? null : (
            <View className="flex-row items-center gap-3">
              {step > 0 ? (
                <>
                  <View className="flex-1">
                    <SecondaryButton label={backText} onPress={goBack} />
                  </View>
                  <View className="flex-1">
                    <PrimaryButton
                      label={proceedText}
                      loadingLabel={pleaseWaitText}
                      onPress={goNext}
                      disabled={!canProceed}
                      loading={isSubmittingStep}
                    />
                  </View>
                </>
              ) : (
                <View className="flex-1">
                  <PrimaryButton
                    label={proceedText}
                    loadingLabel={pleaseWaitText}
                    onPress={goNext}
                    disabled={!canProceed}
                    loading={isSubmittingStep}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
