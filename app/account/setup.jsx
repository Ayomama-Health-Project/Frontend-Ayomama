import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useRedirectAuthenticatedUser from "../../hooks/useRedirectAuthenticatedUser";
import { useTranslation } from "../../utils/translator";

const AccountSetup = () => {
  const router = useRouter();
  const { isCheckingAuthScreenAccess } = useRedirectAuthenticatedUser();
  const [selectedType, setSelectedType] = useState(null);

  const titleText = useTranslation("Account Setup");
  const subtitleText = useTranslation("Tell us where you are on your journey");
  const pregnantText = useTranslation("I'm Pregnant");
  const pregnantDescText = useTranslation("Track your pregnancy week to week");
  const postpartumText = useTranslation("I've given birth");
  const postpartumDescText = useTranslation("Lets care for you and your baby");
  const proceedText = useTranslation("Proceed");

  if (isCheckingAuthScreenAccess) {
    return null;
  }

  const handleProceed = () => {
    if (!selectedType) return;
    router.push({
      pathname: "/(auth)/auth/mother/signup",
      params: { type: selectedType },
    });
  };

  const SetupCard = ({ type, image, title, description, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedType(type)}
      activeOpacity={0.8}
      className="flex-1"
    >
      <View
        className={`rounded-3xl overflow-hidden ${
          isSelected
            ? "border-2 border-[#006D5B]"
            : "border-2 border-transparent"
        }`}
        style={{
          backgroundColor: isSelected ? "#F0FAF8" : "#F5F5F0",
          shadowColor: isSelected ? "#006D5B" : "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isSelected ? 0.15 : 0.06,
          shadowRadius: 12,
        }}
      >
        <View className="items-center px-3 pt-5 pb-5">
          <Image
            source={image}
            className="w-28 h-[120px] mb-3"
            resizeMode="contain"
          />
          <Text className="text-[15px] font-bold text-[#293231] text-center mb-1">
            {title}
          </Text>
          <Text className="text-[12px] text-gray-500 text-center leading-4">
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <View className="flex-1 px-5">
        <View className="pt-6 pb-10">
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

          <Text className="text-[28px] font-bold text-[#293231] mb-2">
            {titleText}
          </Text>
          <Text className="text-gray-500 text-[15px]">{subtitleText}</Text>
        </View>

        <View className="flex-row gap-4">
          <SetupCard
            type="pregnant"
            image={require("../../assets/images/Pregnantblackwoman.png")}
            title={pregnantText}
            description={pregnantDescText}
            isSelected={selectedType === "pregnant"}
          />
          <SetupCard
            type="postpartum"
            image={require("../../assets/images/motherandbaby.png")}
            title={postpartumText}
            description={postpartumDescText}
            isSelected={selectedType === "postpartum"}
          />
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
};

export default AccountSetup;
