import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthFrame({
  title,
  subtitle,
  children,
  footer,
  scrollEnabled = true,
}) {
  const router = useRouter();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-[#FCFCFC]">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={scrollEnabled}
          >
            <View className="pt-2 pb-4">
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.82}
                className="h-12 w-12 items-center justify-center rounded-full border border-[#DDE8E5] bg-white"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 10,
                }}
              >
                <Ionicons name="arrow-back" size={22} color="#293231" />
              </TouchableOpacity>
            </View>

            <View className="items-start">
              <Image
                source={require("../../assets/images/AyomamaLogo.png")}
                className="h-24 w-24"
                resizeMode="contain"
              />
            </View>

            <Text className="mb-2 text-[28px] font-bold text-[#293231]">
              {title}
            </Text>
            <Text className="mb-8 text-[15px] text-[#6B7280]">{subtitle}</Text>

            {children}

            <View className="flex-1" />

            {footer ? <View className="py-8">{footer}</View> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
