import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHeader } from "../../components/shared/hub/shared";

function TipCard({ text }) {
  return (
    <View className="mb-5 rounded-[22px] bg-[#F6F0EC] px-5 py-5">
      <View className="flex-row items-center">
        <Text className="mr-4 text-[22px]">👶</Text>
        <Text className="flex-1 text-[16px] font-medium leading-7 text-[#293231]">{text}</Text>
      </View>
    </View>
  );
}

export default function BabyDevelopment() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <BackHeader title="Baby Development" onBack={() => router.back()} />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="rounded-[28px] border border-[#00D2B3] px-5 py-5">
          <View className="flex-row items-center">
            <Text className="mr-2 text-[18px]">👶</Text>
            <Text className="text-[18px] font-bold text-[#293231]">Your baby is the size of a lime🍋</Text>
          </View>

          <Text className="mt-8 text-[18px] font-medium text-[#293231]">Week 18 Milestones</Text>
          <View className="items-center">
            <View className="mt-5 rounded-[24px] bg-[#DFF4EE] px-8 py-5">
              <Image source={require("../../assets/images/infant.png")} className="h-40 w-28" resizeMode="contain" />
            </View>
          </View>

          <View className="mt-4 rounded-[22px] border border-[#00D2B3] px-4 py-4">
            <Text className="mb-3 text-[16px] leading-7 text-[#293231]">• Your baby can now hear sounds 🎉</Text>
            <Text className="mb-3 text-[16px] leading-7 text-[#293231]">• Your baby’s finger and toes are growing 🎉</Text>
            <Text className="text-[16px] leading-7 text-[#293231]">• Your baby can move actively 🎉</Text>
          </View>
        </View>

        <View className="mt-8">
          <TipCard text="Your baby now weighs about 900g and is around 36cm long" />
          <TipCard text="You might notice more pain this week, try gentle walk and keep hydrated" />
          <TipCard text="Add fruit like pawpaw and vegetable like spinach to your meal" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
