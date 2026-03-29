import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import SharedProfileScreen from "../../components/shared/profile/SharedProfileScreen";
import useAppAuth from "../../hooks/useAppAuth";
import { requestPushNotificationToken } from "../../utils/pushNotifications";
import { useTranslation } from "../../utils/translator";

export default function PartnerProfile() {
  const router = useRouter();
  const { account, logout, saveNotificationToken, deleteNotificationToken } =
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
      avatar={
        account?.profilePicture
          ? { uri: account.profilePicture }
          : require("../../assets/images/profilepic.png")
      }
      roleLabel={profileText}
      subtitle={supportingText}
      notificationEnabled={notificationsOn}
      onToggleNotifications={handleToggleNotifications}
      onEdit={() => router.push("/profile/EditProfile")}
      onLanguage={() => router.push("/language-picker")}
      onSecurity={() => router.push("/profile/Security")}
      onHelp={() =>
        Toast.show({
          type: "info",
          text1: helpCenterText,
          text2: "Help center is coming soon.",
          position: "top",
        })
      }
      onBug={() =>
        Toast.show({
          type: "info",
          text1: reportBugText,
          text2: "Bug reporting is coming soon.",
          position: "top",
        })
      }
      onLogout={handleLogout}
      isLoggingOut={isLoggingOut}
      showMedicalHistory={false}
    />
  );
}
