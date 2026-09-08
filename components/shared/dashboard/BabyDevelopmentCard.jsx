import { Image, Text, TouchableOpacity, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function BabyDevelopmentCard({
  onLearnMore,
  title = "Baby's Development",
  milestoneTitle = "Baby development",
  milestones = [
    "Fresh development milestones will appear here once your pregnancy stage is available.",
  ],
  ctaLabel = "Learn more",
  imageSource = require("../../../assets/images/infant.png"),
}) {
  return (
    <Card>
      <SectionTitle title={title} />
      <View className="items-center">
        <Image
          source={imageSource}
          className="h-28 w-24"
          resizeMode="contain"
        />
        <Text className="mt-3 text-[18px] font-bold text-[#223130]">{milestoneTitle}</Text>
      </View>
      <View className="mt-4 gap-2">
        {milestones.map((milestone) => (
          <Text key={milestone} className="text-[13px] leading-6 text-[#30413E]">
            • {milestone}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onLearnMore}
        className="mt-4 h-11 items-center justify-center rounded-full bg-[#006D5B]"
      >
        <Text className="text-[14px] font-semibold text-white">{ctaLabel}</Text>
      </TouchableOpacity>
    </Card>
  );
}
