import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { motherApi } from "../../services/motherApi";

export default function HealthWorkerDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const workerId = useMemo(() => String(params.workerId || ""), [params.workerId]);
  const [isFollowing, setIsFollowing] = useState(
    String(params.following || "false") === "true",
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const worker = useMemo(
    () => ({
      name: String(params.name || "Health Worker"),
      role: String(params.role || "Maternal care support"),
      phone: String(params.phone || "Not available"),
      email: String(params.email || "Not available"),
      address: String(params.address || "Address not available"),
    }),
    [params],
  );

  const handleToggleFollow = async () => {
    if (!workerId || isUpdating) return;
    setIsUpdating(true);
    try {
      const updated = await motherApi.toggleHealthWorkerFollow(workerId);
      setIsFollowing(updated.following);
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: "We could not update this health worker right now.",
        position: "top",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStartConversation = async () => {
    try {
      const thread = await motherApi.createCommunityThread({
        title: worker.name,
        targetAccountId: workerId,
        content: `Hello ${worker.name}, I would like some support today.`,
      });
      router.push({
        pathname: "/community/message-thread",
        params: {
          threadId: thread.id,
          threadName: thread.title,
        },
      });
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Conversation unavailable",
        text2: "We could not start a conversation right now.",
        position: "top",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#DFF4EE", "#FBE4DA"]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <View className="absolute left-0 right-0 top-0 h-44 rounded-b-[120px] bg-white" />
      <View className="flex-1 px-5 pt-24">
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/images/profilepic.png")}
            className="mr-4 h-24 w-24 rounded-full border-[3px] border-[#0B7A66]"
          />
          <View className="flex-1">
            <Text className="text-[18px] font-bold text-[#293231]">{worker.name}</Text>
            <Text className="mt-2 text-[16px] text-[#3D4644]">{worker.role}</Text>
          </View>
        </View>

        <View className="mt-12 gap-5">
          <Text className="text-[16px] text-[#111]">📞   {worker.phone}</Text>
          <Text className="text-[16px] text-[#111]">✉   {worker.email}</Text>
          <Text className="text-[16px] leading-7 text-[#111]">📍   {worker.address}</Text>
        </View>

        <View className="mt-16 gap-4">
          <TouchableOpacity
            onPress={handleToggleFollow}
            className={`h-12 items-center justify-center rounded-[16px] ${isFollowing ? "border border-[#00D2B3] bg-white" : "bg-[#0B7A66]"}`}
          >
            <Text className={`text-[18px] font-semibold ${isFollowing ? "text-[#293231]" : "text-white"}`}>
              {isUpdating ? "Please wait..." : isFollowing ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleStartConversation}
            className="h-12 items-center justify-center rounded-[16px] bg-[#57D7CC]"
          >
            <Text className="text-[18px] font-semibold text-[#293231]">Send Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
