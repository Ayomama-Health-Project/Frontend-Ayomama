import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthFrame from "../../../components/auth/AuthFrame";
import useAppAuth from "../../../hooks/useAppAuth";
import useRedirectAuthenticatedUser from "../../../hooks/useRedirectAuthenticatedUser";
import { useTranslation } from "../../../utils/translator";

const getRoleLabel = (role) => {
  switch (role) {
    case "partner":
      return "partner";
    case "healthworker":
      return "health worker";
    default:
      return "mother";
  }
};

const getLoginPath = (role) => {
  switch (role) {
    case "partner":
      return "/(auth)/auth/partner/login";
    case "healthworker":
      return "/(auth)/auth/healthworker/login";
    default:
      return "/(auth)/auth/mother/login";
  }
};

export default function ForgotPassword() {
  const router = useRouter();
  const { role, type, email: initialEmail } = useLocalSearchParams();
  const { forgotPassword, isLoading } = useAppAuth();
  const { isCheckingAuthScreenAccess } = useRedirectAuthenticatedUser();
  const [email, setEmail] = useState(typeof initialEmail === "string" ? initialEmail : "");

  const roleLabel = useMemo(() => getRoleLabel(role), [role]);
  const titleText = useTranslation("Forgot Password?");
  const subtitleText = useTranslation(
    `Enter the email connected to your ${roleLabel} account and we will send you a secure verification code.`
  );
  const emailLabel = useTranslation("Email address");
  const emailPlaceholder = useTranslation("Enter your email");
  const sendCodeText = useTranslation("Send verification code");
  const sendingCodeText = useTranslation("Sending code...");
  const helperText = useTranslation("Remember your password?");
  const logInText = useTranslation("Log in");
  const sentTitle = useTranslation("Code sent");
  const sentBody = useTranslation("Your password reset code is ready.");
  const flowHint = useTranslation(
    "We use a one-time password flow here, so the next screen will let you enter the code and choose a new password."
  );

  const handleSendCode = async () => {
    try {
      await forgotPassword({ email });
      Toast.show({
        type: "success",
        text1: sentTitle,
        text2: sentBody,
        position: "top",
        visibilityTime: 1800,
      });

      setTimeout(() => {
        router.push({
          pathname: "/(auth)/auth/reset-password",
          params: {
            role,
            type,
            email,
          },
        });
      }, 350);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Unable to send code",
        text2: error?.response?.data?.detail || "Please try again.",
        position: "top",
      });
    }
  };

  if (isCheckingAuthScreenAccess) {
    return null;
  }

  return (
    <AuthFrame title={titleText} subtitle={subtitleText}>
      <View className="mb-8 rounded-[28px] border border-[#E7EFED] bg-white px-5 py-5">
        <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F6F2]">
          <Ionicons name="mail-open-outline" size={26} color="#006D5B" />
        </View>

        <Text className="mb-2 text-sm font-semibold text-[#42514F]">
          {emailLabel}
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={emailPlaceholder}
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          className="mb-4 rounded-2xl border border-[#D8E4E1] px-5 py-4 text-[#293231]"
        />

        <View className="rounded-2xl bg-[#F5FAF8] px-4 py-4">
          <Text className="text-sm leading-6 text-[#5D6C69]">{flowHint}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="rounded-2xl bg-[#006D5B] py-4"
        onPress={handleSendCode}
        disabled={isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text className="ml-2 text-center text-base font-bold text-white">
              {sendingCodeText}
            </Text>
          </View>
        ) : (
          <Text className="text-center text-base font-bold text-white">
            {sendCodeText}
          </Text>
        )}
      </TouchableOpacity>

      <View className="items-center py-8">
        <View className="flex-row items-center">
          <Text className="font-medium text-gray-600">{helperText} </Text>
          <TouchableOpacity
            onPress={() =>
              router.replace({
                pathname: getLoginPath(role),
                params: { type },
              })
            }
          >
            <Text className="font-bold text-[#006D5B]">{logInText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthFrame>
  );
}
