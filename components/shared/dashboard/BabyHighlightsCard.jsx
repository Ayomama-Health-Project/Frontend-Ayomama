import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

export default function BabyHighlightsCard() {
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
            <Text className="text-[18px] font-bold text-[#23413C]">
              Week 18
            </Text>
          </View>
          <Text className="mt-5 text-[16px] leading-8 text-[#23413C]">
            Baby Zion is now about thesize of a lime👋
            {"\n\n"}
            Tiny fingers and toes areforming. Remember to restand eat well mama.
          </Text>
        </View>
        <Image
          source={require("../../../assets/images/infant.png")}
          className="h-40 w-28"
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}
