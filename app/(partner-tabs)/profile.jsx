import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Alert, Linking } from "react-native";
import Toast from "react-native-toast-message";
import SharedProfileScreen from "../../components/shared/profile/SharedProfileScreen";
import useAppAuth from "../../hooks/useAppAuth";
import { requestPushNotificationToken } from "../../utils/pushNotifications";
import { useTranslation } from "../../utils/translator";

export default function PartnerProfile() {
  const router = useRouter();
  const { account, logout, saveNotificationToken, deleteNotificationToken, refreshUser } =
    useAppAuth();
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profileText = useTranslation("Profile");
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

  useFocusEffect(
    useCallback(() => {
      refreshUser().catch(() => null);
    }, [refreshUser]),
  );

  const avatarSource = useMemo(
    () =>
      account?.profilePicture
        ? { uri: account.profilePicture }
        : null,
    [account?.profilePicture],
  );

  const handleToggleNotifications = async (value) => {
    const nextValue = typeof value === "boolean" ? value : !notificationsOn;
    setNotificationsOn(nextValue);

    if (nextValue) {
      const expoPushToken = await requestPushNotificationToken();
      if (expoPushToken) {
        await saveNotificationToken({
          platform: "android",
          expoPushToken,
          deviceId: "partner-profile",
          enabled: true,
        });
      }
      return;
    }

    const tokenIds = account?.notifications?.tokens?.map((token) => token.id) || [];
    await Promise.all(tokenIds.map((id) => deleteNotificationToken(id)));
  };

  const handleLogout = () => {
    Alert.alert(logoutTitleText, logoutMessageText, [
      { text: cancelText, style: "cancel" },
      {
        text: logoutText,
        style: "destructive",
        onPress: async () => {
          setIsLoggingOut(true);
          await logout();
          Toast.show({ type: "success", text1: loggedOutText });
          router.replace("/Onboarding");
        },
      },
    ]);
  };

  return (
    <SharedProfileScreen
      name={account?.profile?.fullName || partnerText}
      email={account?.email || "partner@ayomama.app"}
      avatar={avatarSource}
      roleLabel={profileText}
      subtitle={supportingText}
      notificationEnabled={notificationsOn}
      onToggleNotifications={handleToggleNotifications}
      onEdit={() => router.push("/profile/EditProfile")}
      onLanguage={() => router.push("/language-picker")}
      onSecurity={() => router.push("/profile/Security")}
      onHelp={() =>
        router.push("/chat/SmartChat")
      }
      onBug={() =>
        Linking.openURL("mailto:support@ayomama.app?subject=AYOMAMA%20Bug%20Report").catch(() =>
          Toast.show({
            type: "error",
            text1: reportBugText,
            text2: "We could not open your mail app right now.",
            position: "top",
          }),
        )
      }
      onLogout={handleLogout}
      isLoggingOut={isLoggingOut}
      showMedicalHistory={false}
    />
  );
}
