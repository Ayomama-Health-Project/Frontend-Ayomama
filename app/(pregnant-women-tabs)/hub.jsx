import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F5F0]" edges={["top"]}>
      <LinearGradient
        colors={["#DFF4EE", "#FBE4DA"]}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <View className="flex-1 px-5 pt-12">
        <Text className="w-full text-[22px] font-bold leading-10 text-[#293231]">
          For every question and every worry,I will be your{" "}
          <Text className="text-[#FF7F50]">gentle AI companion</Text>
        </Text>

        <View className="mt-4 flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => router.push("/chat/SmartChat")}
            activeOpacity={0.85}
            className="flex-1 rounded-[16px] bg-white/90 px-6 py-4"
          >
            <Text className="text-center text-[16px] font-medium text-[#293231]">Smart Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} className="h-14 w-14 items-center justify-center rounded-full bg-white/90">
            <Ionicons name="mic-outline" size={24} color="#293231" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} className="h-14 w-14 items-center justify-center rounded-full bg-white/90">
            <Ionicons name="image-outline" size={24} color="#293231" />
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row gap-5">
          <TouchableOpacity
            onPress={() => router.push("/community")}
            activeOpacity={0.85}
            className="flex-1 rounded-[32px] bg-white/90 px-4 py-6"
            style={{ minHeight: 168 }}
          >
            <Ionicons name="people" size={22} color="#293231" />
            <Text className="mt-10 text-[18px] font-bold text-[#293231]">Community</Text>
            <Text className="mt-1 text-[15px] leading-6 text-[#3B413F]">share and learn new things.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/babyDevelopment/development")}
            activeOpacity={0.85}
            className="flex-1 rounded-[32px] bg-white/90 px-4 py-6"
            style={{ minHeight: 168 }}
          >
            <Ionicons name="happy" size={22} color="#293231" />
            <Text className="mt-10 text-[18px] font-bold text-[#293231]">Baby Development</Text>
            <Text className="mt-1 text-[15px] leading-6 text-[#3B413F]">
              Learn more about the development of your child
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
