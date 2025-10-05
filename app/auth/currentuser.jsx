import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/useAuthStore";

const CurrentUser = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, refreshUser, logout } =
    useAuthStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const result = await refreshUser();
    setIsRefreshing(false);
    if (result) {
      Toast.show({
        type: "success",
        text1: "Refreshed!",
        text2: "User data updated successfully",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };

  const handleGoToHome = () => {
    Toast.show({
      type: "success",
      text1: "Welcome!",
      text2: "Redirecting to home...",
      position: "top",
      visibilityTime: 1500,
    });
    setTimeout(() => {
      router.replace("/(tabs)");
    }, 1500);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout? You can login with another account.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            Toast.show({
              type: "info",
              text1: "Logged Out",
              text2: "See you soon!",
              position: "top",
              visibilityTime: 2000,
            });
            setTimeout(() => {
              router.replace("/auth/login");
            }, 2000);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FCFCFC]">
        <ActivityIndicator size="large" color="#006D5B" />
        <Text className="mt-2 text-gray-600">Loading user...</Text>
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <View className="flex-1 items-center justify-center bg-[#FCFCFC] p-6">
        <Text className="text-red-500 text-lg mb-4">
          No user found. Please login.
        </Text>
        <TouchableOpacity
          className="bg-[#006D5B] px-6 py-3 rounded-2xl"
          onPress={() => router.push("/auth/login")}
        >
          <Text className="text-white font-semibold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <Text className="text-2xl font-bold text-left mt-6 mb-2">
          Welcome Back, {user.name}!
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-600 mb-10">
          Your account is ready to continue
        </Text>

        {/* User Info Card */}
        <View className="w-full border border-gray-300 rounded-2xl px-4 py-4 mb-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-500 w-20">Email:</Text>
            <Text className="text-gray-700 flex-1" numberOfLines={1}>
              {user.email}
            </Text>
          </View>
          {user.phone && (
            <View className="flex-row items-center mb-2">
              <Text className="text-gray-500 w-20">Phone:</Text>
              <Text className="text-gray-700 flex-1">{user.phone}</Text>
            </View>
          )}
          <View className="flex-row items-center">
            <Text className="text-gray-500 w-20">Language:</Text>
            <Text className="text-gray-700 flex-1">
              {user.preferredLanguages || "en"}
            </Text>
          </View>
        </View>

        {/* Refresh Button */}
        <TouchableOpacity
          className="w-full border border-[#006D5B] rounded-2xl px-4 py-[14px] mb-4"
          onPress={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ActivityIndicator color="#006D5B" />
          ) : (
            <Text className="text-[#006D5B] text-center font-semibold text-base">
              Refresh User Data
            </Text>
          )}
        </TouchableOpacity>

        {/* Go to Home Button */}
        <TouchableOpacity
          className="bg-[#006D5B] py-5 rounded-2xl mt-2"
          onPress={handleGoToHome}
        >
          <Text className="text-white text-center font-bold text-base">
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer pinned */}
      <View className="flex-row justify-center items-center mb-16">
        <Text className="text-gray-600">Want to switch account? </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-red-500 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Toast component */}
      <Toast />
    </View>
  );
};

export default CurrentUser;
