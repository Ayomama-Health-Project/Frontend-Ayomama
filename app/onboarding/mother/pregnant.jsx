import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// ─── Data ────────────────────────────────────────────────────────────────────

const PREGNANCY_OPTIONS = [
  { id: "due_date", icon: "calendar-outline", label: "I know my due date" },
  { id: "weeks", icon: "today-outline", label: "I know how many weeks" },
  { id: "unknown", icon: "help-circle-outline", label: "I don't know" },
  { id: "just_found", icon: "heart-outline", label: "I just found out today" },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SUPPORT_OPTIONS = [
  { id: "just_me", icon: "person-outline", label: "Just me" },
  { id: "partner", icon: "people-outline", label: "My partner" },
  { id: "health_worker", icon: "medical-outline", label: "Health Worker" },
  { id: "friends", icon: "happy-outline", label: "Friends" },
];

// ─── Components ──────────────────────────────────────────────────────────────

const BgBlobs = () => (
  <View className="absolute inset-0 overflow-hidden pointer-events-none">
    <View
      style={{
        position: "absolute",
        width: 320,
        height: 320,
        borderRadius: 160,
        backgroundColor: "rgba(0, 109, 91, 0.12)",
        top: -100,
        right: -80,
      }}
    />
    <View
      style={{
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: "rgba(41, 50, 49, 0.07)",
        bottom: -80,
        left: -80,
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

const SelectCard = ({ option, selected, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress(option.id)}
    activeOpacity={0.8}
    style={{
      width: (width - 56) / 2,
      borderRadius: 16,
      padding: 20,
      alignItems: "center",
      backgroundColor: selected ? "#293231" : "#FFFFFF",
      borderWidth: 1.5,
      borderColor: selected ? "#293231" : "#E5E7EB",
      marginBottom: 12,
    }}
  >
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: selected
          ? "rgba(255,255,255,0.15)"
          : "rgba(41,50,49,0.07)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      <Ionicons
        name={option.icon}
        size={24}
        color={selected ? "#FFFFFF" : "#293231"}
      />
    </View>
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: selected ? "#FFFFFF" : "#293231",
        textAlign: "center",
        lineHeight: 18,
      }}
    >
      {option.label}
    </Text>
  </TouchableOpacity>
);

// ─── Steps ───────────────────────────────────────────────────────────────────

const Step1 = ({ selected, onSelect }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Pregnancy Setup
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      How far along are you?
    </Text>
    <View className="flex-row flex-wrap justify-between">
      {PREGNANCY_OPTIONS.map((opt) => (
        <SelectCard
          key={opt.id}
          option={opt}
          selected={selected === opt.id}
          onPress={onSelect}
        />
      ))}
    </View>
  </View>
);

const Step2 = ({ pregnancyType, data, onChange }) => {
  if (pregnancyType === "just_found") {
    return (
      <View className="flex-1">
        <Text className="text-[26px] font-bold text-[#293231] mb-1">
          Congratulations!
        </Text>
        <Text className="text-gray-500 text-[15px] mb-8">
          We are so excited for you. Let's get you set up.
        </Text>
        <View
          style={{
            backgroundColor: "rgba(0,109,91,0.08)",
            borderRadius: 20,
            padding: 28,
            alignItems: "center",
          }}
        >
          <Ionicons name="heart" size={48} color="#006D5B" />
          <Text className="text-[#293231] font-bold text-xl mt-4 text-center">
            You just found out — that's amazing!
          </Text>
          <Text className="text-gray-500 text-[14px] mt-2 text-center">
            Tap Continue to start your journey with Ayomama.
          </Text>
        </View>
      </View>
    );
  }

  const title =
    pregnancyType === "due_date"
      ? "When is your due date?"
      : pregnancyType === "weeks"
        ? "How many weeks along are you?"
        : "When was your last period?";

  const subtitle =
    pregnancyType === "weeks"
      ? "Enter the number of weeks pregnant"
      : "Select the date below";

  return (
    <View className="flex-1">
      <Text className="text-[26px] font-bold text-[#293231] mb-1">{title}</Text>
      <Text className="text-gray-500 text-[15px] mb-8">{subtitle}</Text>

      {pregnancyType === "weeks" ? (
        <TextInput
          placeholder="e.g. 20"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          value={data.weeks}
          onChangeText={(v) => onChange({ ...data, weeks: v })}
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-base text-[#293231]"
        />
      ) : (
        <View className="flex-row gap-3">
          {/* Month */}
          <View className="flex-1 border border-gray-300 rounded-2xl px-4 py-3">
            <Text className="text-xs text-gray-400 mb-1">Month</Text>
            <TextInput
              placeholder="Month"
              placeholderTextColor="#9CA3AF"
              value={data.month}
              onChangeText={(v) => onChange({ ...data, month: v })}
              className="text-[#293231] text-base"
            />
          </View>
          {/* Day */}
          <View
            style={{ width: 80 }}
            className="border border-gray-300 rounded-2xl px-4 py-3"
          >
            <Text className="text-xs text-gray-400 mb-1">Day</Text>
            <TextInput
              placeholder="DD"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={data.day}
              onChangeText={(v) => onChange({ ...data, day: v })}
              className="text-[#293231] text-base"
            />
          </View>
          {/* Year */}
          <View
            style={{ width: 90 }}
            className="border border-gray-300 rounded-2xl px-4 py-3"
          >
            <Text className="text-xs text-gray-400 mb-1">Year</Text>
            <TextInput
              placeholder="YYYY"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={data.year}
              onChangeText={(v) => onChange({ ...data, year: v })}
              className="text-[#293231] text-base"
            />
          </View>
        </View>
      )}
    </View>
  );
};

const Step3 = ({ nickname, onChange }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Baby Nickname Setup
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      What would you like to call your baby?
    </Text>
    <TextInput
      placeholder="e.g. Little Star, Peanut…"
      placeholderTextColor="#9CA3AF"
      value={nickname}
      onChangeText={onChange}
      className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-base text-[#293231]"
    />
    <Text className="text-gray-400 text-xs px-2 pt-2">
      You can always change this later in your profile.
    </Text>
  </View>
);

const Step4 = ({ selected, onToggle, router }) => (
  <View className="flex-1">
    <Text className="text-[26px] font-bold text-[#293231] mb-1">
      Support Circle
    </Text>
    <Text className="text-gray-500 text-[15px] mb-8">
      Who's joining you on this journey?
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

    {/* Generate Invite Link */}
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

// ─── Main ────────────────────────────────────────────────────────────────────

export default function PregnantOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [pregnancyType, setPregnancyType] = useState(null);
  const [dateData, setDateData] = useState({
    month: "",
    day: "",
    year: "",
    weeks: "",
  });
  const [nickname, setNickname] = useState("");
  const [supportSelections, setSupportSelections] = useState([]);

  const TOTAL_STEPS = 4;

  const toggleSupport = (id) => {
    setSupportSelections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const canProceed = () => {
    if (step === 0) return !!pregnancyType;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      router.replace("/(mother-tabs)");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else router.back();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1 selected={pregnancyType} onSelect={setPregnancyType} />;
      case 1:
        return (
          <Step2
            pregnancyType={pregnancyType}
            data={dateData}
            onChange={setDateData}
          />
        );
      case 2:
        return <Step3 nickname={nickname} onChange={setNickname} />;
      case 3:
        return (
          <Step4
            selected={supportSelections}
            onToggle={toggleSupport}
            router={router}
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
      <View className="px-6 pb-8 pt-4 bg-transparent">
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
