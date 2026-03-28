import { TextInput, View } from "react-native";
import { StepHeading } from "../pregnantMotherOnboarding/shared";
import { useTranslation } from "../../utils/translator";

export default function BabyNicknameStep({ nickname, setNickname }) {
  const titleText = useTranslation("Baby Nickname Setup");
  const subtitleText = useTranslation("Add a nickname for your little one we’ll use it for tips and updates");
  const placeholderText = useTranslation("Enter nickname");
  return (
    <View className="flex-1">
      <StepHeading
        title={titleText}
        subtitle={subtitleText}
      />

      <View className="px-5 pt-[22px]">
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          placeholder={placeholderText}
          placeholderTextColor="rgba(41,50,49,0.35)"
          className="h-[46px] rounded-[10px] bg-white px-4 text-[16px] text-[#293231]"
        />
      </View>
    </View>
  );
}
