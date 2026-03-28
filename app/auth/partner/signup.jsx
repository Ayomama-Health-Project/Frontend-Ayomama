import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../../utils/translator";
import api from "../../../api";

const PartnerSignUp = () => {
  const router = useRouter();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteToken, setInviteToken] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Translate all text
  const titleText = useTranslation("Partner Sign Up");
  const subtitleText = useTranslation(
    "Join your partner on their pregnancy journey",
  );
  const emailPlaceholder = useTranslation("Email");
  const passwordPlaceholder = useTranslation("Password");
  const confirmPasswordPlaceholder = useTranslation("Confirm Password");
  const inviteTokenPlaceholder = useTranslation("Invite Link / Code");
  const signUpButtonText = useTranslation("Sign Up");
  const haveAccountText = useTranslation("Already have an account?");
  const loginText = useTranslation("Log In");
  const allFieldsRequiredText = useTranslation("All fields are required");
  const validEmailText = useTranslation("Please enter a valid email");
  const passwordLengthText = useTranslation(
    "Password must be at least 6 characters",
  );
  const passwordsMatchText = useTranslation("Passwords do not match");
  const inviteRequiredText = useTranslation(
    "Invite token is required. Ask your partner for the invite link.",
  );
  const accountCreatedText = useTranslation("Account Created!");
  const partnerLinkedText = useTranslation(
    "You are now linked to your partner",
  );
  const signUpFailedText = useTranslation("Sign Up Failed");
  const failedToCreateText = useTranslation("Failed to create account");
  const orText = useTranslation("or");
  const signUpGoogleText = useTranslation("Sign up with Google");
  const signUpAppleText = useTranslation("Sign up with Apple");
  const inviteHintText = useTranslation(
    "Enter the invite code shared by your partner",
  );

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError(allFieldsRequiredText);
      return;
    }
    if (!inviteToken.trim()) {
      setError(inviteRequiredText);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(validEmailText);
      return;
    }
    if (password.length < 6) {
      setError(passwordLengthText);
      return;
    }
    if (password !== confirmPassword) {
      setError(passwordsMatchText);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Extract token from full URL if pasted
      let token = inviteToken.trim();
      const tokenMatch = token.match(/[?&]token=([^&]+)/);
      if (tokenMatch) {
        token = tokenMatch[1];
      }

      const response = await api.post("/api/partner/signup", {
        email: email.toLowerCase().trim(),
        password,
        token,
      });

      setIsLoading(false);

      if (response.data?.token) {
        Toast.show({
          type: "success",
          text1: accountCreatedText,
          text2: partnerLinkedText,
          position: "top",
          visibilityTime: 2000,
        });

        setTimeout(() => {
          router.push("/auth/partner/login");
        }, 2000);
      }
    } catch (err) {
      setIsLoading(false);
      const errorMsg =
        err.response?.data?.error || err.message || failedToCreateText;
      setError(errorMsg);
      Toast.show({
        type: "error",
        text1: signUpFailedText,
        text2: errorMsg,
        position: "top",
        visibilityTime: 3000,
      });
    }
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
            <Text className="text-gray-500 text-[15px] mb-6">
              {subtitleText}
            </Text>

            {/* Email Input */}
            <TextInput
              placeholder={emailPlaceholder}
              value={email}
              onChangeText={setEmail}
              className="w-full border border-gray-300 rounded-2xl px-5 py-4 mb-5"
              keyboardType="email-address"
              placeholderTextColor="#9CA3AF"
              editable={!isLoading}
            />

            {/* Invite Token Input */}
            <View className="mb-5">
              <TextInput
                placeholder={inviteTokenPlaceholder}
                value={inviteToken}
                onChangeText={setInviteToken}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
                autoCapitalize="none"
              />
              <Text className="text-gray-400 text-xs px-2 pt-1.5">
                {inviteHintText}
              </Text>
            </View>

            {/* Password Input */}
            <View className="relative mb-5">
              <TextInput
                placeholder={passwordPlaceholder}
                value={password}
                onChangeText={setPassword}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14"
                secureTextEntry={!showPassword}
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-4"
                disabled={isLoading}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View className="relative mb-3">
              <TextInput
                placeholder={confirmPasswordPlaceholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14"
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-4"
                disabled={isLoading}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Error Message */}
            {error ? (
              <Text className="text-red-500 text-sm mb-2">{error}</Text>
            ) : null}

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-[#006D5B] py-4 rounded-2xl"
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-center font-bold text-base">
                  {signUpButtonText}
                </Text>
              )}
            </TouchableOpacity>

            {/* Or Divider */}
            <View className="flex-row items-center py-5">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="px-4 text-gray-400 text-sm">{orText}</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* Google Sign Up */}
            <TouchableOpacity
              className="border border-gray-300 py-4 rounded-2xl flex-row items-center justify-center mb-5"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-google" size={20} color="#4285F4" />
              <Text className="text-gray-700 font-medium ml-3">
                {signUpGoogleText}
              </Text>
            </TouchableOpacity>

            {/* Apple Sign Up */}
            <TouchableOpacity
              className="bg-[#293231] py-4 rounded-2xl flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="logo-apple" size={22} color="white" />
              <Text className="text-white font-medium ml-3">
                {signUpAppleText}
              </Text>
            </TouchableOpacity>

            {/* Spacer */}
            <View className="flex-1" />

            {/* Footer */}
            <View className="py-8 items-center">
              <View className="flex-row items-center">
                <Text className="text-gray-600 font-medium">
                  {haveAccountText}{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/auth/partner/login")}
                  disabled={isLoading}
                >
                  <Text className="text-[#006D5B] font-bold">{loginText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <Toast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PartnerSignUp;
