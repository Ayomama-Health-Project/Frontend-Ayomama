import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Data ────────────────────────────────────────────────────────────────────

const BABY_AGE_OPTIONS = [
  "0 – 3 months",
  "4 – 6 months",
  "7 – 12 months",
  "1 year +",
];

const SUPPORT_OPTIONS = [
  { id: "just_me", icon: "person-outline", label: "Just me" },
  { id: "partner", icon: "people-outline", label: "My partner" },
  { id: "health_worker", icon: "medical-outline", label: "Health Worker" },
  { id: "friends", icon: "happy-outline", label: "Friends" },
];

const FEELING_OPTIONS = [
  { id: "strong", icon: "barbell-outline", label: "Physically strong" },
  { id: "tired", icon: "moon-outline", label: "Tired or low energy" },
  {
    id: "pain",
    icon: "bandage-outline",
    label: "Experiencing pain or discomfort",
  },
  {
    id: "emotional",
    icon: "cloudy-outline",
    label: "Emotionally low or anxious",
  },
  {
    id: "okay",
    icon: "checkmark-circle-outline",
    label: "Feeling okay overall",
  },
];

const RELATIONSHIP_OPTIONS = ["Family", "Friend", "Hospital"];

// ─── Shared Helpers ───────────────────────────────────────────────────────────

const BgBlobs = () => (
  <View className="absolute inset-0 overflow-hidden">
    <View
      style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "rgba(168, 85, 247, 0.10)",
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

const Step1BabyDetails = ({ babyAge, onSelectAge, dob, onChangeDob }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <View className="flex-1">
      <Text className="text-[26px] font-bold text-[#293231] mb-1">
        Baby Details
      </Text>
      <Text className="text-gray-500 text-[15px] mb-8">
        Tell us a little about your baby.
      </Text>

      {/* Baby Age Dropdown */}
      <Text className="text-sm font-semibold text-[#293231] mb-2">
        How old is your baby?
      </Text>
      <TouchableOpacity
        onPress={() => setShowDropdown(!showDropdown)}
        activeOpacity={0.8}
        style={{
          borderWidth: 1.5,
          borderColor: babyAge ? "#293231" : "#E5E7EB",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            color: babyAge ? "#293231" : "#9CA3AF",
            fontSize: 15,
            fontWeight: babyAge ? "600" : "400",
          }}
        >
          {babyAge || "Select age range"}
        </Text>
        <Ionicons
          name={showDropdown ? "chevron-up" : "chevron-down"}
          size={18}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {showDropdown && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 8,
            backgroundColor: "#FFFFFF",
          }}
        >
          {BABY_AGE_OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={opt}
              onPress={() => {
                onSelectAge(opt);
                setShowDropdown(false);
              }}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 13,
                borderBottomWidth: i < BABY_AGE_OPTIONS.length - 1 ? 1 : 0,
                borderBottomColor: "#F3F4F6",
                backgroundColor: babyAge === opt ? "#F0FDF4" : "#FFFFFF",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#293231",
                  fontWeight: babyAge === opt ? "600" : "400",
                }}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Baby DOB */}
      <Text className="text-sm font-semibold text-[#293231] mb-2 mt-4">
        Baby's Date of Birth
      </Text>
      <View className="flex-row gap-3">
        <View className="flex-1 border border-gray-300 rounded-2xl px-4 py-3">
          <Text className="text-xs text-gray-400 mb-1">Month</Text>
          <TextInput
            placeholder="Month"
            placeholderTextColor="#9CA3AF"
            value={dob.month}
            onChangeText={(v) => onChangeDob({ ...dob, month: v })}
            className="text-[#293231] text-base"
          />
        </View>
        <View
          style={{ width: 76 }}
          className="border border-gray-300 rounded-2xl px-4 py-3"
        >
          <Text className="text-xs text-gray-400 mb-1">Day</Text>
          <TextInput
            placeholder="DD"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            value={dob.day}
            onChangeText={(v) => onChangeDob({ ...dob, day: v })}
            className="text-[#293231] text-base"
          />
        </View>
        <View
          style={{ width: 88 }}
          className="border border-gray-300 rounded-2xl px-4 py-3"
        >
          <Text className="text-xs text-gray-400 mb-1">Year</Text>
          <TextInput
            placeholder="YYYY"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            value={dob.year}
            onChangeText={(v) => onChangeDob({ ...dob, year: v })}
            className="text-[#293231] text-base"
          />
        </View>
      </View>
    </View>
  );
};

const Step2SupportCircle = ({ selected, onToggle }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Support Circle
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Who's walking this journey with you?
    </Text>

    <View className="gap-3">
      {SUPPORT_OPTIONS.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <TouchableOpacity
            key={opt.id}
            onPress={() => onToggle(opt.id)}
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
                name={opt.icon}
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
              {opt.label}
            </Text>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>

    <TouchableOpacity
      activeOpacity={0.7}
      className="mt-6 flex-row items-center justify-center gap-2 py-4 border border-dashed border-gray-300 rounded-2xl"
    >
      <Ionicons name="link-outline" size={20} color="#293231" />
      <Text className="text-[#293231] font-semibold text-[15px]">
        Generate Invite Link
      </Text>
    </TouchableOpacity>
  </View>
);

const Step3RecoveryCheckin = ({ selected, onToggle }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Mother Recovery
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      How are you feeling today, Mama?
    </Text>
    <Text className="text-xs text-gray-400 mb-4 uppercase tracking-wide">
      Select all that apply
    </Text>

    <View className="gap-3">
      {FEELING_OPTIONS.map((opt) => {
        const isSelected = selected.includes(opt.id);
        return (
          <TouchableOpacity
            key={opt.id}
            onPress={() => onToggle(opt.id)}
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
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: isSelected
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(41,50,49,0.07)",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <Ionicons
                name={opt.icon}
                size={18}
                color={isSelected ? "#FFFFFF" : "#293231"}
              />
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: isSelected ? "#FFFFFF" : "#293231",
                flex: 1,
              }}
            >
              {opt.label}
            </Text>
            {isSelected && (
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const Step4EmergencyContact = ({ contact, onChange }) => {
  const [showRelDropdown, setShowRelDropdown] = useState(false);

  return (
    <View className="flex-1">
      <Text className="text-[26px] font-bold text-[#293231] mb-1">
        Emergency Contact
      </Text>
      <Text className="text-gray-500 text-[15px] mb-8">
        Who should we call in an emergency?
      </Text>

      {/* Phone */}
      <Text className="text-sm font-semibold text-[#293231] mb-2">
        Phone Number
      </Text>
      <View className="flex-row items-center border border-gray-300 rounded-2xl mb-5 overflow-hidden">
        <View className="px-4 py-4 bg-gray-50 border-r border-gray-300">
          <Text className="text-[#293231] font-semibold">+234</Text>
        </View>
        <TextInput
          placeholder="801 234 5678"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          value={contact.phone}
          onChangeText={(v) => onChange({ ...contact, phone: v })}
          className="flex-1 px-4 py-4 text-base text-[#293231]"
        />
      </View>

      {/* Contact Name */}
      <Text className="text-sm font-semibold text-[#293231] mb-2">
        Contact Name
      </Text>
      <TextInput
        placeholder="Full name"
        placeholderTextColor="#9CA3AF"
        value={contact.name}
        onChangeText={(v) => onChange({ ...contact, name: v })}
        className="w-full border border-gray-300 rounded-2xl px-5 py-4 mb-5 text-base text-[#293231]"
      />

      {/* Relationship */}
      <Text className="text-sm font-semibold text-[#293231] mb-2">
        Relationship
      </Text>
      <TouchableOpacity
        onPress={() => setShowRelDropdown(!showRelDropdown)}
        activeOpacity={0.8}
        style={{
          borderWidth: 1.5,
          borderColor: contact.relationship ? "#293231" : "#E5E7EB",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text
          style={{
            color: contact.relationship ? "#293231" : "#9CA3AF",
            fontSize: 15,
            fontWeight: contact.relationship ? "600" : "400",
          }}
        >
          {contact.relationship || "Select relationship"}
        </Text>
        <Ionicons
          name={showRelDropdown ? "chevron-up" : "chevron-down"}
          size={18}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {showRelDropdown && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 16,
            overflow: "hidden",
            marginTop: 4,
            backgroundColor: "#FFFFFF",
          }}
        >
          {RELATIONSHIP_OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={opt}
              onPress={() => {
                onChange({ ...contact, relationship: opt });
                setShowRelDropdown(false);
              }}
              activeOpacity={0.7}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 13,
                borderBottomWidth: i < RELATIONSHIP_OPTIONS.length - 1 ? 1 : 0,
                borderBottomColor: "#F3F4F6",
              }}
            >
              <Text className="text-[#293231] text-[15px]">{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// ─── Main ────────────────────────────────────────────────────────────────────

export default function PostpartumOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Step 1
  const [babyAge, setBabyAge] = useState("");
  const [babyDob, setBabyDob] = useState({ month: "", day: "", year: "" });

  // Step 2
  const [supportSelections, setSupportSelections] = useState([]);

  // Step 3
  const [feelingSelections, setFeelingSelections] = useState([]);

  // Step 4
  const [emergencyContact, setEmergencyContact] = useState({
    phone: "",
    name: "",
    relationship: "",
  });

  const TOTAL_STEPS = 4;

  const toggleSupport = (id) =>
    setSupportSelections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const toggleFeeling = (id) =>
    setFeelingSelections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
    else router.replace("/(mother-tabs)");
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1BabyDetails
            babyAge={babyAge}
            onSelectAge={setBabyAge}
            dob={babyDob}
            onChangeDob={setBabyDob}
          />
        );
      case 1:
        return (
          <Step2SupportCircle
            selected={supportSelections}
            onToggle={toggleSupport}
          />
        );
      case 2:
        return (
          <Step3RecoveryCheckin
            selected={feelingSelections}
            onToggle={toggleFeeling}
          />
        );
      case 3:
        return (
          <Step4EmergencyContact
            contact={emergencyContact}
            onChange={setEmergencyContact}
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

      {/* CTA Button */}
      <View className="px-6 pb-8 pt-4">
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          style={{
            backgroundColor: "#293231",
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
