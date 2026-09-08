import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

export default function BabyHighlightsCard({
  stageLabel = "Current stage",
  headline = "Your baby's development is being prepared.",
  description = "Keep your pregnancy dates updated so AYOMAMA can show the right weekly insights and care guidance.",
  imageSource = require("../../../assets/images/infant.png"),
}) {
  return (
    <LinearGradient
      colors={["#FBE4DA", "#A7DED8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 28, padding: 12 }}
    >
      <View className="flex-row items-center justify-between rounded-[26px] border border-[#FF8A57] px-4 py-4">
        <View className="mr-4 flex-1">
          <View className="self-start rounded-full bg-white/95 px-4 py-2">
            <Text className="text-[18px] font-bold text-[#23413C]">{stageLabel}</Text>
          </View>
          <Text className="mt-5 text-[16px] leading-8 text-[#23413C]">{headline}</Text>
          <Text numberOfLines={3} className="mt-3 text-[13px] leading-6 text-[#49625E]">
            {description}
          </Text>
        </View>
        <Image
          source={imageSource}
          className="h-40 w-28"
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}
