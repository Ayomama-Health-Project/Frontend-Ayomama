import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import useAppAuth from "../../hooks/useAppAuth";
import { getAccountAppRoute } from "../../utils/authRoutes";
import { useTranslation } from "../../utils/translator";

function PreviewCard({ text, topClassName, compact }) {
  const translatedText = useTranslation(text);
  return (
    <View
      className={`rounded-[10px] bg-[#FCFCFC] px-4 shadow-lg ${compact ? "py-3" : "py-4"} ${topClassName}`}
    >
      <Text className="text-sm leading-5 text-gray-800">{translatedText}</Text>
    </View>
  );
}

export default function NotificationStep({
  onEnableNotifications,
  onSkipNotifications,
  title = "Never miss out on your daily routine",
  description = "When turn on, we will remind you of all your activities through out day",
  primaryLabel = "Turn on notification",
  secondaryLabel = "Skip",
  primaryLoading = false,
  secondaryLoading = false,
}) {
  const { account } = useAppAuth();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const compact = height < 720;
  const stepHeight = Math.max(compact ? 560 : 620, height - insets.top - 72);
  const previewTop = compact ? 122 : 188;
  const sheetPaddingBottom = Math.max(insets.bottom, 12) + (compact ? 12 : 18);
  const translatedTitle = useTranslation(title);
  const translatedDescription = useTranslation(description);
  const translatedPrimaryLabel = useTranslation(primaryLabel);
  const translatedSecondaryLabel = useTranslation(secondaryLabel);
  const pleaseWaitText = useTranslation("Please wait...");

  const notificationsEnabledText = useTranslation("Notifications Enabled!");
  const dailyRemindersText = useTranslation(
    "You'll receive daily reminders for your routine",
  );

  const handleTurnOnNotification = async () => {
    try {
      await AsyncStorage.setItem("notificationsEnabled", "true");
      Toast.show({
        type: "success",
        text1: notificationsEnabledText,
        text2: dailyRemindersText,
        position: "top",
        visibilityTime: 2000,
      });

      if (onEnableNotifications) {
        await onEnableNotifications();
        return;
      }

      router.replace(getAccountAppRoute(account));
    } catch (_error) {
      if (onEnableNotifications) {
        await onEnableNotifications();
        return;
      }
      router.replace(getAccountAppRoute(account));
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem("notificationsEnabled", "false");
    } catch (_error) {
      // best effort
    }

    if (onSkipNotifications) {
      await onSkipNotifications();
      return;
    }

    router.replace(getAccountAppRoute(account));
  };

  return (
    <View className="relative overflow-hidden bg-[#EDF3F1]" style={{ minHeight: stepHeight }}>
      <View className="absolute inset-0 items-center justify-start">
        <Image
          source={require("../../assets/images/device.png")}
          className="h-full w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="absolute left-4 right-4" style={{ top: previewTop }}>
        <PreviewCard
          text="Don’t forget to use your drug it is essential for your well being"
          topClassName="mb-3"
          compact={compact}
        />
        <PreviewCard
          text="Studies shows that hydration solves more than 50 % to boost immunity"
          topClassName=""
          compact={compact}
        />
      </View>

      <View
        className={`absolute bottom-0 left-0 right-0 bg-[#FCFCFC] px-6 shadow-2xl ${compact ? "pt-5" : "pt-7"}`}
        style={{ paddingBottom: sheetPaddingBottom }}
      >
        <Text
          className="text-center font-semibold text-gray-800"
          style={{
            fontSize: compact ? 24 : 30,
            lineHeight: compact ? 30 : 36,
          }}
        >
          {translatedTitle}
        </Text>
        <Text className={`mt-2 text-center text-gray-500 ${compact ? "mb-4" : "mb-6"}`}>
          {translatedDescription}
        </Text>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleTurnOnNotification}
          disabled={primaryLoading || secondaryLoading}
          className={`rounded-[10px] bg-[#006D5B] ${compact ? "py-3" : "py-4"}`}
        >
          {primaryLoading ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text className="ml-2 text-base font-bold text-white">
                {pleaseWaitText}
              </Text>
            </View>
          ) : (
            <Text className="text-center text-base font-bold text-white">
              {translatedPrimaryLabel}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.86}
          onPress={handleSkip}
          disabled={primaryLoading || secondaryLoading}
          className={`rounded-[10px] ${compact ? "mt-2 py-3" : "mt-3 py-4"}`}
        >
          <Text className="text-center text-base font-bold text-gray-600">
            {secondaryLoading ? pleaseWaitText : translatedSecondaryLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
