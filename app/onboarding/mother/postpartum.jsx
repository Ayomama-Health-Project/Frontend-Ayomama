import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import PickerModal from "../../../components/PickerModal";
import BackgroundDecor from "../../../components/onboardingShared/BackgroundDecor";
import WelcomeProfileStep from "../../../components/onboardingShared/WelcomeProfileStep";
import LanguageStep from "../../../components/pregnantMotherOnboarding/LanguageStep";
import NotificationStep from "../../../components/pregnantMotherOnboarding/NotificationStep";
import {
  DAYS,
  MONTHS,
  YEARS,
} from "../../../components/pregnantMotherOnboarding/constants";
import {
  PrimaryButton,
  ProgressDots,
  SecondaryButton,
} from "../../../components/pregnantMotherOnboarding/shared";
import BabyBirthInformationStep from "../../../components/postpartumMotherOnboarding/BabyBirthInformationStep";
import BabyDetailsStep from "../../../components/postpartumMotherOnboarding/BabyDetailsStep";
import BabyNicknameStep from "../../../components/postpartumMotherOnboarding/BabyNicknameStep";
import {
  STEP_TITLES,
  RELATIONSHIP_OPTIONS,
} from "../../../components/postpartumMotherOnboarding/constants";
import FollowProfessionalStep from "../../../components/postpartumMotherOnboarding/FollowProfessionalStep";
import MotherRecoveryStep from "../../../components/postpartumMotherOnboarding/MotherRecoveryStep";
import PersonalInfoStep from "../../../components/postpartumMotherOnboarding/PersonalInfoStep";
import SupportStep from "../../../components/postpartumMotherOnboarding/SupportStep";
import useAppAuth from "../../../hooks/useAppAuth";
import { getAccountAppRoute } from "../../../utils/authRoutes";
import { setAppLanguage } from "../../../utils/appLanguage";
import { requestPushNotificationToken } from "../../../utils/pushNotifications";
import { useTranslation } from "../../../utils/translator";

export default function PostpartumOnboarding() {
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
  const [personalEmergencyContacts, setPersonalEmergencyContacts] = useState([
    { phone: "", name: "", relationship: "" },
  ]);
  const [babyAge, setBabyAge] = useState("");
  const [babyDob, setBabyDob] = useState({ month: "", day: "", year: "" });
  const [showAgeOptions, setShowAgeOptions] = useState(false);
  const [birthInfo, setBirthInfo] = useState({
    hospital: "",
    immunization: "",
    notes: "",
    weight: "",
  });
  const [babyNickname, setBabyNickname] = useState("");
  const [feelings, setFeelings] = useState([]);
  const [supportSelection, setSupportSelection] = useState("");
  const [followedProfessionals, setFollowedProfessionals] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [isLoadingProfessionals, setIsLoadingProfessionals] = useState(false);
  const [openPicker, setOpenPicker] = useState(null);
  const [generatedInvite, setGeneratedInvite] = useState(null);
  const [isGeneratingInvite, setIsGeneratingInvite] = useState(false);
  const [isSubmittingStep, setIsSubmittingStep] = useState(false);
  const setLanguage = setAppLanguage;
  const hasHydratedRef = useRef(false);
  const lastSavedDraftRef = useRef("");
  const backText = useTranslation("Back");
  const proceedText = useTranslation("Proceed");
  const pleaseWaitText = useTranslation("Please wait...");
  const pickerSelectText = useTranslation("Select");
  const inviteCreatedText = useTranslation("Invite code created");
  const inviteReadyText = useTranslation("Your partner invite code is ready to share.");
  const inviteFailedText = useTranslation("Invite failed");
  const inviteFailedDetailText = useTranslation("We could not generate an invite right now.");
  const notificationTitle = useTranslation("Never miss out on your daily routine");
  const notificationDescription = useTranslation("When turn on, we will remind you of all your activities through out day");

  const currentPickerOptions =
    openPicker?.kind === "relationship"
      ? RELATIONSHIP_OPTIONS
      : openPicker?.kind === "month"
        ? MONTHS
        : openPicker?.kind === "day"
          ? DAYS
          : YEARS;

  const updatePersonalEmergencyContact = (index, field, value) => {
    setPersonalEmergencyContacts((prev) =>
      prev.map((contact, currentIndex) =>
        currentIndex === index ? { ...contact, [field]: value } : contact,
      ),
    );
  };

  const addPersonalEmergencyContact = () => {
    setPersonalEmergencyContacts((prev) => [
      ...prev,
      { phone: "", name: "", relationship: "" },
    ]);
  };

  const removePersonalEmergencyContact = (index) => {
    setPersonalEmergencyContacts((prev) =>
      prev.length === 1
        ? prev
        : prev.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const toggleFeeling = (id) => {
    setFeelings((prev) =>
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
              personalEmergencyContacts.every(
                (contact) =>
                  contact.phone.trim() &&
                  contact.name.trim() &&
                  contact.relationship,
              ),
          )
        : step === 3
          ? Boolean(babyAge && babyDob.month && babyDob.day && babyDob.year)
          : step === 4
            ? Boolean(
                birthInfo.hospital.trim() &&
                  birthInfo.immunization &&
                  birthInfo.weight.trim(),
              )
            : step === 5
              ? true
              : step === 6
                ? feelings.length > 0
                : step === 7
                  ? Boolean(supportSelection)
                  : true;

  const onboardingDraft = useMemo(
    () => ({
      selectedLanguage,
      fullName,
      address,
      personalEmergencyContacts,
      babyAge,
      babyDob,
      birthInfo,
      babyNickname,
      feelings,
      supportSelection,
      followedProfessionals,
      generatedInvite,
    }),
    [
      selectedLanguage,
      fullName,
      address,
      personalEmergencyContacts,
      babyAge,
      babyDob,
      birthInfo,
      babyNickname,
      feelings,
      supportSelection,
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
      account.onboardingProgress?.flow === "mother_postpartum_onboarding"
        ? account.onboardingProgress?.draft || {}
        : {};
    const restoredEmergencyContacts =
      draft.personalEmergencyContacts ||
      (account.profile?.emergencyContacts || []).map((contact) => ({
        phone: contact.phoneNumber || "",
        name: contact.name || "",
        relationship: contact.relationship || "",
      }));

    setSelectedLanguage(draft.selectedLanguage || account.language || "");
    setFullName(draft.fullName || account.profile?.fullName || "");
    setAddress(draft.address || account.profile?.address || "");
    setPersonalEmergencyContacts(
      restoredEmergencyContacts?.length
        ? restoredEmergencyContacts
        : [{ phone: "", name: "", relationship: "" }],
    );
    setBabyAge(draft.babyAge || "");
    setBabyDob(draft.babyDob || { month: "", day: "", year: "" });
    setBirthInfo(
      draft.birthInfo || {
        hospital: account.profile?.babyBirthHospital || "",
        immunization: "",
        notes: account.profile?.babyName || "",
        weight: account.profile?.babyBirthWeight || "",
      },
    );
    setBabyNickname(draft.babyNickname || account.profile?.babyNickname || "");
    setFeelings(draft.feelings || []);
    setSupportSelection(draft.supportSelection || account.profile?.supportCircle?.[0] || "");
    setFollowedProfessionals(draft.followedProfessionals || []);
    setGeneratedInvite(draft.generatedInvite || null);
    setStep(
      account.onboardingProgress?.flow === "mother_postpartum_onboarding"
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
        flow: "mother_postpartum_onboarding",
        draft: onboardingDraft,
        supportCircle: supportSelection ? [supportSelection] : [],
      }).catch(() => {
        lastSavedDraftRef.current = "";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [account, completeOnboarding, onboardingDraft, step, supportSelection]);

  useEffect(() => {
    let mounted = true;
    if (!account || step !== 8 || professionals.length > 0) return undefined;

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
      updatePersonalEmergencyContact(openPicker.index, "relationship", item);
    } else if (
      openPicker?.kind === "month" ||
      openPicker?.kind === "day" ||
      openPicker?.kind === "year"
    ) {
      setBabyDob((prev) => ({ ...prev, [openPicker.kind]: item }));
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
        router.replace("/(post-partum-women-tabs)");
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
        emergencyContacts: personalEmergencyContacts.map((contact) => ({
          name: contact.name,
          phoneNumber: contact.phone,
          relationship: contact.relationship,
        })),
        babyName: birthInfo.notes || "",
        babyNickname,
        babyBirthDate:
          babyDob.year && babyDob.month && babyDob.day
            ? new Date(
                `${babyDob.year}-${String(MONTHS.indexOf(babyDob.month) + 1).padStart(
                  2,
                  "0",
                )}-${String(babyDob.day).padStart(2, "0")}`,
              ).toISOString()
            : undefined,
        babyBirthWeight: birthInfo.weight,
        babyBirthHospital: birthInfo.hospital,
        healthConcerns: feelings.join(", "),
      });
      await completeOnboarding({
        onboardingCompleted: true,
        supportCircle: supportSelection ? [supportSelection] : [],
        currentStep: 0,
        flow: "",
        draft: {},
      });
      router.replace(
        getAccountAppRoute({
          role: "mother",
          motherType: "postpartum",
          onboardingCompleted: true,
        }),
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
          deviceId: `${Platform.OS}-postpartum`,
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
              emergencyContacts={personalEmergencyContacts}
              updateEmergencyContact={updatePersonalEmergencyContact}
              addEmergencyContact={addPersonalEmergencyContact}
              removeEmergencyContact={removePersonalEmergencyContact}
              onOpenRelationship={(index) =>
                setOpenPicker({ kind: "relationship", scope: "personal", index })
              }
            />
          ) : null}

          {step === 3 ? (
            <BabyDetailsStep
              babyAge={babyAge}
              setBabyAge={setBabyAge}
              babyDob={babyDob}
              onOpenPicker={(kind) => setOpenPicker({ kind })}
              showAgeOptions={showAgeOptions}
              setShowAgeOptions={setShowAgeOptions}
              onContinue={goNext}
              canContinue={canProceed}
            />
          ) : null}

          {step === 4 ? (
            <BabyBirthInformationStep
              birthInfo={birthInfo}
              setBirthInfo={setBirthInfo}
            />
          ) : null}

          {step === 5 ? (
            <BabyNicknameStep
              nickname={babyNickname}
              setNickname={setBabyNickname}
            />
          ) : null}

          {step === 6 ? (
            <MotherRecoveryStep
              feelings={feelings}
              toggleFeeling={toggleFeeling}
            />
          ) : null}

          {step === 7 ? (
            <SupportStep
              supportSelection={supportSelection}
              setSupportSelection={setSupportSelection}
              generatedInvite={generatedInvite}
              onGenerateInvite={handleGenerateInvite}
              isGeneratingInvite={isGeneratingInvite}
            />
          ) : null}

          {step === 8 ? (
            <FollowProfessionalStep
              followedProfessionals={followedProfessionals}
              toggleProfessional={toggleProfessional}
              professionals={professionals}
              isLoading={isLoadingProfessionals}
            />
          ) : null}

          {step === 9 ? (
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
          {step === 9 ? null : step === 3 ? (
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
