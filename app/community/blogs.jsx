import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackHeader, CommunityTabs } from "../../components/shared/hub/shared";
import { BLOGS } from "../../components/shared/hub/data";

export default function CommunityBlogsScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <BackHeader title="Blogs" onBack={() => router.back()} />
      <ScrollView className="flex-1 px-3" showsVerticalScrollIndicator={false}>
        <CommunityTabs
          active="blogs"
          onChange={(key) => {
            if (key === "community") router.replace("/community");
            if (key === "messages") router.replace("/community/messages");
            if (key === "workers") router.replace("/community/health-workers");
          }}
        />
        <View className="mt-6">
          {BLOGS.map((item) => (
            <View key={item.id} className="mb-6 overflow-hidden rounded-[20px] border border-[#E6ECE9] bg-white">
              <Image source={{ uri: item.image }} style={{ width: "100%", height: 160 }} resizeMode="cover" />
              <View className="px-4 py-4">
                <View className="self-start rounded-full bg-[#F7EDE8] px-3 py-1">
                  <Text className="text-[12px] text-[#8A817D]">{item.category}</Text>
                </View>
                <Text className="mt-3 text-[17px] font-medium text-[#293231]">{item.title}</Text>
                <Text className="mt-2 text-[15px] text-[#697270]">{item.excerpt}</Text>
                <View className="mt-4 flex-row items-center gap-5">
                  <Text>◉ {item.views}</Text>
                  <Text>◔ {item.comments}</Text>
                  <Text>↗ {item.shares}</Text>
                </View>
                <View className="mt-4 border-t border-[#E8E8E8] pt-4">
                  <Text className="text-[14px] text-[#8C8C8C]">{item.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
