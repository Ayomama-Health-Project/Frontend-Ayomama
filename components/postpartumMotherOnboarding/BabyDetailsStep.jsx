import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { BABY_AGE_OPTIONS } from "./constants";
import { StepHeading, TinyButton } from "../pregnantMotherOnboarding/shared";
import { useTranslations, useTranslation } from "../../utils/translator";

function DateField({ label, value, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      className="h-[46px] flex-1 justify-center rounded-[10px] bg-white px-3"
    >
      <View className="flex-row items-center justify-between">
        <Text className={`text-[14px] ${value ? "text-[#293231]" : "text-[#293231]/40"}`}>
          {value || label}
        </Text>
        <Ionicons name="chevron-down" size={16} color="#293231" />
      </View>
    </TouchableOpacity>
  );
}

export default function BabyDetailsStep({
  babyAge,
  setBabyAge,
  babyDob,
  onOpenPicker,
  showAgeOptions,
  setShowAgeOptions,
  onContinue,
  canContinue,
}) {
  const titleText = useTranslation("Baby Details");
  const babyAgeText = useTranslation("How old is your baby?");
  const dobText = useTranslation("Baby’s Date of Birth");
  const proceedText = useTranslation("Proceed");
  const ageOptions = useTranslations(BABY_AGE_OPTIONS);
  const datePlaceholders = useTranslations(["June", "25", "2025"]);
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle="" />

      <View className="px-5 pt-[34px]">
        <Text className="text-[16px] font-medium text-[#293231]/50">
          {babyAgeText}
        </Text>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => setShowAgeOptions((prev) => !prev)}
          className="mt-[13px] h-[46px] flex-row items-center justify-between rounded-[10px] bg-white px-4"
        >
          <Text className={`text-[16px] font-medium ${babyAge ? "text-[#293231]" : "text-[#293231]/35"}`}>
            {babyAge || ageOptions[0] || "0-3 months"}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#293231" />
        </TouchableOpacity>

        {showAgeOptions ? (
          <View className="mt-[38px] rounded-[28px] border border-[#006D5B] bg-white px-4 py-5">
            <View className="gap-[15px]">
              {BABY_AGE_OPTIONS.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.88}
                  onPress={() => {
                    setBabyAge(option);
                    setShowAgeOptions(false);
                  }}
                  className="h-[46px] items-center justify-center rounded-[10px] bg-[#D9F6F4]"
                >
                  <Text className="text-[16px] font-medium text-[#293231]">
                    {ageOptions[index] || option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View className="mt-[27px]">
            <Text className="text-[16px] font-medium text-[#293231]/50">
              {dobText}
            </Text>
            <View className="mt-[13px] flex-row items-center gap-[13px]">
              <View className="flex-1">
                <DateField
                  label={datePlaceholders[0] || "June"}
                  value={babyDob.month}
                  onPress={() => onOpenPicker("month")}
                />
              </View>
              <View className="w-[94px]">
                <DateField
                  label={datePlaceholders[1] || "25"}
                  value={babyDob.day}
                  onPress={() => onOpenPicker("day")}
                />
              </View>
              <View className="w-[104px]">
                <DateField
                  label={datePlaceholders[2] || "2025"}
                  value={babyDob.year}
                  onPress={() => onOpenPicker("year")}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      <View className="mt-10 px-5 gap-3">
        <TinyButton label={proceedText} filled onPress={onContinue} disabled={!canContinue} />
      </View>
    </View>
  );
}
