import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackHeader,
  CommunityTabs,
} from "../../components/shared/hub/shared";
import {
  BLOGS,
  COMMUNITY_POSTS,
  HEALTH_WORKERS,
  MESSAGE_THREADS,
} from "../../components/shared/hub/data";

function PostCard({ item }) {
  return (
    <View className="mb-5 rounded-[18px] bg-[#F3F6F4] px-4 py-4" style={{ borderLeftWidth: 3, borderLeftColor: "#FF8A57" }}>
      <View className="flex-row">
        <Image source={item.avatar} className="mr-3 h-12 w-12 rounded-full" />
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <Text className="text-[16px] font-bold text-[#293231]">{item.author}:</Text>
            <Text className="text-[14px] font-semibold text-[#0B7A66]">{item.time}</Text>
          </View>
          <Text className="mt-2 text-[16px] leading-8 text-[#293231]">{item.content}</Text>
          <View className="mt-3 flex-row items-center justify-end gap-4">
            <Text className="text-[14px] text-[#0B7A66]">♡ {item.likes}</Text>
            <Text className="text-[14px] text-[#0B7A66]">◧ {item.comments}</Text>
            <Text className="text-[14px] font-semibold text-[#0B7A66]">↗ Comment</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function ThreadRow({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} className="mb-4 flex-row items-center border-b border-[#D8E0DD] pb-4">
      <Image source={item.avatar} className="mr-4 h-11 w-11 rounded-full" />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-[16px] font-bold text-[#293231]">{item.name}</Text>
          <Text className="text-[14px] font-semibold text-[#0B7A66]">{item.time}</Text>
        </View>
        <Text className="mt-1 text-[15px] text-[#3D4644]">{item.preview}</Text>
      </View>
    </TouchableOpacity>
  );
}

function WorkerCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} className="mb-5 flex-row items-center rounded-[18px] bg-white px-3 py-3">
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
  );
}

function BlogCard({ item }) {
  return (
    <View className="mb-6 overflow-hidden rounded-[20px] border border-[#E6ECE9] bg-white">
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
  );
}

export default function CommunityScreen() {
  const router = useRouter();
  const [active, setActive] = useState("community");

  return (
    <SafeAreaView className="flex-1 bg-[#F8F5F0]" edges={["top", "bottom"]}>
      <BackHeader title="Community" onBack={() => router.back()} />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {active === "community" ? null : (
          <View className="mb-4 flex-row items-center rounded-[14px] bg-white px-4 py-3">
            <Ionicons name="search-outline" size={18} color="#293231" />
            <TextInput
              placeholder={
                active === "messages"
                  ? "Search messages..."
                  : active === "workers"
                    ? "Search health workers..."
                    : "Search blogs..."
              }
              placeholderTextColor="#697270"
              className="ml-3 flex-1 text-[16px]"
            />
          </View>
        )}

        <CommunityTabs active={active} onChange={setActive} />

        <View className="mt-6">
          {active === "community"
            ? COMMUNITY_POSTS.map((item) => <PostCard key={item.id} item={item} />)
            : null}

          {active === "messages"
            ? MESSAGE_THREADS.map((item) => (
                <ThreadRow
                  key={item.id}
                  item={item}
                  onPress={() => router.push("/community/message-thread")}
                />
              ))
            : null}

          {active === "workers"
            ? HEALTH_WORKERS.map((item) => (
                <WorkerCard
                  key={item.id}
                  item={item}
                  onPress={() => router.push("/community/health-worker-detail")}
                />
              ))
            : null}

          {active === "blogs"
            ? BLOGS.map((item) => <BlogCard key={item.id} item={item} />)
            : null}
        </View>
      </ScrollView>
      {active === "community" ? (
        <View className="px-5 pb-6">
          <TouchableOpacity className="self-end rounded-[12px] bg-[#0B7A66] px-4 py-3">
            <Text className="text-[16px] font-semibold text-white">⊕ Create new post</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {active === "messages" ? (
        <View className="px-5 pb-6">
          <TouchableOpacity className="self-end rounded-[12px] bg-[#0B7A66] px-4 py-3">
            <Text className="text-[16px] font-semibold text-white">⊕ New message</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
