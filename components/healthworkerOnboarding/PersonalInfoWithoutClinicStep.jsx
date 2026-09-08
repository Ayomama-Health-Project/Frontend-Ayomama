import { Text, TextInput, View } from "react-native";
import { StepHeading } from "../pregnantMotherOnboarding/shared";
import { useTranslation } from "../../utils/translator";

function Label({ children, compact }) {
  return (
    <Text
      className={`${
        compact ? "text-[14px] font-light text-[#293231]" : "text-[16px] font-medium text-[#293231]/50"
      }`}
    >
      {children}
    </Text>
  );
}

function Input(props) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="rgba(41,50,49,0.33)"
      className="h-[46px] rounded-[10px] border border-white bg-white px-4 text-[16px] text-[#293231]"
    />
  );
}

export default function PersonalInfoWithoutClinicStep({
  values,
  updateField,
}) {
  const titleText = useTranslation("Personal information");
  const fullNameText = useTranslation("Full Name");
  const fullNamePlaceholder = useTranslation("Enter your full name");
  const stateText = useTranslation("State");
  const lgaText = useTranslation("LGA");
  const occupationText = useTranslation("Occupation");
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle="" />

      <View className="px-5 pt-[17px] gap-[19px]">
        <View className="gap-[5px]">
          <Label>{fullNameText}</Label>
          <Input
            placeholder={fullNamePlaceholder}
            value={values.fullName}
            onChangeText={(value) => updateField("fullName", value)}
          />
        </View>

        <View className="flex-row gap-5">
          <View className="flex-1 gap-[5px]">
            <Label>{stateText}</Label>
            <Input
              placeholder={stateText}
              value={values.state}
              onChangeText={(value) => updateField("state", value)}
            />
          </View>

          <View className="flex-1 gap-[5px]">
            <Label>{lgaText}</Label>
            <Input
              placeholder={lgaText}
              value={values.lga}
              onChangeText={(value) => updateField("lga", value)}
            />
          </View>
        </View>

        <View className="gap-[5px]">
          <Label compact>{occupationText}</Label>
          <Input
            placeholder={occupationText}
            value={values.occupation}
            onChangeText={(value) => updateField("occupation", value)}
          />
        </View>
      </View>
    </View>
  );
}
