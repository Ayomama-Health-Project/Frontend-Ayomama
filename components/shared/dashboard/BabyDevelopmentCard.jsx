import { Image, Text, TouchableOpacity, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function BabyDevelopmentCard({ onLearnMore }) {
  return (
    <Card>
      <SectionTitle title="Baby's Development" />
      <View className="items-center">
        <Image
          source={require("../../../assets/images/infant.png")}
          className="h-28 w-24"
          resizeMode="contain"
        />
        <Text className="mt-3 text-[18px] font-bold text-[#223130]">Week 18 Milestones</Text>
      </View>
      <View className="mt-4 gap-2">
        <Text className="text-[13px] leading-6 text-[#30413E]">• Your baby can now hear sounds.</Text>
        <Text className="text-[13px] leading-6 text-[#30413E]">• Tiny fingers and toes are growing beautifully.</Text>
        <Text className="text-[13px] leading-6 text-[#30413E]">• Movement is becoming stronger and more active.</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onLearnMore}
        className="mt-4 h-11 items-center justify-center rounded-full bg-[#006D5B]"
      >
        <Text className="text-[14px] font-semibold text-white">Learn more about week 18</Text>
      </TouchableOpacity>
    </Card>
  );
}
