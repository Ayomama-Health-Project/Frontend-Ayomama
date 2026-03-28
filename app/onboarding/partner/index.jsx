import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data ────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { id: "en", flag: "🇬🇧", label: "English" },
  { id: "yo", flag: "🇳🇬", label: "Yoruba" },
  { id: "ha", flag: "🇳🇬", label: "Hausa" },
  { id: "ig", flag: "🇳🇬", label: "Igbo" },
];

const SUPPORT_ITEMS = [
  { id: "medication", icon: "medkit-outline", label: "Medication reminders" },
  { id: "baby_care", icon: "happy-outline", label: "Baby care updates" },
  { id: "wound_care", icon: "bandage-outline", label: "Wound care monitoring" },
  { id: "appointments", icon: "calendar-outline", label: "Appointment alerts" },
];

// ─── Shared ───────────────────────────────────────────────────────────────────

const BgBlobs = () => (
  <View className="absolute inset-0 overflow-hidden">
    <View
      style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "rgba(59, 130, 246, 0.10)",
        top: -90,
        right: -70,
      }}
    />
    <View
      style={{
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "rgba(41, 50, 49, 0.06)",
        bottom: -70,
        left: -70,
      }}
    />
  </View>
);

const ProgressDots = ({ total, current }) => (
  <View className="flex-row items-center justify-center gap-2 mb-8">
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={{
          width: i === current ? 24 : 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: i === current ? "#293231" : "#D1D5DB",
        }}
      />
    ))}
  </View>
);

// ─── Steps ───────────────────────────────────────────────────────────────────

const Step1Language = ({ selected, onSelect }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Language Preferred
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Which language do you prefer?
    </Text>

    <View className="gap-3">
      {LANGUAGES.map((lang) => {
        const isSelected = selected === lang.id;
        return (
          <TouchableOpacity
            key={lang.id}
            onPress={() => onSelect(lang.id)}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 18,
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: isSelected ? "#293231" : "#E5E7EB",
              backgroundColor: isSelected ? "#293231" : "#FFFFFF",
            }}
          >
            <Text style={{ fontSize: 24, marginRight: 14 }}>{lang.flag}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: isSelected ? "#FFFFFF" : "#293231",
                flex: 1,
              }}
            >
              {lang.label}
            </Text>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const Step2Notification = ({ enabled, onToggle, onSkip }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Stay in the Loop
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Never miss out on your daily routine.
    </Text>

    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 28,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: "rgba(41,50,49,0.07)",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <Ionicons name="notifications-outline" size={36} color="#293231" />
      </View>
      <Text className="text-[#293231] font-bold text-lg text-center mb-2">
        Enable Notifications
      </Text>
      <Text className="text-gray-500 text-[14px] text-center leading-5">
        Get medication reminders, visit alerts, and baby development updates in
        real time.
      </Text>
    </View>

    <View className="flex-row items-center justify-between px-2 mb-6">
      <Text className="text-[#293231] font-semibold text-base">
        Allow notifications
      </Text>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: "#E5E7EB", true: "#293231" }}
        thumbColor="#FFFFFF"
      />
    </View>
  </View>
);

const Step3PersonalInfo = ({ info, onChange }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Personal Information
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Tell us a bit about yourself.
    </Text>

    <Text className="text-sm font-semibold text-[#293231] mb-2">Full Name</Text>
    <TextInput
      placeholder="Your full name"
      placeholderTextColor="#9CA3AF"
      value={info.fullName}
      onChangeText={(v) => onChange({ ...info, fullName: v })}
      className="w-full border border-gray-300 rounded-2xl px-5 py-4 mb-5 text-base text-[#293231]"
    />

    <Text className="text-sm font-semibold text-[#293231] mb-2">
      Relationship to mother
    </Text>
    <TextInput
      placeholder="e.g. Husband, Partner, Boyfriend…"
      placeholderTextColor="#9CA3AF"
      value={info.relationship}
      onChangeText={(v) => onChange({ ...info, relationship: v })}
      className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-base text-[#293231]"
    />
  </View>
);

const Step4SupportLink = ({ link, onChange }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Enter Support Link
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Enter the invite link sent by the mother.
    </Text>

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Ionicons
        name="link-outline"
        size={20}
        color="#9CA3AF"
        style={{ marginRight: 10 }}
      />
      <TextInput
        placeholder="ayomama.app/invite/..."
        placeholderTextColor="#9CA3AF"
        value={link}
        onChangeText={onChange}
        autoCapitalize="none"
        autoCorrect={false}
        style={{
          flex: 1,
          paddingVertical: 16,
          fontSize: 14,
          color: "#293231",
        }}
      />
    </View>

    <Text className="text-gray-400 text-xs px-2 pt-2">
      Ask your partner to share their invite link from the Ayomama app.
    </Text>

    <View
      style={{
        marginTop: 24,
        backgroundColor: "rgba(41,50,49,0.04)",
        borderRadius: 16,
        padding: 18,
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Ionicons
        name="information-circle-outline"
        size={20}
        color="#293231"
        style={{ marginRight: 10, marginTop: 1 }}
      />
      <Text className="text-[#293231] text-[13px] flex-1 leading-5">
        The invite link connects you to your partner's profile so you can track
        appointments, receive updates, and offer support.
      </Text>
    </View>
  </View>
);

const Step5QuickSetup = ({ selected, onToggle }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Quick Setup
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Select what you want help supporting.
    </Text>

    <View className="gap-3">
      {SUPPORT_ITEMS.map((item) => {
        const isSelected = selected.includes(item.id);
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onToggle(item.id)}
            activeOpacity={0.8}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 16,
              borderRadius: 16,
              borderWidth: 1.5,
              borderColor: isSelected ? "#293231" : "#E5E7EB",
              backgroundColor: isSelected ? "#293231" : "#FFFFFF",
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isSelected
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(41,50,49,0.07)",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={isSelected ? "#FFFFFF" : "#293231"}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: isSelected ? "#FFFFFF" : "#293231",
                flex: 1,
              }}
            >
              {item.label}
            </Text>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

// ─── Main ────────────────────────────────────────────────────────────────────

export default function PartnerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step states
  const [language, setLanguage] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    relationship: "",
  });
  const [inviteLink, setInviteLink] = useState("");
  const [supportItems, setSupportItems] = useState([]);

  const TOTAL_STEPS = 5;

  const toggleSupportItem = (id) =>
    setSupportItems((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const canProceed = () => {
    if (step === 0) return !!language;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else router.replace("/(partner-tabs)");
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1Language selected={language} onSelect={setLanguage} />;
      case 1:
        return (
          <Step2Notification
            enabled={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
        );
      case 2:
        return (
          <Step3PersonalInfo info={personalInfo} onChange={setPersonalInfo} />
        );
      case 3:
        return <Step4SupportLink link={inviteLink} onChange={setInviteLink} />;
      case 4:
        return (
          <Step5QuickSetup
            selected={supportItems}
            onToggle={toggleSupportItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <BgBlobs />

      {/* Header */}
      <View className="flex-row items-center px-6 pt-2 pb-4">
        <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#293231" />
        </TouchableOpacity>
      </View>

      {/* Progress Dots */}
      <ProgressDots total={TOTAL_STEPS} current={step} />

      {/* Content */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderStep()}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* CTA */}
      <View className="px-6 pb-8 pt-4">
        {/* Skip for notification step */}
        {step === 1 && (
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.6}
            className="items-center mb-3"
          >
            <Text className="text-gray-400 text-[14px]">Another time</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          disabled={!canProceed()}
          style={{
            backgroundColor: canProceed() ? "#293231" : "#D1D5DB",
            paddingVertical: 16,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Text className="text-white font-bold text-base">
            {step === TOTAL_STEPS - 1 ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
