import { Text, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import {
  InputField,
  Label,
  StepHeading,
} from "../pregnantMotherOnboarding/shared";

export default function PersonalInfoStep({
  fullName,
  setFullName,
  relationship,
  setRelationship,
}) {
  const titleText = useTranslation("Personal information");
  const fullNameText = useTranslation("Full Name");
  const fullNamePlaceholder = useTranslation("Enter your full name");
  const relationshipText = useTranslation("What's your relationship to the mother");
  const relationshipPlaceholder = useTranslation("Husband, partner, brother...");
  const helperText = useTranslation(
    "This helps us personalize your support journey and surface the most relevant updates for you.",
  );
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle="" />

      <View className="px-5 pt-[17px]">
        <View className="gap-[19px]">
          <View className="gap-[5px]">
            <Label>{fullNameText}</Label>
            <InputField
              placeholder={fullNamePlaceholder}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View className="gap-[5px]">
            <Label>{relationshipText}</Label>
            <InputField
              placeholder={relationshipPlaceholder}
              value={relationship}
              onChangeText={setRelationship}
            />
          </View>
        </View>

        <Text className="mt-4 text-[13px] leading-5 text-[#293231]/45">
          {helperText}
        </Text>
      </View>
    </View>
  );
}
