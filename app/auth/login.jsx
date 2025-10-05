import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const LogIn = () => {
  const router = useRouter();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = () => {
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

    // Navigate to Carousel page
    router.push("/info/InfoCarousel");
  };

  return (
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
        />
        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          className="w-full border border-gray-300 rounded-2xl px-4 py-[14px] mb-4"
          secureTextEntry
        />

        {/* Error Message */}
        {error ? (
          <Text className="text-red-500 mt-2 text-sm">{error}</Text>
        ) : null}

        {/* LogIn Button */}
        <TouchableOpacity
          className="bg-[#006D5B] py-5 rounded-2xl mt-6"
          onPress={handleLogIn}
        >
          <Text className="text-white text-center font-bold text-base">
            Log In
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer pinned */}
      <View className="flex-row justify-center items-center mb-16">
        <Text className="text-gray-600">Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/auth/signup")}>
          <Text className="text-[#006D5B] font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogIn;
