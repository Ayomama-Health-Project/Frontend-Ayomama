import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import { PREGNANCY_OPTIONS } from "./constants";
import { StepHeading, TinyButton } from "./shared";

function PregnancyOptionCard({ option, selected, onPress }) {
  const optionLabel = useTranslation(option.label);
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={() => onPress(option.id)}
      className={`h-[108px] w-[167px] rounded-[30px] px-3 pt-[17px] ${
        selected ? "border border-[#006D5B] bg-white" : "bg-white/80"
      }`}
    >
      <Ionicons name={option.icon} size={25} color="#FF4C3B" />
      <View className="flex-1 items-center justify-center pb-2">
        <Text className="text-center text-[16px] font-semibold leading-5 text-[#293231]">
          {optionLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function DateField({ label, value, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      className="h-[46px] flex-1 justify-center rounded-[10px] bg-[#E8FBFB] px-3"
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

export default function PregnancyStep({
  pregnancyType,
  setPregnancyType,
  dateData,
  weeks,
  setWeeks,
  onOpenPicker,
  onContinue,
  canContinue,
}) {
  const titleText = useTranslation("Pregnancy Setup");
  const subtitleText = useTranslation("How far along re you? Let’s track your pregnancy accurately");
  const dueDateText = useTranslation("Select your expected due date");
  const lastPeriodText = useTranslation("When was your last period? We’ll calculate it for you");
  const weeksTitleText = useTranslation("How many weeks along are you?");
  const foundOutText = useTranslation("Congratulations, Mama! Let’s begin this journey together");
  const enterWeeksText = useTranslation("Enter number of weeks");
  const monthText = useTranslation("Month");
  const dayText = useTranslation("Day");
  const yearText = useTranslation("Year");
  const continueText = useTranslation("Continue");
  const showDetail = Boolean(pregnancyType);
  const detailTitle =
    pregnancyType === "due_date"
      ? dueDateText
      : pregnancyType === "unknown"
        ? lastPeriodText
        : pregnancyType === "weeks"
          ? weeksTitleText
          : foundOutText;

  return (
    <View className="flex-1">
      <StepHeading
        title={titleText}
        subtitle={subtitleText}
      />

      <View className="px-5 pt-8">
        <View className="flex-row flex-wrap justify-between gap-y-[37px]">
          {PREGNANCY_OPTIONS.map((option) => (
            <PregnancyOptionCard
              key={option.id}
              option={option}
              selected={pregnancyType === option.id}
              onPress={setPregnancyType}
            />
          ))}
        </View>
      </View>

      {showDetail ? (
        <View className="mx-4 mt-8 rounded-[28px] border border-[#7BE9E7] bg-white/95 px-4 py-4">
          <Text className="text-[17px] font-semibold leading-6 text-[#293231]">
            {detailTitle}
          </Text>

          {pregnancyType === "weeks" ? (
            <TextInput
              value={weeks}
              onChangeText={setWeeks}
              keyboardType="number-pad"
              placeholder={enterWeeksText}
              placeholderTextColor="rgba(41,50,49,0.35)"
              className="mt-4 h-[46px] rounded-[10px] bg-[#E8FBFB] px-4 text-[16px] text-[#293231]"
            />
          ) : pregnancyType === "just_found" ? null : (
            <View className="mt-4 flex-row items-center gap-3">
              <DateField
                label={monthText}
                value={dateData.month}
                onPress={() => onOpenPicker("month")}
              />
              <View className="w-[76px]">
                <DateField
                  label={dayText}
                  value={dateData.day}
                  onPress={() => onOpenPicker("day")}
                />
              </View>
              <View className="w-[89px]">
                <DateField
                  label={yearText}
                  value={dateData.year}
                  onPress={() => onOpenPicker("year")}
                />
              </View>
            </View>
          )}

          <View className="mt-6 flex-row justify-end gap-2">
            <TinyButton label={continueText} onPress={onContinue} filled disabled={!canContinue} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
