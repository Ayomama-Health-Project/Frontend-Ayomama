import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  const router = useRouter();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    //if valid clear error
    setError("");

    router.push("/auth/login");
  };

  return (
    <View className="flex-1 bg-[#FCFCFC] px-6">
      {/* Scrollable / grow area */}
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
        <Text className="text-3xl font-bold text-left mt-6 mb-4">
          Create an Account
        </Text>

        <Text className="text-gray-600 mb-4">
          Create an Account, it takes less than a minutes{" "}
        </Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
          keyboardType="email-address"
          placeholderTextColor="#9CA3AF"
        />
        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
          secureTextEntry
          placeholderTextColor="#9CA3AF"
        />
        {/* Confirm Password Input */}
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="w-full border border-gray-300 rounded-2xl px-4 py-[14px]"
          secureTextEntry
          placeholderTextColor="#9CA3AF"
        />

        {/* Error Message */}
        {error ? (
          <Text className="text-red-500 mt-2 text-sm">{error}</Text>
        ) : null}

        {/* Sign Up Button */}
        <TouchableOpacity
          className="bg-[#006D5B] py-5 rounded-2xl mt-6"
          onPress={handleSignUp}
        >
          <Text className="text-white text-center font-bold text-base">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer pinned to bottom */}
      <View className="flex-row justify-center items-center mb-16">
        <Text className="text-gray-600">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text className="text-[#006D5B] font-semibold">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
