import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ios = Platform.OS === "ios";

export default function SmartChat() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // TODO: Implement chat functionality with AI
      setMessage("");
      Keyboard.dismiss();
    }
  };

  const handleAttachment = () => {
    console.log("Attachment clicked");
    // TODO: Implement attachment functionality
  };

  const handleVoiceInput = () => {
    console.log("Voice input clicked");
    // TODO: Implement voice input functionality
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        {/* Gradient Background */}
        <LinearGradient
          colors={["#B5FFFC", "#FFDEE9"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <KeyboardAvoidingView
          className="flex-1"
          behavior={ios ? "padding" : "height"}
          keyboardVerticalOffset={ios ? 0 : 0}
        >
          {/* Header */}
          <View
            className="px-6 flex-row items-center justify-between"
            style={{ paddingTop: ios ? 64 : 76 }}
          >
            <TouchableOpacity
              onPress={handleBack}
              className="w-12 h-12 rounded-full bg-white items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#293231" />
            </TouchableOpacity>

            <Text className="text-xl font-bold text-[#FF7F50]">Smart Chat</Text>

            <View className="w-12" />
          </View>

          {/* Chat Content Area */}
          <View className="flex-1 items-center justify-center px-6">
            {/* AI Orb/Avatar */}
            <Image
              source={require("../../assets/images/smartchat.png")}
              className="w-full h-full rounded-full mb-8"
              resizeMode="contain"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 8,
              }}
            />

            {/* Placeholder for chat messages */}
            {/* TODO: Add chat messages list here */}
          </View>

          {/* Input Area */}
          <View className="px-6 pb-8">
            <View className="flex-row items-center">
              {/* Add Button */}
              <TouchableOpacity
                onPress={handleAttachment}
                className="w-12 h-12 rounded-full bg-white items-center justify-center mr-3"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Ionicons name="add" size={28} color="#293231" />
              </TouchableOpacity>

              {/* Text Input */}
              <View
                className="flex-1 bg-white rounded-full px-5 py-3 flex-row items-center mr-3"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Ask anything"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 text-[16px] text-[#293231]"
                  multiline={false}
                  returnKeyType="send"
                  onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity onPress={handleVoiceInput}>
                  <Ionicons name="mic" size={24} color="#293231" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
