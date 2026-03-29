import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundDecor from "../../../components/onboardingShared/BackgroundDecor";
import WelcomeProfileStep from "../../../components/onboardingShared/WelcomeProfileStep";
import LanguageStep from "../../../components/pregnantMotherOnboarding/LanguageStep";
import NotificationStep from "../../../components/pregnantMotherOnboarding/NotificationStep";
import {
  PrimaryButton,
  ProgressDots,
  SecondaryButton,
} from "../../../components/pregnantMotherOnboarding/shared";
import { STEP_TITLES } from "../../../components/partnerOnboarding/constants";
import PersonalInfoStep from "../../../components/partnerOnboarding/PersonalInfoStep";
import QuickSetupStep from "../../../components/partnerOnboarding/QuickSetupStep";
import useAppAuth from "../../../hooks/useAppAuth";
import { getAccountAppRoute } from "../../../utils/authRoutes";
import { setAppLanguage } from "../../../utils/appLanguage";
import { requestPushNotificationToken } from "../../../utils/pushNotifications";
import { useTranslation } from "../../../utils/translator";

export default function PartnerOnboarding() {
  const router = useRouter();
  const setLanguage = setAppLanguage;
  const {
    account,
    updateLanguagePreference,
    updateProfileInformation,
    completeOnboarding,
    saveNotificationToken,
  } =
    useAppAuth();

  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("");
  const [quickSelections, setQuickSelections] = useState([
    "medication",
    "baby-care",
  ]);
  const [isSubmittingStep, setIsSubmittingStep] = useState(false);
  const hasHydratedRef = useRef(false);
  const lastSavedDraftRef = useRef("");
  const backText = useTranslation("Back");
  const proceedText = useTranslation("Proceed");
  const pleaseWaitText = useTranslation("Please wait...");
  const notificationTitle = useTranslation("Stay in sync with every update");
  const notificationDescription = useTranslation(
    "Turn on notifications to get reminders, care updates, and important partner alerts right when they matter.",
  );

  const toggleQuickSelection = (id) => {
    setQuickSelections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const canProceed =
    step === 0
      ? true
      : step === 1
      ? Boolean(selectedLanguage)
      : step === 2
        ? Boolean(fullName.trim() && relationship.trim())
        : step === 3
          ? quickSelections.length > 0
        : true;

  const onboardingDraft = useMemo(
    () => ({
      selectedLanguage,
      fullName,
      relationship,
      quickSelections,
    }),
    [selectedLanguage, fullName, relationship, quickSelections],
  );

  useEffect(() => {
    if (!account || hasHydratedRef.current) return;
    if (account.onboardingCompleted) {
      router.replace(getAccountAppRoute(account));
      return;
    }

    const draft = account.onboardingProgress?.flow === "partner_onboarding"
      ? account.onboardingProgress?.draft || {}
      : {};

    setSelectedLanguage(draft.selectedLanguage || account.language || "");
    setFullName(draft.fullName || account.profile?.fullName || "");
    setRelationship(draft.relationship || account.profile?.relationshipLabel || "");
    setQuickSelections(
      draft.quickSelections ||
        account.profile?.quickSetupSelections ||
        ["medication", "baby-care"],
    );
    setStep(
      account.onboardingProgress?.flow === "partner_onboarding"
        ? Math.min(account.onboardingProgress?.currentStep || 0, STEP_TITLES.length - 1)
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
        flow: "partner_onboarding",
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
        fullName,
        relationshipLabel: relationship,
      });
      await completeOnboarding({
        onboardingCompleted: true,
        quickSetupSelections: quickSelections,
        currentStep: 0,
        flow: "",
        draft: {},
      });
      router.replace(getAccountAppRoute({ role: "partner", onboardingCompleted: true }));
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
          deviceId: `${Platform.OS}-partner`,
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
        await setLanguage(selectedLanguage);
        await updateLanguagePreference(selectedLanguage);
      }

      if (step === STEP_TITLES.length - 1) {
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
              onSelectLanguage={setLanguage}
            />
          ) : null}

          {step === 2 ? (
            <PersonalInfoStep
              fullName={fullName}
              setFullName={setFullName}
              relationship={relationship}
              setRelationship={setRelationship}
            />
          ) : null}

          {step === 3 ? (
            <QuickSetupStep
              selections={quickSelections}
              toggleSelection={toggleQuickSelection}
            />
          ) : null}

          {step === 4 ? (
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
          {step === 4 ? null : (
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
