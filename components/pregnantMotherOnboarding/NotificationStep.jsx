import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import useAppAuth from "../../hooks/useAppAuth";
import { getAccountAppRoute } from "../../utils/authRoutes";
import { useTranslation } from "../../utils/translator";

function PreviewCard({ text, topClassName }) {
  const translatedText = useTranslation(text);
  return (
    <View
      className={`rounded-[15px] bg-[#FCFCFC] px-4 py-4 shadow-lg ${topClassName}`}
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
  primaryLabel = "Turn on notication",
  secondaryLabel = "Skip",
  primaryLoading = false,
  secondaryLoading = false,
}) {
  const { account } = useAppAuth();
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
    <View className="flex-1 relative">
      <View className="absolute inset-0 items-center justify-start">
        <Image
          source={require("../../assets/images/device.png")}
          className="h-full w-full rounded-xl"
          resizeMode="cover"
        />
      </View>

      <View className="absolute top-64 left-4 right-4">
        <PreviewCard
          text="Don’t forget to use your drug it is essential for your well being"
          topClassName="mb-3"
        />
        <PreviewCard
          text="Studies shows that hydration solves more than 50 % to boost immunity"
          topClassName=""
        />
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-[#FCFCFC] px-6 pb-6 pt-8 shadow-2xl">
        <Text className="text-center text-3xl font-semibold text-gray-800">
          {translatedTitle}
        </Text>
        <Text className="mb-6 mt-2 text-center text-gray-500">
          {translatedDescription}
        </Text>

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleTurnOnNotification}
          disabled={primaryLoading || secondaryLoading}
          className="rounded-2xl bg-[#006D5B] py-4"
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
          className="mt-4 rounded-2xl py-4"
        >
          <Text className="text-center text-base font-bold text-gray-600">
            {secondaryLoading ? pleaseWaitText : translatedSecondaryLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
