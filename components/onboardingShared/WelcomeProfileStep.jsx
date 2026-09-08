import { Image, Text, View } from "react-native";
import { StepHeading } from "../pregnantMotherOnboarding/shared";
import { useTranslation } from "../../utils/translator";

export default function WelcomeProfileStep({ subtitle }) {
  const titleText = useTranslation("Welcome to AYOMAMA");
  const defaultSubtitleText = useTranslation(
    "Let's complete your profile so we can personalize your care experience, reminders, and support journey.",
  );
  const cardTitleText = useTranslation("Complete your profile");
  const cardDescriptionText = useTranslation(
    "This only takes a few steps and helps us set up the right experience for your role.",
  );

  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle={subtitle || defaultSubtitleText} />

      <View className="px-5 pt-10">
        <View className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-6">
          <View className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#DDF3EF]" />
          <View className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-[#FDE8EE]" />

          <View className="mb-5 h-16 w-16 items-center justify-center rounded-[20px] bg-[#E8F4F1]">
            <Image
              source={require("../../assets/images/AyomamaLogo.png")}
              className="h-10 w-10"
              resizeMode="contain"
            />
          </View>

          <Text className="text-[20px] font-bold text-[#293231]">
            {cardTitleText}
          </Text>
          <Text className="mt-3 text-[14px] leading-6 text-[#5F6C6B]">
            {cardDescriptionText}
          </Text>
        </View>
      </View>
    </View>
  );
}
