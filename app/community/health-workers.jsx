import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityTabs } from "../../components/shared/hub/shared";
import { HEALTH_WORKERS } from "../../components/shared/hub/data";
import { Ionicons } from "@expo/vector-icons";

export default function HealthWorkersScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#F7F5F0]" edges={["top", "bottom"]}>
      <View className="px-5 pb-4 pt-3">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.82} className="mr-4 h-10 w-10 items-center justify-center">
            <Ionicons name="arrow-back" size={22} color="#293231" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center rounded-[14px] bg-white px-4 py-3">
            <Ionicons name="search-outline" size={18} color="#293231" />
            <TextInput placeholder="Search health workers..." placeholderTextColor="#697270" className="ml-3 flex-1 text-[16px]" />
          </View>
        </View>
      </View>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <CommunityTabs
          active="workers"
          onChange={(key) => {
            if (key === "community") router.replace("/community");
            if (key === "messages") router.replace("/community/messages");
            if (key === "blogs") router.replace("/community/blogs");
          }}
        />
        <View className="mt-6">
          {HEALTH_WORKERS.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => router.push("/community/health-worker-detail")} activeOpacity={0.82} className="mb-5 flex-row items-center rounded-[18px] bg-white px-3 py-3">
              <Image source={item.avatar} className="mr-4 h-16 w-16 rounded-full border-2 border-[#0B7A66]" />
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-[#293231]">{item.name}</Text>
                <Text className="mt-1 text-[15px] text-[#3D4644]">{item.role}</Text>
                <Text className="mt-2 text-[15px] font-bold text-[#00D2B3]">Following</Text>
              </View>
              <View className="rounded-[14px] bg-[#F8ECE5] px-4 py-3">
                <Text className="text-[14px] font-medium text-[#293231]">▣ Message</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
