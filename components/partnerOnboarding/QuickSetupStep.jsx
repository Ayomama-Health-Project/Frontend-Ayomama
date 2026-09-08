import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import { QUICK_SETUP_OPTIONS } from "./constants";
import { StepHeading } from "../pregnantMotherOnboarding/shared";

function SetupRow({ option, selected, onPress }) {
  const optionLabel = useTranslation(option.label);
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      className={`h-[46px] flex-row items-center justify-between rounded-[10px] px-4 ${
        selected ? "border border-[#006D5B] bg-white" : "bg-white"
      }`}
    >
      <View className="flex-row items-center">
        <View className="w-7 items-center">
          <Ionicons name={option.icon} size={18} color="#293231" />
        </View>
        <Text className="ml-3 text-[16px] font-medium text-[#293231]">
          {optionLabel}
        </Text>
      </View>

      <Ionicons
        name={selected ? "checkbox-outline" : "square-outline"}
        size={22}
        color="#293231"
      />
    </TouchableOpacity>
  );
}

export default function QuickSetupStep({ selections, toggleSelection }) {
  const titleText = useTranslation("Quick Setup");
  const helperText = useTranslation("Select what you want help supporting:");
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle="" />

      <View className="px-5 pt-[13px] gap-[13px]">
        <Text className="text-[16px] font-medium text-[#293231]/50">
          {helperText}
        </Text>

        {QUICK_SETUP_OPTIONS.map((option) => (
          <SetupRow
            key={option.id}
            option={option}
            selected={selections.includes(option.id)}
            onPress={() => toggleSelection(option.id)}
          />
        ))}
      </View>
    </View>
  );
}
