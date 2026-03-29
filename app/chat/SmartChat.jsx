import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHeader } from "../../components/shared/hub/shared";

export default function SmartChat() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F5F0]" edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#DFF4EE", "#FBE4DA"]}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <BackHeader title="Smart Chat" onBack={() => router.back()} accentTitle />

      <View className="flex-1 items-center justify-center px-5">
        <Image
          source={require("../../assets/images/smartchat.png")}
          className="h-72 w-72"
          resizeMode="contain"
        />
      </View>

      <View className="px-5 pb-8">
        <View className="flex-row items-center rounded-[18px] bg-white px-4 py-3">
          <TouchableOpacity activeOpacity={0.82} className="mr-4">
            <Text className="text-[34px] leading-[34px] text-[#293231]">+</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Ask anything"
            placeholderTextColor="#9EA5A3"
            className="flex-1 text-[16px] text-[#293231]"
          />
          <TouchableOpacity activeOpacity={0.82}>
            <Text className="text-[24px] text-[#293231]">◔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
