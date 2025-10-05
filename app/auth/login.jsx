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
import useAuthStore from "../../store/useAuthStore";

const LogIn = () => {
  const router = useRouter();
  const { login, isLoading, hasCompletedProfile } = useAuthStore();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = async () => {
    // Validation
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    // Call login API
    const result = await login(email, password);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Login Successful!",
        text2: result.message || "Welcome back",
        position: "top",
        visibilityTime: 2000,
      });

      // Check if user has completed profile setup
      setTimeout(() => {
        if (hasCompletedProfile()) {
          // User has completed onboarding, go straight to main app
          router.replace("/(tabs)");
        } else {
          // User needs to complete onboarding
          router.replace("/info/InfoCarousel");
        }
      }, 2000);
    } else {
      setError(result.error || "Failed to login");
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: result.error || "Invalid credentials",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#FCFCFC] px-6">
        <View className="flex-1">
          {/* Logo */}
          <View className="mt-5 items-start">
            <Image
              source={require("../../assets/images/AyomamaLogo.png")}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-left mt-6 mb-4">
            Log In to Your Account
          </Text>

          {/* Subtitle */}
          <Text className="text-gray-600 mb-10">
            Log in to continue your experience{" "}
          </Text>

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            keyboardType="email-address"
            editable={!isLoading}
          />
          {/* Password Input */}
          <View className="relative mb-4">
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] pr-12"
              secureTextEntry={!showPassword}
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

          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 mt-2 text-sm">{error}</Text>
          ) : null}

          {/* LogIn Button */}
          <TouchableOpacity
            className="bg-[#006D5B] py-5 rounded-2xl mt-6"
            onPress={handleLogIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center font-bold text-base">
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer pinned */}
        <View className="flex-row justify-center items-center mb-16">
          <Text className="text-gray-600">Don&apos;t have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/signup")}
            disabled={isLoading}
          >
            <Text className="text-[#006D5B] font-semibold">Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Toast component */}
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
