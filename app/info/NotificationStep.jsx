import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function NotificationStep() {
  const handleTurnOnNotification = async () => {
    try {
      // Save notification preference to AsyncStorage
      await AsyncStorage.setItem("notificationsEnabled", "true");

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Notifications Enabled!",
        text2: "You'll receive daily reminders for your routine",
        position: "top",
        visibilityTime: 2000,
      });

      // Navigate to tabs after 2 seconds
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 2000);
    } catch (error) {
      console.error("Error saving notification preference:", error);
      // Still navigate even if saving fails
      router.replace("/(tabs)");
    }
  };

  const handleSkip = () => {
    // Just navigate without saving notification preference
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 relative">
      {/* Full-height image container */}
      <View className="absolute inset-0 items-center justify-start">
        <Image
          source={require("../../assets/images/device.png")}
          className="w-full h-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      {/* Floating info cards */}
      <View className="absolute top-64 left-4 right-4">
        {/* First card - Drug reminder */}
        <View className="bg-[#FCFCFC] p-4 mb-3 rounded-[15px] shadow-lg">
          <Text className="text-sm text-gray-800 leading-5">
            Don't forget to use your drug it is essential for your well being
          </Text>
        </View>

        {/* Second card - Hydration tip */}
        <View className="bg-[#FCFCFC] p-4 rounded-[15px] shadow-lg">
          <Text className="text-sm text-gray-800 leading-5">
            Studies shows that hydration solves more than 50% to boost immunity
          </Text>
        </View>
      </View>

      {/* Bottom white sheet with content - no blur, no top radius */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#FCFCFC] px-6 pt-8 pb-6 shadow-2xl">
        <Text className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Never miss out on your daily routine
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          When turn on, we will remind you of all your activities through out
          day
        </Text>

        {/* Turn on Notification Button */}
        <TouchableOpacity
          className="bg-[#006D5B] py-4 rounded-2xl"
          onPress={handleTurnOnNotification}
        >
          <Text className="text-white text-center font-bold text-base">
            Turn on notication
          </Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          className="py-4 rounded-2xl mt-4"
          onPress={handleSkip}
        >
          <Text className="text-center font-bold text-base text-gray-600">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toast component */}
      <Toast />
    </View>
  );
}
