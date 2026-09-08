import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import StreamedMessage from "../../components/chat/StreamedMessage";
import { BackHeader, EmptyStateCard } from "../../components/shared/hub/shared";
import { chatApi } from "../../services/chatApi";
import useAppAuth from "../../hooks/useAppAuth";
import { useTranslation } from "../../utils/translator";

export default function SmartChat() {
  const router = useRouter();
  const { token } = useAppAuth();
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const scrollViewRef = useRef(null);
  const titleText = useTranslation("Smart Chat");
  const askAnythingText = useTranslation("Ask anything");
  const sendText = useTranslation("Send");
  const clearText = useTranslation("Clear");
  const emptyTitle = useTranslation("Your care conversation starts here");
  const emptyDescription = useTranslation("Ask about pregnancy, baby development, reminders, or everyday wellness and Favour will guide you gently.");
  const fallbackReply = useTranslation("I’m sorry, I couldn’t respond right now. Please try again shortly.");
  const loadingText = useTranslation("Loading your conversation...");

  useEffect(() => {
    chatApi.fetchMessages().then(setMessages).catch(() => null).finally(() => setIsLoadingHistory(false));
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    const timeoutId = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || isSending) return;
    const nextContent = content.trim();
    const userMessage = {
      id: `local-user-${Date.now()}`,
      role: "user",
      content: nextContent,
    };
    const assistantMessage = {
      id: `local-assistant-${Date.now() + 1}`,
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setContent("");
    setIsSending(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => null);

    try {
      const finalMessage = await chatApi.streamMessage(nextContent, token, (delta) => {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: `${message.content}${delta}` }
              : message,
          ),
        );
      });

      if (finalMessage) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessage.id ? finalMessage : message,
          ),
        );
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => null);
    } catch (_error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => null);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessage.id
            ? {
                ...message,
                content: fallbackReply,
              }
            : message,
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = async () => {
    try {
      await chatApi.clearMessages();
      setMessages([]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => null);
      Toast.show({
        type: "success",
        text1: "Conversation cleared",
        text2: "Your Smart Chat history has been cleared.",
        position: "top",
      });
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Clear failed",
        text2: "We could not clear this conversation right now.",
        position: "top",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F5F0]" edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#DFF4EE", "#FBE4DA"]}
        style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <BackHeader
        title={titleText}
        onBack={() => router.back()}
        accentTitle
        right={
          <TouchableOpacity activeOpacity={0.82} onPress={handleClear} className="rounded-full border border-[#D8E6E1] bg-white px-3 py-2">
            <Text className="text-[12px] font-semibold text-[#293231]">{clearText}</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView ref={scrollViewRef} className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 24 }}>
        {isLoadingHistory ? (
          <View className="flex-1 items-center justify-center px-5 pt-16">
            <View className="w-full rounded-[24px] bg-white px-6 py-10">
              <Text className="text-center text-[16px] font-medium text-[#6B7472]">{loadingText}</Text>
            </View>
          </View>
        ) : messages.length === 0 ? (
          <View className="flex-1 items-center justify-center px-5">
            <Image
              source={require("../../assets/images/smartchat.png")}
              className="h-72 w-72"
              resizeMode="contain"
            />
            <View className="mt-2 w-full">
              <EmptyStateCard title={emptyTitle} description={emptyDescription} />
            </View>
          </View>
        ) : (
          <View className="pt-4">
            {messages.map((message) => (
              <View
                key={message.id}
                className={`mb-4 ${message.role === "user" ? "items-end" : "items-start"}`}
              >
                <View
                  className={`max-w-[84%] rounded-[20px] px-4 py-3 ${
                    message.role === "user" ? "bg-[#0B7A66]" : "bg-white"
                  }`}
                >
                  <StreamedMessage
                    content={message.content}
                    isUser={message.role === "user"}
                    shouldStream={false}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View className="px-5 pb-8">
        <View className="flex-row items-center rounded-[18px] bg-white px-4 py-3">
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder={askAnythingText}
            placeholderTextColor="#9EA5A3"
            className="flex-1 text-[16px] text-[#293231]"
            multiline
            textAlignVertical="center"
          />
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={handleSend}
            disabled={isSending || !content.trim()}
            className={`ml-3 rounded-full px-4 py-2 ${isSending || !content.trim() ? "bg-[#DDE5E2]" : "bg-[#0B7A66]"}`}
          >
            <Text className={`text-[13px] font-semibold ${isSending || !content.trim() ? "text-[#7F8986]" : "text-white"}`}>
              {isSending ? "..." : sendText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
