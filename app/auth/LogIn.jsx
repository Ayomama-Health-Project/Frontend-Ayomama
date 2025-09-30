import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, } from "react-native";

const LogIn = () => {
  const router = useRouter();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    // Navigate to login after signup
    router.push("/");
  };

  return (
    <View className="flex-1 bg-white px-6">
      {/* Logo */}
      <View className="mt-5 items-start">
        <Image
          source={require("../../assets/images/Ayomama Logo.png")}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-left mt-6 mb-4">
        Create an Account
      </Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        secureTextEntry
      />

      {/* Error Message */}
      {error ? (
        <Text className="text-red-500 mt-2 text-sm">{error}</Text>
      ) : null}

      {/* LogIn Button */}
      <TouchableOpacity
        className="bg-black py-3 rounded-full mt-6"
        onPress={handleLogIn}
      >
        <Text className="text-white text-center font-bold text-base">
          Log In
        </Text>
      </TouchableOpacity>

      {/* Already have an account */}
      <View className="flex-row justify-center mt-4">

        <Text className="text-gray-600">Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/auth/SignUp")}>
          <Text className="text-blue-600 font-semibold">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogIn;