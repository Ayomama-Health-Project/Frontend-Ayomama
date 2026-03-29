import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommunityTabs } from "../../components/shared/hub/shared";
import { MESSAGE_THREADS } from "../../components/shared/hub/data";

export default function CommunityMessagesScreen() {
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
            <TextInput placeholder="Search messages..." placeholderTextColor="#697270" className="ml-3 flex-1 text-[16px]" />
          </View>
        </View>
      </View>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <CommunityTabs
          active="messages"
          onChange={(key) => {
            if (key === "community") router.replace("/community");
            if (key === "workers") router.replace("/community/health-workers");
            if (key === "blogs") router.replace("/community/blogs");
          }}
        />
        <View className="mt-6">
          {MESSAGE_THREADS.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => router.push("/community/message-thread")} activeOpacity={0.82} className="mb-4 flex-row items-center border-b border-[#D8E0DD] pb-4">
              <Image source={item.avatar} className="mr-4 h-11 w-11 rounded-full" />
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="text-[16px] font-bold text-[#293231]">{item.name}</Text>
                  <Text className="text-[14px] font-semibold text-[#0B7A66]">{item.time}</Text>
                </View>
                <Text className="mt-1 text-[15px] text-[#3D4644]">{item.preview}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="px-5 pb-6">
        <TouchableOpacity className="self-end rounded-[12px] bg-[#0B7A66] px-4 py-3">
          <Text className="text-[16px] font-semibold text-white">⊕ New message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
