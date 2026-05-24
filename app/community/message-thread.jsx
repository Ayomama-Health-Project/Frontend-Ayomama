import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyStateCard } from "../../components/shared/hub/shared";
import { motherApi } from "../../services/motherApi";

export default function MessageThreadScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const scrollViewRef = useRef(null);
  const threadId = useMemo(() => String(params.threadId || ""), [params.threadId]);
  const threadName = useMemo(
    () => String(params.threadName || "Conversation"),
    [params.threadName],
  );

  useEffect(() => {
    if (!threadId) {
      setIsLoading(false);
      return;
    }

    motherApi
      .fetchThreadMessages(threadId)
      .then(setMessages)
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Conversation unavailable",
          text2: "We could not load this conversation right now.",
          position: "top",
        });
      })
      .finally(() => setIsLoading(false));
  }, [threadId]);

  useEffect(() => {
    if (!messages.length) return;
    const timeoutId = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSend = async () => {
    const trimmed = draft.trim();
    if (!trimmed || !threadId || isSending) return;

    setIsSending(true);
    try {
      const created = await motherApi.sendThreadMessage(threadId, { content: trimmed });
      setMessages((prev) => [...prev, created]);
      setDraft("");
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Send failed",
        text2: "We could not send that message right now.",
        position: "top",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-5 pb-5 pt-3">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.82}>
          <Text className="text-[28px] text-[#293231]">×</Text>
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-[#293231]">{threadName}</Text>
        <View className="w-6" />
      </View>
      <View className="border-b border-[#E6ECE9]" />
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-5 pt-8"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="gap-4">
            <View className="h-16 rounded-[18px] bg-[#EEF4F1]" />
            <View className="ml-auto h-16 w-[75%] rounded-[18px] bg-[#F3F6F4]" />
            <View className="h-16 w-[82%] rounded-[18px] bg-[#EEF4F1]" />
          </View>
        ) : messages.length === 0 ? (
          <EmptyStateCard
            title="No messages yet"
            description="This conversation is ready. Send a message to get support started."
          />
        ) : (
          messages.map((message) =>
            message.role === "assistant" ? (
              <View key={message.id} className="mb-5 flex-row items-end">
                <Image
                  source={require("../../assets/images/profilepic.png")}
                  className="mr-3 h-10 w-10 rounded-full"
                />
                <View className="max-w-[80%] rounded-[18px] bg-[#E9F7F4] px-4 py-4 shadow-sm">
                  <Text className="text-[16px] leading-7 text-[#111]">{message.content}</Text>
                </View>
              </View>
            ) : (
              <View key={message.id} className="mb-5 items-end">
                <View className="max-w-[78%] rounded-[18px] border border-[#E4E4E4] bg-white px-4 py-4 shadow-sm">
                  <Text className="text-[16px] leading-7 text-[#111]">{message.content}</Text>
                </View>
              </View>
            ),
          )
        )}
      </ScrollView>
      <View className="px-4 pb-7">
        <View className="flex-row items-center rounded-[18px] border border-[#E4E4E4] bg-white px-4 py-3">
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Type here..."
            placeholderTextColor="#9EA5A3"
            className="flex-1 text-[16px]"
          />
          <TouchableOpacity
            onPress={handleSend}
            activeOpacity={0.82}
            disabled={!draft.trim() || isSending}
            className={`h-10 w-10 items-center justify-center rounded-full ${draft.trim() && !isSending ? "bg-[#14D1BF]" : "bg-[#DDE5E2]"}`}
          >
            <Text className="text-[22px] text-[#111]">↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
