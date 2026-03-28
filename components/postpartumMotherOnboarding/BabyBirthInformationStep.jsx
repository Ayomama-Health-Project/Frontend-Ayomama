import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StepHeading } from "../pregnantMotherOnboarding/shared";
import { useTranslation } from "../../utils/translator";

function ImmunizationOption({ label, selected, onPress }) {
  const translatedLabel = useTranslation(label);
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      className={`h-[46px] w-[129px] flex-row items-center justify-between rounded-[10px] px-[17px] ${
        selected ? "border border-[#006D5B] bg-white" : "bg-white"
      }`}
    >
      <Text className="text-[16px] font-medium text-[#293231]/50">{translatedLabel}</Text>
      <View
        className={`h-5 w-5 rounded-full border ${
          selected ? "border-[#006D5B] bg-[#006D5B]" : "border-[#D4D4D4] bg-[#D4D4D4]"
        }`}
      />
    </TouchableOpacity>
  );
}

export default function BabyBirthInformationStep({
  birthInfo,
  setBirthInfo,
}) {
  const titleText = useTranslation("Baby Birth Information");
  const hospitalText = useTranslation("Birth Hospital / Clinic Name");
  const hospitalPlaceholder = useTranslation("Enter hospital or clinic");
  const immunizationText = useTranslation("Have you started baby immunizations?");
  const concernsText = useTranslation("Any health concerns or notes?");
  const notesPlaceholder = useTranslation("Add notes");
  const weightText = useTranslation("Birth Weight");
  const weightPlaceholder = useTranslation("Enter birth weight");
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle="" />

      <View className="px-5 pt-[17px] gap-[19px]">
        <View className="gap-[5px]">
          <Text className="text-[16px] font-medium text-[#293231]/50">
            {hospitalText}
          </Text>
          <TextInput
            value={birthInfo.hospital}
            onChangeText={(value) =>
              setBirthInfo((prev) => ({ ...prev, hospital: value }))
            }
            placeholder={hospitalPlaceholder}
            placeholderTextColor="rgba(41,50,49,0.33)"
            className="h-[46px] rounded-[10px] bg-white px-4 text-[16px] text-[#293231]"
          />
        </View>

        <View className="gap-[5px]">
          <Text className="text-[16px] font-medium text-[#293231]/50">
            {immunizationText}
          </Text>
          <View className="flex-row gap-[13px]">
            <ImmunizationOption
              label="Yes"
              selected={birthInfo.immunization === "yes"}
              onPress={() =>
                setBirthInfo((prev) => ({ ...prev, immunization: "yes" }))
              }
            />
            <ImmunizationOption
              label="No"
              selected={birthInfo.immunization === "no"}
              onPress={() =>
                setBirthInfo((prev) => ({ ...prev, immunization: "no" }))
              }
            />
          </View>
        </View>

        <View className="gap-[5px]">
          <Text className="text-[16px] font-medium text-[#293231]/50">
            {concernsText}
          </Text>
          <TextInput
            value={birthInfo.notes}
            onChangeText={(value) =>
              setBirthInfo((prev) => ({ ...prev, notes: value }))
            }
            placeholder={notesPlaceholder}
            placeholderTextColor="rgba(41,50,49,0.33)"
            className="h-[46px] rounded-[10px] bg-white px-4 text-[16px] text-[#293231]"
          />
        </View>

        <View className="gap-[5px]">
          <Text className="text-[16px] font-medium text-[#293231]/50">
            {weightText}
          </Text>
          <TextInput
            value={birthInfo.weight}
            onChangeText={(value) =>
              setBirthInfo((prev) => ({ ...prev, weight: value }))
            }
            placeholder={weightPlaceholder}
            placeholderTextColor="rgba(41,50,49,0.33)"
            className="h-[46px] rounded-[10px] bg-white px-4 text-[16px] text-[#293231]"
          />
        </View>
      </View>
    </View>
  );
}
