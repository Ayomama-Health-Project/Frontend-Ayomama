import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppAuth from "../../hooks/useAppAuth";
import { requestPushNotificationToken } from "../../utils/pushNotifications";
import { useTranslation } from "../../utils/translator";

const SettingsRow = ({
  icon,
  label,
  onPress,
  rightElement,
  color = "#293231",
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-4 border-b border-gray-50"
    activeOpacity={0.6}
  >
    <View
      className="w-9 h-9 rounded-xl items-center justify-center mr-3"
      style={{ backgroundColor: color + "15" }}
    >
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <Text className="flex-1 text-sm font-medium text-[#293231]">{label}</Text>
    {rightElement || (
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    )}
  </TouchableOpacity>
);

export default function PartnerProfile() {
  const router = useRouter();
  const { account, logout, saveNotificationToken, deleteNotificationToken } =
    useAppAuth();
  const [notificationsOn, setNotificationsOn] = useState(true);

  const profileText = useTranslation("Profile");
  const notificationText = useTranslation("Notifications");
  const languageText = useTranslation("Language");
  const securityText = useTranslation("Security");
  const helpCenterText = useTranslation("Help Center");
  const reportBugText = useTranslation("Report Bug");
  const logoutText = useTranslation("Log Out");
  const logoutTitleText = useTranslation("Log Out");
  const logoutMessageText = useTranslation("Are you sure you want to log out?");
  const cancelText = useTranslation("Cancel");
  const loggedOutText = useTranslation("Logged Out");
  const partnerText = useTranslation("Partner");
  const supportingText = useTranslation("Supporting your partner's journey");

  useEffect(() => {
    setNotificationsOn(Boolean(account?.notifications?.enabled));
  }, [account]);

  const handleLogout = () => {
    Alert.alert(logoutTitleText, logoutMessageText, [
      { text: cancelText, style: "cancel" },
      {
        text: logoutText,
        style: "destructive",
        onPress: async () => {
          await logout();
          Toast.show({ type: "success", text1: loggedOutText });
          router.replace("/account/selection");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-3">
          <Text className="text-xl font-bold text-[#293231] mb-5">
            {profileText}
          </Text>

          <View
            className="bg-white rounded-2xl px-5 py-5 mb-4 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            }}
          >
            <View className="w-14 h-14 rounded-2xl bg-[#293231] items-center justify-center mr-4">
              <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#293231]">
                {partnerText}
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                {supportingText}
              </Text>
            </View>
          </View>

          <View
            className="bg-white rounded-2xl px-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            }}
          >
            <SettingsRow
              icon="notifications-outline"
              label={notificationText}
              rightElement={
                <Switch
                  value={notificationsOn}
                  onValueChange={async (value) => {
                    setNotificationsOn(value);
                    if (value) {
                      const expoPushToken =
                        await requestPushNotificationToken();
                      if (expoPushToken) {
                        await saveNotificationToken({
                          platform: "android",
                          expoPushToken,
                          deviceId: "partner-profile",
                          enabled: true,
                        });
                      }
                    } else {
                      const tokenIds =
                        account?.notifications?.tokens?.map(
                          (token) => token.id,
                        ) || [];
                      await Promise.all(
                        tokenIds.map((id) => deleteNotificationToken(id)),
                      );
                    }
                  }}
                  trackColor={{ false: "#E5E7EB", true: "#293231" }}
                  thumbColor="#fff"
                />
              }
            />
            <SettingsRow
              icon="language-outline"
              label={languageText}
              onPress={() => router.push("/language-picker")}
            />
            <SettingsRow
              icon="shield-checkmark-outline"
              label={securityText}
              onPress={() => router.push("/profile/Security")}
            />
          </View>

          <View
            className="bg-white rounded-2xl px-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            }}
          >
            <SettingsRow
              icon="help-circle-outline"
              label={helpCenterText}
              onPress={() => {}}
            />
            <SettingsRow
              icon="bug-outline"
              label={reportBugText}
              onPress={() => {}}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-white rounded-2xl px-5 py-4 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            }}
          >
            <View className="w-9 h-9 rounded-xl items-center justify-center mr-3 bg-red-50">
              <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            </View>
            <Text className="text-sm font-medium text-red-500">
              {logoutText}
            </Text>
          </TouchableOpacity>

          <View className="h-6" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
