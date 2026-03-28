import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../utils/translator";

const AccountSelection = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [authAction, setAuthAction] = useState("signup");

  const titleText = useTranslation("Choose your Account");
  const subtitleText = useTranslation(
    "Select the account type that best describes you to get a personalised experience.",
  );
  const motherText = useTranslation("Mother");
  const motherDescText = useTranslation(
    "Track your baby health while still in the womb.",
  );
  const healthcareText = useTranslation("Health care Professionals");
  const healthcareDescText = useTranslation(
    "Manage your patient effectively, you can check how well they are doing.",
  );
  const partnerText = useTranslation("Partner");
  const partnerDescText = useTranslation(
    "Track your partners baby health side by side with them",
  );
  const proceedText = useTranslation("Proceed");

  useEffect(() => {
    if (params.action) {
      setAuthAction(params.action);
    }
  }, [params.action]);

  const handleProceed = () => {
    if (!selectedAccount) return;

    if (selectedAccount === "mother") {
      if (authAction === "signup") {
        router.push("/account/setup");
      } else {
        router.push("/auth/mother/login");
      }
    } else if (selectedAccount === "healthcare") {
      if (authAction === "signup") {
        router.push("/auth/healthworker/signup");
      } else {
        router.push("/auth/healthworker/login");
      }
    } else if (selectedAccount === "partner") {
      if (authAction === "signup") {
        router.push("/auth/partner/signup");
      } else {
        router.push("/auth/partner/login");
      }
    }
  };

  const AccountCard = ({ type, image, title, description, isSelected }) => (
    <TouchableOpacity
      onPress={() => setSelectedAccount(type)}
      activeOpacity={0.8}
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
          elevation: isSelected ? 6 : 2,
        }}
      >
        <View className="flex-row items-center px-4 py-5">
          <View className="bg-[#fcfcfc] rounded-xl w-[76px] h-[76px] items-center justify-center overflow-hidden mr-4">
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
              isSelected ? "border-[#006D5B]" : "border-gray-300"
            }`}
          >
            {isSelected && (
              <View className="w-2.5 h-2.5 rounded-full bg-[#006D5B]" />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <View className="flex-1 px-5">
        <View className="pt-16 pb-8">
          <Text className="text-[24px] font-semibold text-[#293231] mb-2">
            {titleText}
          </Text>
          <Text className="text-[14px] text-gray-400 leading-5">
            {subtitleText}
          </Text>
        </View>

        <View className="gap-8">
          <AccountCard
            type="mother"
            image={require("../../assets/images/Pregnantblackwoman.png")}
            title={motherText}
            description={motherDescText}
            isSelected={selectedAccount === "mother"}
          />
          <AccountCard
            type="healthcare"
            image={require("../../assets/images/healthcare.png")}
            title={healthcareText}
            description={healthcareDescText}
            isSelected={selectedAccount === "healthcare"}
          />
          <AccountCard
            type="partner"
            image={require("../../assets/images/Husbandandwife.png")}
            title={partnerText}
            description={partnerDescText}
            isSelected={selectedAccount === "partner"}
          />
        </View>

        <View className="flex-1" />

        <View className="pb-10">
          <TouchableOpacity
            className={`py-4 rounded-2xl ${
              selectedAccount ? "bg-[#006D5B]" : "bg-gray-300"
            }`}
            onPress={handleProceed}
            disabled={!selectedAccount}
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

export default AccountSelection;
