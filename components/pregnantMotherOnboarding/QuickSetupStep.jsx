import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslations, useTranslation } from "../../utils/translator";
import { QUICK_SETUP_OPTIONS } from "./constants";
import { StepHeading } from "./shared";

export default function QuickSetupStep({ selections, toggleSelection }) {
  const titleText = useTranslation("Quick Setup");
  const subtitleText = useTranslation("What would you like Ayomama to help you with?");
  const optionLabels = useTranslations(QUICK_SETUP_OPTIONS.map((option) => option.label));
  return (
    <View className="flex-1">
      <StepHeading
        title={titleText}
        subtitle={subtitleText}
      />

      <View className="px-5 pt-[13px] gap-[13px]">
        {QUICK_SETUP_OPTIONS.map((option) => {
          const active = selections.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.88}
              onPress={() => toggleSelection(option.id)}
              className={`h-[46px] flex-row items-center justify-between rounded-[10px] px-4 ${
                active ? "border border-[#006D5B] bg-white" : "bg-white"
              }`}
            >
              <View className="flex-row items-center">
                <Ionicons name={option.icon} size={20} color="#293231" />
                <Text className="ml-4 text-[16px] font-medium text-[#293231]">
                  {optionLabels[QUICK_SETUP_OPTIONS.findIndex((item) => item.id === option.id)] || option.label}
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
