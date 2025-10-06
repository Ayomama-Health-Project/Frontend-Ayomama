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

  const handleSignUp = async () => {
    // Validation
    if (!name || !email || !hospitalName || !password || !confirmPassword) {
      setError("All fields are required");
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
    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
        text1: "Account Created!",
        text2: "Please login to continue",
        position: "top",
        visibilityTime: 2000,
      });

      // Navigate to healthcare login after 2 seconds
      setTimeout(() => {
        router.push("/auth/healthcare/login");
      }, 2000);
    } catch (err) {
      setError("Failed to create account");
      Toast.show({
        type: "error",
        text1: "Sign Up Failed",
        text2: "Failed to create account",
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
            Create Healthcare Account
          </Text>

          <Text className="text-gray-600 mb-4">
            Join as a healthcare worker to manage patients
          </Text>

          {/* Name Input */}
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />

          {/* Email Input */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />

          {/* Hospital Name Input */}
          <TextInput
            placeholder="Hospital/Clinic Name"
            value={hospitalName}
            onChangeText={setHospitalName}
            className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
            placeholderTextColor="#9CA3AF"
            editable={!isLoading}
          />

          {/* Password Input */}
          <View className="relative mb-4">
            <TextInput
              placeholder="Password"
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
              placeholder="Confirm Password"
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
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer pinned to bottom */}
        <View className="flex-row justify-center items-center mb-16">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/healthcare/login")}
            disabled={isLoading}
          >
            <Text className="text-[#006D5B] font-semibold">Log In</Text>
          </TouchableOpacity>
        </View>

        {/* Toast component */}
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HealthcareSignUp;
