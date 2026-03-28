import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../utils/translator";

const mockMessages = [
  {
    id: 1,
    from: "partner",
    text: "How are you feeling today?",
    time: "9:10 AM",
  },
  {
    id: 2,
    from: "me",
    text: "A bit tired, but better after resting 💙",
    time: "9:15 AM",
  },
  {
    id: 3,
    from: "partner",
    text: "I made you some soup. I'll bring it over later.",
    time: "9:20 AM",
  },
  { id: 4, from: "me", text: "You're the best ❤️", time: "9:22 AM" },
];

const Bubble = ({ msg }) => {
  const isMe = msg.from === "me";
  return (
    <View
      className={`mb-3 max-w-[78%] ${isMe ? "self-end items-end" : "self-start items-start"}`}
    >
      <View
        className={`rounded-2xl px-4 py-3 ${isMe ? "bg-[#293231]" : "bg-white"}`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 1,
        }}
      >
        <Text
          className={`text-sm leading-5 ${isMe ? "text-white" : "text-[#293231]"}`}
        >
          {msg.text}
        </Text>
      </View>
      <Text className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</Text>
    </View>
  );
};

export default function Messages() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const messagesText = useTranslation("Messages");
  const typeMessageText = useTranslation("Type a message...");
  const partnerNameText = useTranslation("Your Partner");

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: message.trim(), time: "Now" },
    ]);
    setMessage("");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={["top"]}>
      <View
        className="px-5 py-4 bg-white border-b border-gray-100 flex-row items-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View className="w-10 h-10 rounded-full bg-[#293231] items-center justify-center mr-3">
          <Ionicons name="person" size={18} color="#fff" />
        </View>
        <View>
          <Text className="text-sm font-semibold text-[#293231]">
            {partnerNameText}
          </Text>
          <Text className="text-xs text-green-500">Online</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {messages.map((msg) => (
            <Bubble key={msg.id} msg={msg} />
          ))}
          <View className="h-4" />
        </ScrollView>

        <View
          className="flex-row items-center px-4 py-3 bg-white border-t border-gray-100"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <TextInput
            className="flex-1 bg-gray-50 rounded-full px-4 py-3 text-sm text-[#293231] mr-3"
            placeholder={typeMessageText}
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            className="w-11 h-11 rounded-full bg-[#293231] items-center justify-center"
          >
            <Ionicons name="send" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
