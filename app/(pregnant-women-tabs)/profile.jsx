import { Alert, Image, Linking, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import useAppAuth from "../../hooks/useAppAuth";
import { ProfileMenuRow } from "../../components/shared/profile/shared";
import { getAccountAppRoute } from "../../utils/authRoutes";
import { requestPushNotificationToken } from "../../utils/pushNotifications";

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { account, logout, switchMotherType, saveNotificationToken, deleteNotificationToken, refreshUser } = useAppAuth();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const name = useMemo(() => account?.profile?.fullName || "AYOMAMA User", [account?.profile?.fullName]);
  const email = account?.email || "No email available";
  const avatar = account?.profilePicture ? { uri: account.profilePicture } : null;
  const initials = useMemo(() => {
    const parts = String(account?.profile?.fullName || "AYOMAMA User")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase()).join("") || "A";
  }, [account?.profile?.fullName]);

  useEffect(() => {
    setNotificationEnabled(Boolean(account?.notifications?.enabled));
  }, [account?.notifications?.enabled]);

  useFocusEffect(
    useCallback(() => {
      refreshUser().catch(() => null);
    }, [refreshUser]),
  );

  const performLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await logout();
      Toast.show({
        type: "success",
        text1: "Logged out",
        text2: "You have been logged out successfully.",
        position: "top",
      });
      router.replace("/Onboarding");
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Logout failed",
        text2: "We could not log you out just now. Please try again.",
        position: "top",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLogout = () => {
    if (isLoggingOut) return;

    Alert.alert(
      "Log out",
      "Are you sure you want to log out of your AYOMAMA account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: performLogout,
        },
      ],
    );
  };

  const handleSwitchToPostpartum = async () => {
    try {
      await switchMotherType("postpartum");
      Toast.show({
        type: "success",
        text1: "Switched to postpartum",
        text2: "Let’s complete your postpartum profile next.",
        position: "top",
      });
      router.replace(getAccountAppRoute({ ...account, motherType: "postpartum", onboardingCompleted: false }));
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Switch failed",
        text2: "We could not switch you to postpartum right now.",
        position: "top",
      });
    }
  };

  const handleNotificationToggle = async (value) => {
    const nextValue = typeof value === "boolean" ? value : !notificationEnabled;
    setNotificationEnabled(nextValue);

    try {
      if (nextValue) {
        const expoPushToken = await requestPushNotificationToken();
        if (expoPushToken) {
          await saveNotificationToken({
            platform: "ios",
            expoPushToken,
            deviceId: "mother-profile",
            enabled: true,
          });
        }
      } else {
        const tokenIds = account?.notifications?.tokens?.map((token) => token.id) || [];
        await Promise.all(tokenIds.map((id) => deleteNotificationToken(id)));
      }

      Toast.show({
        type: "success",
        text1: nextValue ? "Notifications enabled" : "Notifications disabled",
        text2: nextValue
          ? "Daily reminders and updates will appear here."
          : "You will stop receiving new push reminders on this device.",
        position: "top",
      });
    } catch (_error) {
      setNotificationEnabled(!nextValue);
      Toast.show({
        type: "error",
        text1: "Notification update failed",
        text2: "We could not update your notification preference right now.",
        position: "top",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <LinearGradient
        colors={["#DDF4EE", "rgba(221,244,238,0.78)", "rgba(255,255,255,0)"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: 220 }}
      />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-14">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              {avatar ? (
                <Image source={avatar} className="h-20 w-16 rounded-[18px]" resizeMode="cover" />
              ) : (
                <View className="h-20 w-16 items-center justify-center rounded-[18px] bg-[#DDF4EE]">
                  <Text className="text-[22px] font-bold text-[#0B7A66]">{initials}</Text>
                </View>
              )}
              <View className="ml-6 flex-1">
                <Text className="text-[18px] font-bold text-[#293231]">{name}</Text>
                <Text className="mt-2 text-[15px] text-[#7B8786]">{email}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/profile/EditProfile")}
              activeOpacity={0.84}
              className="rounded-[14px] bg-[#0B7A66] px-7 py-3"
            >
              <Text className="text-[16px] font-semibold text-white">Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="my-8 h-px bg-[#D8DDDC]" />

          <Text className="mb-5 text-[16px] font-medium text-[#7A7A7A]">Setting & preference</Text>
          <ProfileMenuRow
            icon="notifications"
            label="Notification"
            onPress={() => handleNotificationToggle(!notificationEnabled)}
            rightContent={
              <Switch
                value={notificationEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: "#E5E7EB", true: "#006D5B" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E7EB"
              />
            }
          />
          <ProfileMenuRow icon="language" label="Language" onPress={() => router.push("/language-picker")} />
          <ProfileMenuRow icon="shield-checkmark" label="Security" onPress={() => router.push("/profile/Security")} />
          <ProfileMenuRow icon="medkit" label="Medical History" onPress={() => router.push("/profile/MedicalHistory")} />
          {account?.motherType !== "postpartum" ? (
            <ProfileMenuRow
              icon="swap-horizontal"
              label="Switch to Postpartum"
              onPress={handleSwitchToPostpartum}
            />
          ) : null}

          <View className="my-3 h-px bg-[#D8DDDC]" />

          <Text className="mb-5 mt-4 text-[16px] font-medium text-[#7A7A7A]">Support</Text>
          <ProfileMenuRow
            icon="help-circle"
            label="Help center"
            onPress={() => router.push("/chat/SmartChat")}
          />
          <ProfileMenuRow
            icon="flag"
            label="Report bug"
            onPress={() =>
              Linking.openURL("mailto:support@ayomama.app?subject=AYOMAMA%20Bug%20Report").catch(() =>
                Toast.show({
                  type: "error",
                  text1: "Report bug",
                  text2: "We could not open your mail app right now.",
                  position: "top",
                }),
              )
            }
          />
          <ProfileMenuRow
            icon="log-out-outline"
            label={isLoggingOut ? "Logging out..." : "Log out"}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
