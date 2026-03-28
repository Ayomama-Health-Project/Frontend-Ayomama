import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import { FEELING_OPTIONS } from "./constants";
import { StepHeading } from "../pregnantMotherOnboarding/shared";

export default function MotherRecoveryStep({
  feelings,
  toggleFeeling,
}) {
  const titleText = useTranslation("Mother Recovery Check-In");
  const subtitleText = useTranslation("How are you feeling today, Mama?");
  return (
    <View className="flex-1">
      <StepHeading
        title={titleText}
        subtitle={subtitleText}
      />

      <View className="px-5 pt-[33px] gap-[13px]">
        {FEELING_OPTIONS.map((option) => {
          const active = feelings.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.88}
              onPress={() => toggleFeeling(option.id)}
              className={`h-[46px] flex-row items-center justify-between rounded-[10px] px-4 ${
                active ? "border border-[#006D5B] bg-white" : "bg-white"
              }`}
            >
              <View className="flex-row items-center">
                <Ionicons name={option.icon} size={20} color="#293231" />
                <Text className="ml-4 text-[16px] font-medium text-[#293231]">
                  {useTranslation(option.label)}
                </Text>
              </View>
              <Ionicons
                name={active ? "checkbox-outline" : "square-outline"}
                size={22}
                color="#293231"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
