import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function CommunityCard({ posts, title = "Community Forum", emptyText = "No community updates yet." }) {
  return (
    <Card>
      <SectionTitle icon="people-outline" title={title} />
      <View className="gap-3">
        {posts.length === 0 ? (
          <View className="rounded-[20px] bg-[#F8FBFA] px-4 py-4">
            <Text className="text-[13px] leading-6 text-[#6E7A77]">{emptyText}</Text>
          </View>
        ) : (
          posts.map((post, index) => (
            <View key={post} className="flex-row items-start rounded-[20px] bg-[#F8FBFA] px-3 py-3">
              <View className="mr-3 mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-[#E9F7F3]">
                <Ionicons name="chatbubble-ellipses-outline" size={13} color="#006D5B" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-medium leading-5 text-[#223130]">{post}</Text>
                <Text className="mt-1 text-[11px] text-[#7A8784]">Trending thread #{index + 1}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </Card>
  );
}
