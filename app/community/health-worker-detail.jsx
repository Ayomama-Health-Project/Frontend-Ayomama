import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HealthWorkerDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <LinearGradient colors={["#DFF4EE", "#FBE4DA"]} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
      <View className="absolute left-0 right-0 top-0 h-44 rounded-b-[120px] bg-white" />
      <View className="flex-1 px-5 pt-24">
        <View className="flex-row items-center">
          <Image source={require("../../assets/images/profilepic.png")} className="mr-4 h-24 w-24 rounded-full border-[3px] border-[#0B7A66]" />
          <View className="flex-1">
            <Text className="text-[18px] font-bold text-[#293231]">Dr Aishat Mohammed</Text>
            <Text className="mt-2 text-[16px] text-[#3D4644]">Midwife, Lagos State</Text>
          </View>
        </View>

        <View className="mt-12 gap-5">
          <Text className="text-[16px] text-[#111]">📞   +234 9156 2625 78</Text>
          <Text className="text-[16px] text-[#111]">✉   favourwilliams2019@gmail.com</Text>
          <Text className="text-[16px] leading-7 text-[#111]">📍   16 Raji Hassan Street, Americana Busstop, Anthony Road, Lagos Nigeria</Text>
        </View>

        <View className="mt-16 gap-4">
          <TouchableOpacity className="h-12 items-center justify-center rounded-[16px] border border-[#00D2B3] bg-white">
            <Text className="text-[18px] font-semibold text-[#293231]">Following</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/community/message-thread")} className="h-12 items-center justify-center rounded-[16px] bg-[#57D7CC]">
            <Text className="text-[18px] font-semibold text-[#293231]">Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
