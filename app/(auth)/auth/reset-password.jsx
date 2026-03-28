import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import AuthFrame from "../../../components/auth/AuthFrame";
import OtpInputRow from "../../../components/auth/OtpInputRow";
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

export default function ResetPassword() {
  const router = useRouter();
  const { role, type, email } = useLocalSearchParams();
  const { resetPassword, forgotPassword, isLoading } = useAppAuth();
  const { isCheckingAuthScreenAccess } = useRedirectAuthenticatedUser();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roleLabel = useMemo(() => getRoleLabel(role), [role]);
  const titleText = useTranslation("Reset Password");
  const subtitleText = useTranslation(
    `Enter the verification code sent to your ${roleLabel} account and create a new password.`
  );
  const codeLabel = useTranslation("Verification code");
  const codeHint = useTranslation(
    `A 4-digit code was sent to ${typeof email === "string" && email ? email : "your email address"}.`
  );
  const resendText = useTranslation("Resend code");
  const resendingText = useTranslation("Resending...");
  const passwordLabel = useTranslation("New password");
  const confirmPasswordLabel = useTranslation("Confirm new password");
  const passwordPlaceholder = useTranslation("Enter a new password");
  const confirmPasswordPlaceholder = useTranslation("Confirm your new password");
  const saveText = useTranslation("Update password");
  const updatingPasswordText = useTranslation("Updating password...");
  const successTitle = useTranslation("Password updated");
  const successBody = useTranslation("You can now log in with your new password.");
  const resentTitle = useTranslation("Code resent");
  const resentBody = useTranslation("A fresh OTP has been sent.");

  const handleResend = async () => {
    try {
      await forgotPassword({ email });
      Toast.show({
        type: "success",
        text1: resentTitle,
        text2: resentBody,
        position: "top",
        visibilityTime: 1800,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Unable to resend code",
        text2: error?.response?.data?.detail || "Please try again.",
        position: "top",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await resetPassword({
        email,
        otp,
        newPassword: password,
      });
      Toast.show({
        type: "success",
        text1: successTitle,
        text2: successBody,
        position: "top",
        visibilityTime: 1800,
      });

      setTimeout(() => {
        router.replace({
          pathname: getLoginPath(role),
          params: { type },
        });
      }, 350);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Unable to reset password",
        text2: error?.response?.data?.detail || "Please check the OTP and try again.",
        position: "top",
      });
    }
  };

  if (isCheckingAuthScreenAccess) {
    return null;
  }

  return (
    <AuthFrame title={titleText} subtitle={subtitleText}>
      <View className="mb-6 rounded-[28px] border border-[#E7EFED] bg-white px-5 py-5">
        <View className="mb-5 h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F6F2]">
          <Ionicons name="shield-checkmark-outline" size={26} color="#006D5B" />
        </View>

        <Text className="mb-2 text-sm font-semibold text-[#42514F]">
          {codeLabel}
        </Text>
        <Text className="mb-5 text-sm leading-6 text-[#5D6C69]">{codeHint}</Text>

        <OtpInputRow value={otp} onChange={setOtp} />

        <TouchableOpacity onPress={handleResend} activeOpacity={0.75} disabled={isLoading}>
          <Text className="text-right text-sm font-semibold text-[#006D5B]">
            {isLoading ? resendingText : resendText}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mb-5">
        <Text className="mb-2 text-sm font-semibold text-[#42514F]">
          {passwordLabel}
        </Text>
        <View className="relative">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={passwordPlaceholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            className="rounded-2xl border border-[#D8E4E1] px-5 py-4 pr-14 text-[#293231]"
          />
          <TouchableOpacity
            onPress={() => setShowPassword((current) => !current)}
            className="absolute right-5 top-4"
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mb-8">
        <Text className="mb-2 text-sm font-semibold text-[#42514F]">
          {confirmPasswordLabel}
        </Text>
        <View className="relative">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={confirmPasswordPlaceholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showConfirmPassword}
            className="rounded-2xl border border-[#D8E4E1] px-5 py-4 pr-14 text-[#293231]"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword((current) => !current)}
            className="absolute right-5 top-4"
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="rounded-2xl bg-[#006D5B] py-4"
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.85}
      >
        {isLoading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator size="small" color="#FFFFFF" />
            <Text className="ml-2 text-center text-base font-bold text-white">
              {updatingPasswordText}
            </Text>
          </View>
        ) : (
          <Text className="text-center text-base font-bold text-white">
            {saveText}
          </Text>
        )}
      </TouchableOpacity>
    </AuthFrame>
  );
}
