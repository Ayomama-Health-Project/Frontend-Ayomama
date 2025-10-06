import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useTranslation } from "../../../utils/translator";

const HealthcareSignUp = () => {
  const router = useRouter();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Translate all text
  const titleText = useTranslation("Create Healthcare Account");
  const subtitleText = useTranslation(
    "Join as a healthcare worker to manage patients"
  );
  const fullNamePlaceholder = useTranslation("Full Name");
  const emailPlaceholder = useTranslation("Email");
  const hospitalPlaceholder = useTranslation("Hospital/Clinic Name");
  const passwordPlaceholder = useTranslation("Password");
  const confirmPasswordPlaceholder = useTranslation("Confirm Password");
  const signUpButtonText = useTranslation("Sign Up");
  const haveAccountText = useTranslation("Already have an account?");
  const loginText = useTranslation("Log In");
  const allFieldsRequiredText = useTranslation("All fields are required");
  const validEmailText = useTranslation("Please enter a valid email");
  const passwordLengthText = useTranslation(
    "Password must be at least 6 characters"
  );
  const passwordsMatchText = useTranslation("Passwords do not match");
  const accountCreatedText = useTranslation("Account Created!");
  const pleaseLoginText = useTranslation("Please login to continue");
  const signUpFailedText = useTranslation("Sign Up Failed");
  const failedToCreateText = useTranslation("Failed to create account");

  const handleSignUp = async () => {
    // Validation
    if (!name || !email || !hospitalName || !password || !confirmPassword) {
      setError(allFieldsRequiredText);
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

    // Clear error
    setError("");
    setIsLoading(true);

    try {
      // TODO: Implement healthcare worker signup API call
      // For now, just show success message
      Toast.show({
        type: "success",
        text1: accountCreatedText,
        text2: pleaseLoginText,
        position: "top",
        visibilityTime: 2000,
      });

      // Navigate to healthcare login after 2 seconds
      setTimeout(() => {
        router.push("/auth/healthcare/login");
      }, 2000);
    } catch (err) {
      setError(failedToCreateText);
      Toast.show({
        type: "error",
        text1: signUpFailedText,
        text2: failedToCreateText,
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#FCFCFC] px-6">
        {/* Scrollable / grow area */}
        <View className="flex-1">
          {/* Logo */}
          <View className="mt-5 items-start">
            <Image
              source={require("../../../assets/images/AyomamaLogo.png")}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-left mt-6 mb-4">
            {titleText}
          </Text>

          <Text className="text-gray-600 mb-4">{subtitleText}</Text>

          {/* Name Input */}
          <TextInput
            placeholder={fullNamePlaceholder}
            value={name}
            onChangeText={setName}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />

          {/* Email Input */}
          <TextInput
            placeholder={emailPlaceholder}
            value={email}
            onChangeText={setEmail}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />

          {/* Hospital Name Input */}
          <TextInput
            placeholder={hospitalPlaceholder}
            value={hospitalName}
            onChangeText={setHospitalName}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />

          {/* Password Input */}
          <View className="relative mb-4">
            <TextInput
              placeholder={passwordPlaceholder}
              value={password}
              onChangeText={setPassword}
              className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] pr-12"
              secureTextEntry={!showPassword}
              placeholderTextColor="#9CA3AF"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[14px]"
              disabled={isLoading}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View className="relative">
            <TextInput
              placeholder={confirmPasswordPlaceholder}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] pr-12"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#9CA3AF"
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-[14px]"
              disabled={isLoading}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 mt-2 text-sm">{error}</Text>
          ) : null}

          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-[#006D5B] py-5 rounded-2xl mt-6"
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
        </View>

        {/* Footer pinned to bottom */}
        <View className="flex-row justify-center items-center mb-16">
          <Text className="text-gray-600">{haveAccountText} </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/healthcare/login")}
            disabled={isLoading}
          >
            <Text className="text-[#006D5B] font-semibold">{loginText}</Text>
          </TouchableOpacity>
        </View>

        {/* Toast component */}
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HealthcareSignUp;
