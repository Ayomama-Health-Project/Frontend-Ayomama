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
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppAuth from "../../../../hooks/useAppAuth";
import useRedirectAuthenticatedUser from "../../../../hooks/useRedirectAuthenticatedUser";
import { getAccountAppRoute } from "../../../../utils/authRoutes";
import { useTranslation } from "../../../../utils/translator";

const PartnerSignUp = () => {
  const router = useRouter();
  const { type, inviteToken: inviteTokenParam } = useLocalSearchParams();
  const { registerPartner, isLoading } = useAppAuth();
  const { isCheckingAuthScreenAccess } = useRedirectAuthenticatedUser(getAccountAppRoute);

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteToken, setInviteToken] = useState(
    typeof inviteTokenParam === "string" ? inviteTokenParam : "",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Translate all text
  const titleText = useTranslation("Partner Sign Up");
  const familyFriendSubtitleText = useTranslation(
    "Join as a trusted family member or friend supporting the mother",
  );
  const partnerSubtitleText = useTranslation(
    "Join your partner on their pregnancy journey",
  );
  const subtitleText =
    type === "family-friend" ? familyFriendSubtitleText : partnerSubtitleText;
  const emailPlaceholder = useTranslation("Email");
  const passwordPlaceholder = useTranslation("Password");
  const confirmPasswordPlaceholder = useTranslation("Confirm Password");
  const inviteTokenPlaceholder = useTranslation("Invite Link / Code");
  const signUpButtonText = useTranslation("Sign Up");
  const signingUpText = useTranslation("Creating account...");
  const haveAccountText = useTranslation("Already have an account?");
  const loginText = useTranslation("Log In");
  const accountCreatedText = useTranslation("Account Created!");
  const partnerLinkedText = useTranslation(
    "You are now linked to your partner",
  );
  const orText = useTranslation("or");
  const signUpGoogleText = useTranslation("Sign up with Google");
  const signUpAppleText = useTranslation("Sign up with Apple");
  const comingSoonTitle = useTranslation("Coming soon");
  const comingSoonMessage = useTranslation(
    "Google and Apple sign up will be available soon.",
  );
  const inviteHintText = useTranslation(
    "Enter the invite code shared by your partner",
  );

  const normalizeInviteToken = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "";

    const queryMatch = trimmedValue.match(/[?&]inviteToken=([^&]+)/i);
    if (queryMatch?.[1]) {
      return decodeURIComponent(queryMatch[1]).trim().toUpperCase();
    }

    return (
      trimmedValue.split("/").pop()?.trim().toUpperCase() ||
      trimmedValue.toUpperCase()
    );
  };

  const handleSignUp = async () => {
    try {
      const result = await registerPartner({
        email,
        password,
        inviteToken: normalizeInviteToken(inviteToken),
        relationshipLabel:
          type === "family-friend" ? "Family or Friend" : "Partner",
      });
      Toast.show({
        type: "success",
        text1: accountCreatedText,
        text2: partnerLinkedText,
        position: "top",
        visibilityTime: 2000,
      });
      router.replace(getAccountAppRoute(result?.account));
    } catch (errorResponse) {
      const problem = errorResponse?.response?.data;
      Toast.show({
        type: "error",
        text1: problem?.title || "Sign up failed",
        text2:
          problem?.detail || "We could not create or link this partner account.",
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
            />

            {/* Invite Token Input */}
            <View className="mb-5">
              <TextInput
                placeholder={inviteTokenPlaceholder}
                value={inviteToken}
                onChangeText={(value) => setInviteToken(normalizeInviteToken(value))}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
                placeholderTextColor="#9CA3AF"
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

            {/* Confirm Password Input */}
            <View className="relative mb-3">
              <TextInput
                placeholder={confirmPasswordPlaceholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 pr-14"
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-4"
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              className="bg-[#006D5B] py-4 rounded-2xl"
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text className="ml-2 text-white text-center font-bold text-base">
                    {signingUpText}
                  </Text>
                </View>
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
              onPress={handleSocialPress}
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
              onPress={handleSocialPress}
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
                  onPress={() =>
                    router.push({
                      pathname: "/(auth)/auth/partner/login",
                      params: { type },
                    })
                  }
                >
                  <Text className="text-[#006D5B] font-bold">{loginText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PartnerSignUp;
