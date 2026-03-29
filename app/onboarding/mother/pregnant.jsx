import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import PickerModal from "../../../components/PickerModal";
import WelcomeProfileStep from "../../../components/onboardingShared/WelcomeProfileStep";
import AntenatalStep from "../../../components/pregnantMotherOnboarding/AntenatalStep";
import BackgroundDecor from "../../../components/onboardingShared/BackgroundDecor";
import FollowProfessionalStep from "../../../components/pregnantMotherOnboarding/FollowProfessionalStep";
import LanguageStep from "../../../components/pregnantMotherOnboarding/LanguageStep";
import NotificationStep from "../../../components/pregnantMotherOnboarding/NotificationStep";
import PersonalInfoStep from "../../../components/pregnantMotherOnboarding/PersonalInfoStep";
import PregnancyStep from "../../../components/pregnantMotherOnboarding/PregnancyStep";
import QuickSetupStep from "../../../components/pregnantMotherOnboarding/QuickSetupStep";
import SupportStep from "../../../components/pregnantMotherOnboarding/SupportStep";
import {
  DAYS,
  MONTHS,
  RELATIONSHIP_OPTIONS,
  STEP_TITLES,
  YEARS,
} from "../../../components/pregnantMotherOnboarding/constants";
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

export default function PregnantOnboarding() {
  const router = useRouter();
  const {
    account,
    updateLanguagePreference,
    updateProfileInformation,
    completeOnboarding,
    saveNotificationToken,
    createPartnerInvite,
    fetchHealthProfessionals,
  } = useAppAuth();
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState([
    { phone: "", name: "", relationship: "" },
  ]);
  const [openPicker, setOpenPicker] = useState(null);
  const [pregnancyType, setPregnancyType] = useState("");
  const [dateData, setDateData] = useState({ month: "", day: "", year: "" });
  const [weeks, setWeeks] = useState("");
  const [startedAntenatal, setStartedAntenatal] = useState("");
  const [supportSelection, setSupportSelection] = useState("");
  const [quickSelections, setQuickSelections] = useState([
    "health",
    "tips",
    "community",
    "emergency",
  ]);
  const [followedProfessionals, setFollowedProfessionals] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [isLoadingProfessionals, setIsLoadingProfessionals] = useState(false);
  const [generatedInvite, setGeneratedInvite] = useState(null);
  const [isGeneratingInvite, setIsGeneratingInvite] = useState(false);
  const [isSubmittingStep, setIsSubmittingStep] = useState(false);
  const setLanguage = setAppLanguage;
  const hasHydratedRef = useRef(false);
  const lastSavedDraftRef = useRef("");
  const inviteCreatedText = useTranslation("Invite code created");
  const inviteReadyText = useTranslation("Your partner invite code is ready to share.");
  const inviteFailedText = useTranslation("Invite failed");
  const inviteFailedDetailText = useTranslation("We could not generate an invite right now.");
  const backText = useTranslation("Back");
  const proceedText = useTranslation("Proceed");
  const pleaseWaitText = useTranslation("Please wait...");
  const pickerSelectText = useTranslation("Select");

  const currentPickerOptions =
    openPicker?.kind === "relationship"
      ? RELATIONSHIP_OPTIONS
      : openPicker?.kind === "month"
        ? MONTHS
        : openPicker?.kind === "day"
          ? DAYS
          : YEARS;

  const updateEmergencyContact = (index, field, value) => {
    setEmergencyContacts((prev) =>
      prev.map((contact, currentIndex) =>
        currentIndex === index ? { ...contact, [field]: value } : contact,
      ),
    );
  };

  const addEmergencyContact = () => {
    setEmergencyContacts((prev) => [
      ...prev,
      { phone: "", name: "", relationship: "" },
    ]);
  };

  const removeEmergencyContact = (index) => {
    setEmergencyContacts((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const toggleQuickSelection = (id) => {
    setQuickSelections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleProfessional = (id) => {
    setFollowedProfessionals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const canProceed =
    step === 0
      ? true
      : step === 1
      ? Boolean(selectedLanguage)
      : step === 2
      ? Boolean(
          fullName.trim() &&
            address.trim() &&
            emergencyContacts.length &&
            emergencyContacts.every(
              (contact) =>
                contact.phone.trim() &&
                contact.name.trim() &&
                contact.relationship,
            ),
        )
      : step === 3
        ? pregnancyType === "just_found"
          ? true
          : pregnancyType === "weeks"
            ? Boolean(weeks.trim())
            : Boolean(
                pregnancyType && dateData.month && dateData.day && dateData.year,
              )
        : step === 4
          ? Boolean(startedAntenatal)
          : step === 5
            ? Boolean(supportSelection)
            : true;

  const onboardingDraft = useMemo(
    () => ({
      selectedLanguage,
      fullName,
      address,
      emergencyContacts,
      pregnancyType,
      dateData,
      weeks,
      startedAntenatal,
      supportSelection,
      quickSelections,
      followedProfessionals,
      generatedInvite,
    }),
    [
      selectedLanguage,
      fullName,
      address,
      emergencyContacts,
      pregnancyType,
      dateData,
      weeks,
      startedAntenatal,
      supportSelection,
      quickSelections,
      followedProfessionals,
      generatedInvite,
    ],
  );

  useEffect(() => {
    if (!account || hasHydratedRef.current) return;
    if (account.onboardingCompleted) {
      router.replace(getAccountAppRoute(account));
      return;
    }

    const draft =
      account.onboardingProgress?.flow === "mother_pregnant_onboarding"
        ? account.onboardingProgress?.draft || {}
        : {};
    const restoredEmergencyContacts =
      draft.emergencyContacts ||
      (account.profile?.emergencyContacts || []).map((contact) => ({
        phone: contact.phoneNumber || "",
        name: contact.name || "",
        relationship: contact.relationship || "",
      }));

    setSelectedLanguage(draft.selectedLanguage || account.language || "");
    setFullName(draft.fullName || account.profile?.fullName || "");
    setAddress(draft.address || account.profile?.address || "");
    setEmergencyContacts(
      restoredEmergencyContacts?.length
        ? restoredEmergencyContacts
        : [{ phone: "", name: "", relationship: "" }],
    );
    setPregnancyType(draft.pregnancyType || "");
    setDateData(draft.dateData || { month: "", day: "", year: "" });
    setWeeks(draft.weeks || (account.profile?.pregnancyWeek ? String(account.profile.pregnancyWeek) : ""));
    setStartedAntenatal(draft.startedAntenatal || account.profile?.antenatalProvider || "");
    setSupportSelection(
      draft.supportSelection ||
        account.profile?.supportCircle?.[0] ||
        "",
    );
    setQuickSelections(
      draft.quickSelections ||
        account.profile?.quickSetupSelections ||
        ["health", "tips", "community", "emergency"],
    );
    setFollowedProfessionals(draft.followedProfessionals || []);
    setGeneratedInvite(draft.generatedInvite || null);
    setStep(
      account.onboardingProgress?.flow === "mother_pregnant_onboarding"
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
        flow: "mother_pregnant_onboarding",
        draft: onboardingDraft,
        quickSetupSelections: quickSelections,
        supportCircle: supportSelection ? [supportSelection] : [],
      }).catch(() => {
        lastSavedDraftRef.current = "";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [account, completeOnboarding, onboardingDraft, quickSelections, step, supportSelection]);

  useEffect(() => {
    let mounted = true;
    if (!account || step !== 7 || professionals.length > 0) return undefined;

    const loadProfessionals = async () => {
      try {
        setIsLoadingProfessionals(true);
        const result = await fetchHealthProfessionals(5);
        if (!mounted) return;
        setProfessionals(result || []);
      } catch (_error) {
        if (mounted) {
          setProfessionals([]);
        }
      } finally {
        if (mounted) {
          setIsLoadingProfessionals(false);
        }
      }
    };

    loadProfessionals();

    return () => {
      mounted = false;
    };
  }, [account, fetchHealthProfessionals, professionals.length, step]);

  const handlePickerSelect = (item) => {
    if (openPicker?.kind === "relationship") {
      updateEmergencyContact(openPicker.index, "relationship", item);
    } else if (
      openPicker?.kind === "month" ||
      openPicker?.kind === "day" ||
      openPicker?.kind === "year"
    ) {
      setDateData((prev) => ({ ...prev, [openPicker.kind]: item }));
    }
    setOpenPicker(null);
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
        router.replace("/(pregnant-women-tabs)");
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

  const finishOnboarding = async () => {
    setIsSubmittingStep(true);
    try {
      await updateProfileInformation({
        fullName,
        address,
        emergencyContacts: emergencyContacts.map((contact) => ({
          name: contact.name,
          phoneNumber: contact.phone,
          relationship: contact.relationship,
        })),
        ...(pregnancyType === "weeks" ? { pregnancyWeek: Number(weeks || 0) } : {}),
        ...(pregnancyType === "last_period"
          ? {
              lastPeriodDate:
                dateData.year && dateData.month && dateData.day
                  ? new Date(
                      `${dateData.year}-${String(
                        MONTHS.indexOf(dateData.month) + 1,
                      ).padStart(2, "0")}-${String(dateData.day).padStart(2, "0")}`,
                    ).toISOString()
                  : undefined,
            }
          : {}),
        antenatalProvider: startedAntenatal,
      });
      await completeOnboarding({
        onboardingCompleted: true,
        quickSetupSelections: quickSelections,
        supportCircle: supportSelection ? [supportSelection] : [],
        currentStep: 0,
        flow: "",
        draft: {},
      });
      router.replace(
        getAccountAppRoute({ role: "mother", motherType: "pregnant", onboardingCompleted: true }),
      );
    } finally {
      setIsSubmittingStep(false);
    }
  };

  const handleGenerateInvite = async () => {
    try {
      setIsGeneratingInvite(true);
      const invite = await createPartnerInvite({});
      setGeneratedInvite(invite);
      Toast.show({
        type: "success",
        text1: inviteCreatedText,
        text2: inviteReadyText,
        position: "top",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: inviteFailedText,
        text2: error?.response?.data?.detail || inviteFailedDetailText,
        position: "top",
      });
    } finally {
      setIsGeneratingInvite(false);
    }
  };

  const enableNotificationsAndFinish = async () => {
    setIsSubmittingStep(true);
    try {
      await Notifications.requestPermissionsAsync();
      const expoPushToken = await requestPushNotificationToken();
      if (expoPushToken) {
        await saveNotificationToken({
          platform: Platform.OS === "ios" ? "ios" : "android",
          expoPushToken,
          deviceId: `${Platform.OS}-mother`,
          enabled: true,
        });
      }
    } catch (error) {
      console.error("Notification permission error:", error);
    } finally {
      await finishOnboarding();
    }
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
              address={address}
              setAddress={setAddress}
              emergencyContacts={emergencyContacts}
              updateEmergencyContact={updateEmergencyContact}
              addEmergencyContact={addEmergencyContact}
              removeEmergencyContact={removeEmergencyContact}
              onOpenRelationship={(index) =>
                setOpenPicker({ kind: "relationship", index })
              }
            />
          ) : null}

          {step === 3 ? (
            <PregnancyStep
              pregnancyType={pregnancyType}
              setPregnancyType={setPregnancyType}
              dateData={dateData}
              weeks={weeks}
              setWeeks={setWeeks}
              onOpenPicker={(kind) => setOpenPicker({ kind })}
              onContinue={goNext}
              canContinue={canProceed}
            />
          ) : null}

          {step === 4 ? (
            <AntenatalStep
              startedAntenatal={startedAntenatal}
              setStartedAntenatal={setStartedAntenatal}
            />
          ) : null}

          {step === 5 ? (
            <SupportStep
              supportSelection={supportSelection}
              setSupportSelection={setSupportSelection}
              generatedInvite={generatedInvite}
              onGenerateInvite={handleGenerateInvite}
              isGeneratingInvite={isGeneratingInvite}
            />
          ) : null}

          {step === 6 ? (
            <QuickSetupStep
              selections={quickSelections}
              toggleSelection={toggleQuickSelection}
            />
          ) : null}

          {step === 7 ? (
            <FollowProfessionalStep
              followedProfessionals={followedProfessionals}
              toggleProfessional={toggleProfessional}
              professionals={professionals}
              isLoading={isLoadingProfessionals}
            />
          ) : null}

          {step === 8 ? (
            <NotificationStep
              onEnableNotifications={enableNotificationsAndFinish}
              onSkipNotifications={finishOnboarding}
              primaryLoading={isSubmittingStep}
              secondaryLoading={isSubmittingStep}
            />
          ) : null}

          <View className="h-36" />
        </ScrollView>

        <View className="px-5 pb-7 pt-2">
          {step === 8 ? null : step === 3 ? (
            <SecondaryButton label={backText} onPress={goBack} />
          ) : (
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

        <PickerModal
          visible={openPicker !== null}
          options={currentPickerOptions}
          onSelect={handlePickerSelect}
          onClose={() => setOpenPicker(null)}
          title={`${pickerSelectText} ${openPicker?.kind || "option"}`}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
