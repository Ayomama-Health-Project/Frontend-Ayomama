import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
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
import Toast from "react-native-toast-message";
import useAppAuth from "../../../../hooks/useAppAuth";
import useRedirectAuthenticatedUser from "../../../../hooks/useRedirectAuthenticatedUser";
import { getRoleLoginRoute, getRoleMismatchMessage } from "../../../../utils/authRoutes";
import { useTranslation } from "../../../../utils/translator";

const HealthcareLogIn = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const { login, logout, isLoading } = useAppAuth();
  const { isCheckingAuthScreenAccess } = useRedirectAuthenticatedUser();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Translate all text
  const titleText = useTranslation("Healthcare Worker Login");
  const withoutClinicSubtitleText = useTranslation(
    "Log in as an independent healthcare professional",
  );
  const withClinicSubtitleText = useTranslation("Log in to manage your patients");
  const subtitleText =
    type === "without-clinic" ? withoutClinicSubtitleText : withClinicSubtitleText;
  const emailPlaceholder = useTranslation("Email");
  const passwordPlaceholder = useTranslation("Password");
  const loginButtonText = useTranslation("Log In");
  const loggingInText = useTranslation("Logging in...");
  const forgotPasswordText = useTranslation("Forgot password?");
  const noAccountText = useTranslation("Don't have an account?");
  const signUpText = useTranslation("Sign up");
  const orText = useTranslation("or");
  const signInGoogleText = useTranslation("Sign in with Google");
  const signInAppleText = useTranslation("Sign in with Apple");
  const comingSoonTitle = useTranslation("Coming soon");
  const comingSoonMessage = useTranslation(
    "Google and Apple sign in will be available soon.",
  );

  const handleLogIn = async () => {
    try {
      const result = await login({ email, password });
      const account = result?.account;
      const expectedSubType = type === "without-clinic" ? "without_clinic" : "with_clinic";
      if (
        account?.role !== "health_worker" ||
        (account?.healthWorkerType && account.healthWorkerType !== expectedSubType)
      ) {
        await logout();
        Toast.show({
          type: "error",
          text1: "Wrong login screen",
          text2: getRoleMismatchMessage("health_worker", account, expectedSubType),
          position: "top",
        });
        setTimeout(() => {
          router.replace(
            getRoleLoginRoute(account?.role, account?.motherType || account?.healthWorkerType),
          );
        }, 600);
        return;
      }
      router.replace("/(auth)/auth/currentuser");
    } catch (error) {
      const problem = error?.response?.data;
      Toast.show({
        type: "error",
        text1: problem?.title || "Login failed",
        text2: problem?.detail || "Please check your email and password.",
        position: "top",
      });
    }
  };

  const handleSocialPress = () => {
    Toast.show({
      type: "info",
      text1: comingSoonTitle,
      text2: comingSoonMessage,
      position: "top",
    });
  };

  if (isCheckingAuthScreenAccess) {
    return null;
  }

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

            {/* Logo */}
            <View className="items-start">
              <Image
                source={require("../../../../assets/images/AyomamaLogo.png")}
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

            <TouchableOpacity
              className="mb-6 self-end"
              onPress={() =>
                router.push({
                  pathname: "/(auth)/auth/forgot-password",
                  params: { role: "healthworker", type, email },
                })
              }
            >
              <Text className="text-sm font-semibold text-[#006D5B]">
                {forgotPasswordText}
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-[#006D5B] py-4 rounded-2xl"
              onPress={handleLogIn}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center gap-2">
                  <ActivityIndicator color="#FFFFFF" />
                  <Text className="text-white text-center font-bold text-base">
                    {loggingInText}
                  </Text>
                </View>
              ) : (
                <Text className="text-white text-center font-bold text-base">
                  {loginButtonText}
                </Text>
              )}
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
              onPress={handleSocialPress}
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
              onPress={handleSocialPress}
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
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/auth/healthworker/signup",
                      params: { type },
                    })
                  }
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

export default HealthcareLogIn;
