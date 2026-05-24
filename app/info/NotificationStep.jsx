import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import useMockAuth from "../../hooks/useMockAuth";
import { getAccountAppRoute } from "../../utils/authRoutes";
import { useTranslation } from "../../utils/translator";

export default function NotificationStep() {
  const { account } = useMockAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 720;
  const stepHeight = Math.max(compact ? 560 : 620, height - insets.top - 72);
  const previewTop = compact ? 122 : 188;
  const sheetPaddingBottom = Math.max(insets.bottom, 12) + (compact ? 12 : 18);
  // Translate all text
  const drugReminderText = useTranslation(
    "Don't forget to use your drug it is essential for your well being",
  );
  const hydrationTipText = useTranslation(
    "Studies shows that hydration solves more than 50% to boost immunity",
  );
  const neverMissRoutineText = useTranslation(
    "Never miss out on your daily routine",
  );
  const turnOnDescriptionText = useTranslation(
    "When turn on, we will remind you of all your activities through out day",
  );
  const turnOnNotificationText = useTranslation("Turn on notification");
  const skipText = useTranslation("Skip");
  const pleaseWaitText = useTranslation("Please wait...");
  const notificationsEnabledText = useTranslation("Notifications Enabled!");
  const dailyRemindersText = useTranslation(
    "You'll receive daily reminders for your routine",
  );

  const handleTurnOnNotification = async () => {
    try {
      setIsSubmitting(true);
      await AsyncStorage.setItem("notificationsEnabled", "true");
      Toast.show({
        type: "success",
        text1: notificationsEnabledText,
        text2: dailyRemindersText,
        position: "top",
        visibilityTime: 2000,
      });

      router.replace(getAccountAppRoute(account));
    } catch (error) {
      console.error("Error saving notification preference:", error);
      router.replace(getAccountAppRoute(account));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    try {
      setIsSubmitting(true);
      await AsyncStorage.setItem("notificationsEnabled", "false");
    } catch (_error) {
      // best effort
    } finally {
      setIsSubmitting(false);
    }
    router.replace(getAccountAppRoute(account));
  };

  return (
    <View className="relative overflow-hidden bg-[#EDF3F1]" style={{ minHeight: stepHeight }}>
      {/* Full-height image container */}
      <View className="absolute inset-0 items-center justify-start">
        <Image
          source={require("../../assets/images/device.png")}
          className="h-full w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      {/* Floating info cards */}
      <View className="absolute left-4 right-4" style={{ top: previewTop }}>
        {/* First card - Drug reminder */}
        <View className={`mb-3 rounded-[10px] bg-[#FCFCFC] px-4 shadow-lg ${compact ? "py-3" : "py-4"}`}>
          <Text className="text-sm leading-5 text-gray-800">
            {drugReminderText}
          </Text>
        </View>

        {/* Second card - Hydration tip */}
        <View className={`rounded-[10px] bg-[#FCFCFC] px-4 shadow-lg ${compact ? "py-3" : "py-4"}`}>
          <Text className="text-sm leading-5 text-gray-800">
            {hydrationTipText}
          </Text>
        </View>
      </View>

      {/* Bottom white sheet with content - no blur, no top radius */}
      <View
        className={`absolute bottom-0 left-0 right-0 bg-[#FCFCFC] px-6 shadow-2xl ${compact ? "pt-5" : "pt-7"}`}
        style={{ paddingBottom: sheetPaddingBottom }}
      >
        <Text
          className="mb-2 text-center font-semibold text-gray-800"
          style={{
            fontSize: compact ? 24 : 30,
            lineHeight: compact ? 30 : 36,
          }}
        >
          {neverMissRoutineText}
        </Text>
        <Text className={`text-center text-gray-500 ${compact ? "mb-4" : "mb-6"}`}>
          {turnOnDescriptionText}
        </Text>

        {/* Turn on Notification Button */}
        <TouchableOpacity
          className={`rounded-[10px] bg-[#006D5B] ${compact ? "py-3" : "py-4"}`}
          onPress={handleTurnOnNotification}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text className="ml-2 text-center text-base font-bold text-white">
                {pleaseWaitText}
              </Text>
            </View>
          ) : (
            <Text className="text-center text-base font-bold text-white">
              {turnOnNotificationText}
            </Text>
          )}
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          className={`rounded-[10px] ${compact ? "mt-2 py-3" : "mt-3 py-4"}`}
          onPress={handleSkip}
          disabled={isSubmitting}
        >
          <Text className="text-center text-base font-bold text-gray-600">
            {isSubmitting ? pleaseWaitText : skipText}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Toast component */}
    </View>
  );
}
