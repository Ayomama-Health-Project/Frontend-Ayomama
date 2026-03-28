import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../../utils/translator";

const PartnerLogIn = () => {
  const router = useRouter();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Translate all text
  const titleText = useTranslation("Partner Login");
  const subtitleText = useTranslation("Log in to track your partner's journey");
  const emailPlaceholder = useTranslation("Email");
  const passwordPlaceholder = useTranslation("Password");
  const loginButtonText = useTranslation("Log In");
  const noAccountText = useTranslation("Don't have an account?");
  const signUpText = useTranslation("Sign up");
  const orText = useTranslation("or");
  const signInGoogleText = useTranslation("Sign in with Google");
  const signInAppleText = useTranslation("Sign in with Apple");

  const handleLogIn = () => {
    router.replace("/onboarding/partner");
  };

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
          >
            {/* Logo */}
            <View className="items-start">
              <Image
                source={require("../../../assets/images/AyomamaLogo.png")}
                className="w-24 h-24"
                resizeMode="contain"
              />
            </View>

            {/* Title & Subtitle */}
            <Text className="text-[28px] font-bold text-[#293231] mb-2">
              {titleText}
            </Text>
            <Text className="text-gray-500 text-[15px] mb-8">
              {subtitleText}
            </Text>

            {/* Email Input */}
            <TextInput
              placeholder={emailPlaceholder}
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 mb-5"
              keyboardType="email-address"
            />

            {/* Password Input */}
            <View className="relative mb-5">
              <TextInput
                placeholder={passwordPlaceholder}
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-4"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-[#006D5B] py-4 rounded-2xl"
              onPress={handleLogIn}
              activeOpacity={0.85}
            >
              <Text className="text-white text-center font-bold text-base">
                {loginButtonText}
              </Text>
            </TouchableOpacity>

            {/* Or Divider */}
            <View className="flex-row items-center py-5">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="px-4 text-gray-400 text-sm">{orText}</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              className="border border-gray-300 py-4 rounded-2xl flex-row items-center justify-center mb-5"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text className="text-gray-700 font-medium ml-3">
                {signInGoogleText}
              </Text>
            </TouchableOpacity>

            {/* Apple Sign In */}
            <TouchableOpacity
              className="bg-[#293231] py-4 rounded-2xl flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-apple" size={22} color="white" />
              <Text className="text-white font-medium ml-3">
                {signInAppleText}
              </Text>
            </TouchableOpacity>

            {/* Spacer */}
            <View className="flex-1" />

            {/* Footer */}
            <View className="py-8 items-center">
              <View className="flex-row items-center">
                <Text className="text-gray-600 font-medium">
                  {noAccountText}{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/auth/partner/signup")}
                >
                  <Text className="text-[#006D5B] font-bold">{signUpText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PartnerLogIn;
