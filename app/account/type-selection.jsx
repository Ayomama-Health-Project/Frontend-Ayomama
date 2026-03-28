import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useRedirectAuthenticatedUser from "../../hooks/useRedirectAuthenticatedUser";
import { useTranslation } from "../../utils/translator";

const healthcareImage = require("../../assets/images/healthcare.png");

function SelectionCard({ id, image, title, description, selected, onPress }) {
  return (
    <TouchableOpacity onPress={() => onPress(id)} activeOpacity={0.82}>
      <View
        className={`rounded-3xl overflow-hidden ${
          selected ? "border-2 border-[#006D5B]" : "border-2 border-transparent"
        }`}
        style={{
          backgroundColor: selected ? "#F0FAF8" : "#F5F5F0",
          shadowColor: selected ? "#006D5B" : "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: selected ? 0.15 : 0.06,
          shadowRadius: 12,
        }}
      >
        <View className="flex-row items-center px-4 py-5">
          <View className="bg-[#FCFCFC] rounded-xl w-[76px] h-[76px] items-center justify-center overflow-hidden mr-4">
            <Image
              source={image}
              className="w-[70px] h-[90px]"
              resizeMode="contain"
            />
          </View>

          <View className="flex-1 mr-3">
            <Text className="text-[14px] font-semibold text-[#293231] mb-1">
              {title}
            </Text>
            <Text className="text-[12px] text-[#293231] leading-4">
              {description}
            </Text>
          </View>

          <View
            className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
              selected ? "border-[#006D5B]" : "border-gray-300"
            }`}
          >
            {selected ? (
              <View className="w-2.5 h-2.5 rounded-full bg-[#006D5B]" />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function AccountTypeSelection() {
  const router = useRouter();
  const { isCheckingAuthScreenAccess } = useRedirectAuthenticatedUser();
  const params = useLocalSearchParams();
  const account = typeof params.account === "string" ? params.account : "";
  const action = typeof params.action === "string" ? params.action : "signup";
  const [selectedType, setSelectedType] = useState(null);

  if (isCheckingAuthScreenAccess) {
    return null;
  }

  const proceedText = useTranslation("Proceed");
  const healthcareTitle = useTranslation("Choose Healthcare Type");
  const healthcareSubtitle = useTranslation(
    "Select the setup that best matches how you want to use Ayomama.",
  );
  const healthcareWithClinic = useTranslation(
    "Health Care Professional With Clinic",
  );
  const healthcareWithClinicDesc = useTranslation(
    "You work with a clinic, facility, or hospital and want your setup to reflect that.",
  );
  const healthcareWithoutClinic = useTranslation(
    "Health Care Professional Without Clinic",
  );
  const healthcareWithoutClinicDesc = useTranslation(
    "You support mothers independently, in the field, or outside a fixed facility.",
  );

  const config = {
    title: healthcareTitle,
    subtitle: healthcareSubtitle,
    route:
      action === "signup"
        ? "/(auth)/auth/healthworker/signup"
        : "/(auth)/auth/healthworker/login",
    options: [
      {
        id: "with-clinic",
        image: healthcareImage,
        title: healthcareWithClinic,
        description: healthcareWithClinicDesc,
      },
      {
        id: "without-clinic",
        image: healthcareImage,
        title: healthcareWithoutClinic,
        description: healthcareWithoutClinicDesc,
      },
    ],
  };

  const handleProceed = () => {
    if (!selectedType) return;

    router.push({
      pathname: config.route,
      params: { type: selectedType },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <View className="flex-1 px-5">
        <View className="pt-6 pb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.82}
            className="mb-8 h-12 w-12 items-center justify-center rounded-full border border-[#DDE8E5] bg-white"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 10,
            }}
          >
            <Ionicons name="arrow-back" size={22} color="#293231" />
          </TouchableOpacity>

          <Text className="text-[24px] font-semibold text-[#293231] mb-2">
            {config.title}
          </Text>
          <Text className="text-[14px] text-gray-400 leading-5">
            {config.subtitle}
          </Text>
        </View>

        <View className="gap-8">
          {config.options.map((option) => (
            <SelectionCard
              key={option.id}
              {...option}
              selected={selectedType === option.id}
              onPress={setSelectedType}
            />
          ))}
        </View>

        <View className="flex-1" />

        <View className="pb-10">
          <TouchableOpacity
            className={`py-4 rounded-2xl ${
              selectedType ? "bg-[#006D5B]" : "bg-gray-300"
            }`}
            onPress={handleProceed}
            disabled={!selectedType}
            activeOpacity={0.85}
          >
            <Text className="text-white text-center font-semibold text-[14px]">
              {proceedText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
