import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Background Blobs ─────────────────────────────────────────────────────────

const BgBlobs = () => (
  <View className="absolute inset-0 overflow-hidden">
    <View
      style={{
        position: "absolute",
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: "rgba(0, 109, 91, 0.11)",
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

// ─── Input Helper ─────────────────────────────────────────────────────────────

const Field = ({ label, placeholder, value, onChange, keyboardType, hint }) => (
  <View className="mb-5">
    <Text className="text-sm font-semibold text-[#293231] mb-2">{label}</Text>
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType || "default"}
      className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-base text-[#293231] bg-white"
    />
    {hint ? (
      <Text className="text-gray-400 text-xs px-2 pt-1">{hint}</Text>
    ) : null}
  </View>
);

// ─── Main ────────────────────────────────────────────────────────────────────

export default function HealthworkerOnboarding() {
  const router = useRouter();

  const [info, setInfo] = useState({
    fullName: "",
    state: "",
    lga: "",
    facilityName: "",
    facilityCode: "",
  });

  const isComplete =
    info.fullName.trim() &&
    info.state.trim() &&
    info.lga.trim() &&
    info.facilityName.trim();

  const handleProceed = () => {
    router.replace("/(healthworker-tabs)");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-[#F8F9FA]">
        <BgBlobs />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center px-6 pt-2 pb-4">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={24} color="#293231" />
            </TouchableOpacity>
          </View>

          {/* Progress (single step indicator) */}
          <View className="flex-row items-center justify-center mb-8">
            <View
              style={{
                width: 24,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#293231",
              }}
            />
          </View>

          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title */}
            <Text className="text-[26px] font-bold text-[#293231] mb-1">
              Personal Information
            </Text>
            <Text className="text-gray-500 text-[15px] mb-8">
              Tell us about yourself and your facility.
            </Text>

            {/* Full Name */}
            <Field
              label="Full Name"
              placeholder="Dr. Amaka Okafor"
              value={info.fullName}
              onChange={(v) => setInfo({ ...info, fullName: v })}
            />

            {/* State + LGA side by side */}
            <View className="flex-row gap-3 mb-0">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-[#293231] mb-2">
                  State
                </Text>
                <TextInput
                  placeholder="Lagos"
                  placeholderTextColor="#9CA3AF"
                  value={info.state}
                  onChangeText={(v) => setInfo({ ...info, state: v })}
                  className="border border-gray-300 rounded-2xl px-4 py-4 text-base text-[#293231] bg-white mb-5"
                />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-[#293231] mb-2">
                  LGA
                </Text>
                <TextInput
                  placeholder="Ikeja"
                  placeholderTextColor="#9CA3AF"
                  value={info.lga}
                  onChangeText={(v) => setInfo({ ...info, lga: v })}
                  className="border border-gray-300 rounded-2xl px-4 py-4 text-base text-[#293231] bg-white mb-5"
                />
              </View>
            </View>

            {/* Facility Name */}
            <Field
              label="Facility Name"
              placeholder="General Hospital Lagos"
              value={info.facilityName}
              onChange={(v) => setInfo({ ...info, facilityName: v })}
            />

            {/* Facility Code */}
            <Field
              label="Facility Code / ID"
              placeholder="e.g. GHL-2024-001"
              value={info.facilityCode}
              onChange={(v) => setInfo({ ...info, facilityCode: v })}
              hint="Optional — provided by your facility administrator"
            />

            {/* Terms note */}
            <View
              style={{
                backgroundColor: "rgba(41,50,49,0.04)",
                borderRadius: 16,
                padding: 16,
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#293231"
                style={{ marginRight: 10, marginTop: 1 }}
              />
              <Text className="text-[#293231] text-[13px] flex-1 leading-5">
                Your information is verified and kept confidential. Only
                patients you manage can see your profile.
              </Text>
            </View>

            <View style={{ height: 120 }} />
          </ScrollView>

          {/* CTA */}
          <View className="px-6 pb-8 pt-4">
            <TouchableOpacity
              onPress={handleProceed}
              activeOpacity={0.85}
              style={{
                backgroundColor: isComplete ? "#293231" : "#D1D5DB",
                paddingVertical: 16,
                borderRadius: 20,
                alignItems: "center",
              }}
            >
              <Text className="text-white font-bold text-base">Proceed</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
