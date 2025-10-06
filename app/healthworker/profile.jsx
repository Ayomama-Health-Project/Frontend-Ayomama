import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/useAuthStore";

const isIOS = Platform.OS === "ios";

export default function HealthWorkerProfile() {
  const router = useRouter();
  const { user: authUser, logout } = useAuthStore();
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use authenticated user data or fallback to default
  const user = authUser || {
    name: "Healthcare Worker",
    email: "worker@example.com",
  };

  // Get avatar image source - use profilepic.png as default
  const getAvatarSource = () => {
    if (
      user.avatar &&
      typeof user.avatar === "string" &&
      user.avatar.trim() !== ""
    ) {
      // If avatar is a URL string
      return { uri: user.avatar };
    } else if (user.avatar && typeof user.avatar === "object") {
      // If avatar is already a require() object
      return user.avatar;
    } else {
      // Default avatar
      return require("../../assets/images/profilepic.png");
    }
  };

  // Fetch notification setting on mount
  useEffect(() => {
    loadNotificationSetting();
  }, []);

  const loadNotificationSetting = async () => {
    try {
      const savedSetting = await AsyncStorage.getItem("notificationsEnabled");
      if (savedSetting !== null) {
        setNotificationEnabled(savedSetting === "true");
      }
    } catch (error) {
      console.error("Error loading notification setting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationToggle = async (value) => {
    try {
      setNotificationEnabled(value);
      await AsyncStorage.setItem("notificationsEnabled", value.toString());

      Toast.show({
        type: "success",
        text1: value ? "Notifications Enabled" : "Notifications Disabled",
        text2: value
          ? "You'll receive notifications for your patients"
          : "You won't receive notifications",
        position: "top",
        visibilityTime: 2000,
      });
    } catch (error) {
      console.error("Error saving notification setting:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save notification setting",
        position: "top",
        visibilityTime: 2000,
      });
      // Revert the state if saving failed
      setNotificationEnabled(!value);
    }
  };

  const handleEditProfile = () => {
    router.push("/profile/EditProfile");
  };

  const handleLanguage = () => {
    router.push("/profile/ChangeLanguage");
  };

  const handleSecurity = () => {
    router.push("/profile/Security");
  };

  const handleHelpCenter = () => {
    // TODO: Navigate to help center
    Toast.show({
      type: "info",
      text1: "Help Center",
      text2: "This feature is coming soon",
      position: "top",
    });
  };

  const handleReportBug = () => {
    // TODO: Navigate to bug report
    Toast.show({
      type: "info",
      text1: "Report Bug",
      text2: "This feature is coming soon",
      position: "top",
    });
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              Toast.show({
                type: "success",
                text1: "Logged Out",
                text2: "You have been logged out successfully",
                position: "top",
                visibilityTime: 2000,
              });

              // Navigate to onboarding after logout
              setTimeout(() => {
                router.replace("/Onboarding");
              }, 2000);
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: result.error || "Failed to logout",
                position: "top",
                visibilityTime: 2000,
              });
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-[#FCFCFC]">
      <StatusBar barStyle="dark-content" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header and Profile with Gradient */}
        <LinearGradient
          colors={["#BCF2E9", "#FCFCFC"]}
          style={{
            paddingTop: isIOS ? 50 : StatusBar.currentHeight || 24,
          }}
        >
          {/* Fixed Header */}
          <View
            style={{
              paddingBottom: 16,
              paddingHorizontal: 24,
            }}
          >
            <View className="flex-row items-center justify-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="absolute left-0"
              >
                <Ionicons name="arrow-back" size={24} color="#293231" />
              </TouchableOpacity>
              <Text className="text-[#293231] text-xl font-bold">Profile</Text>
            </View>
          </View>

          {/* Profile Header */}
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: 32,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Image
                  source={getAvatarSource()}
                  className="w-16 h-20 rounded-2xl"
                  resizeMode="cover"
                />
                <View className="ml-4 flex-1">
                  <Text
                    className="text-xl font-bold text-[#293231]"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {user.name || "Healthcare Worker"}
                  </Text>
                  <Text
                    className="text-[15px] text-[#6B7280] mt-1"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {user.email || ""}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleEditProfile}
                className="bg-[#006D5B] px-6 py-3 rounded-xl"
              >
                <Text className="text-white font-semibold text-[15px]">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Divider */}
        <View className="h-[1px] bg-[#E5E5E5] mx-6" />

        {/* Setting & preference Section */}
        <View className="px-6 pt-6">
          <Text className="text-[16px] text-[#6B7280] mb-4 font-medium">
            Setting & preference
          </Text>

          {/* Notification Toggle */}
          <View className="bg-[#D7EEEA]/30 rounded-2xl mb-3 px-5 py-4 h-[60px] justify-center">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="notifications" size={20} color="#293231" />
                <Text className="text-[16px] font-medium text-[#293231] ml-4">
                  Notification
                </Text>
              </View>
              <Switch
                value={notificationEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: "#D1D5DB", true: "#006D5B" }}
                thumbColor={notificationEnabled ? "#FFFFFF" : "#F3F4F6"}
                ios_backgroundColor="#D1D5DB"
                disabled={isLoading}
              />
            </View>
          </View>

          {/* Language */}
          <TouchableOpacity
            onPress={handleLanguage}
            className="bg-[#D7EEEA]/30 rounded-2xl mb-3 px-5 py-4 h-[60px] justify-center"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="language" size={20} color="#293231" />
                <Text className="text-[16px] font-medium text-[#293231] ml-4">
                  Language
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#293231" />
            </View>
          </TouchableOpacity>

          {/* Security */}
          <TouchableOpacity
            onPress={handleSecurity}
            className="bg-[#D7EEEA]/30 rounded-2xl mb-3 px-5 py-4 h-[60px] justify-center"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="shield-checkmark" size={20} color="#293231" />
                <Text className="text-[16px] font-medium text-[#293231] ml-4">
                  Security
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#293231" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-[#E5E5E5] mx-6 my-6" />

        {/* Support Section */}
        <View className="px-6 pb-6">
          <Text className="text-[16px] text-[#6B7280] mb-4 font-medium">
            Support
          </Text>

          {/* Help center */}
          <TouchableOpacity
            onPress={handleHelpCenter}
            className="bg-[#D7EEEA]/30 rounded-2xl mb-3 px-5 py-4 h-[60px] justify-center"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="help-circle" size={20} color="#293231" />
                <Text className="text-[16px] font-medium text-[#293231] ml-4">
                  Help center
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#293231" />
            </View>
          </TouchableOpacity>

          {/* Report bug */}
          <TouchableOpacity
            onPress={handleReportBug}
            className="bg-[#D7EEEA]/30 rounded-2xl mb-3 px-5 py-4 h-[60px] justify-center"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="flag" size={20} color="#293231" />
                <Text className="text-[16px] font-medium text-[#293231] ml-4">
                  Report bug
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#293231" />
            </View>
          </TouchableOpacity>

          {/* Log out */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-[#D7EEEA]/30 rounded-2xl mb-3 px-5 py-4 h-[60px] justify-center"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="log-out-outline" size={20} color="#293231" />
                <Text className="text-[16px] font-medium text-[#293231] ml-4">
                  Log out
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#293231" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Toast component */}
      <Toast />
    </View>
  );
}
