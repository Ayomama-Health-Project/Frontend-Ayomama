import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../../utils/translator";
import { ProfileMenuRow } from "./shared";

export default function SharedProfileScreen({
  name,
  email,
  avatar,
  roleLabel,
  subtitle,
  notificationEnabled,
  onToggleNotifications,
  onEdit,
  onLanguage,
  onSecurity,
  onMedicalHistory,
  onHelp,
  onBug,
  onLogout,
  isLoggingOut = false,
  showMedicalHistory = true,
}) {
  const editText = useTranslation("Edit");
  const settingsText = useTranslation("Setting & preference");
  const supportText = useTranslation("Support");
  const notificationText = useTranslation("Notification");
  const languageText = useTranslation("Language");
  const securityText = useTranslation("Security");
  const medicalHistoryText = useTranslation("Medical History");
  const helpCenterText = useTranslation("Help center");
  const reportBugText = useTranslation("Report bug");
  const logoutText = useTranslation("Log out");
  const profilePendingText = useTranslation("Profile details are still being prepared.");
  const profilePendingHintText = useTranslation("Once your account finishes loading, your personal details and settings will appear here.");
  const displayName = name || useTranslation("AYOMAMA User");
  const displayEmail = email || useTranslation("No email available yet");
  const hasProfileIdentity = Boolean(name || email || subtitle);
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "A";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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
                <Text className="text-[18px] font-bold text-[#293231]">{displayName}</Text>
                <Text className="mt-2 text-[15px] text-[#7B8786]">{displayEmail}</Text>
                {subtitle ? (
                  <Text className="mt-1 text-[13px] text-[#7B8786]">{subtitle}</Text>
                ) : null}
              </View>
            </View>
            <TouchableOpacity
              onPress={onEdit}
              activeOpacity={0.84}
              className="rounded-[14px] bg-[#0B7A66] px-7 py-3"
            >
              <Text className="text-[16px] font-semibold text-white">{editText}</Text>
            </TouchableOpacity>
          </View>

          <View className="my-8 h-px bg-[#D8DDDC]" />

          {!hasProfileIdentity ? (
            <View className="mb-6 rounded-[22px] border border-[#D8ECE7] bg-[#F6FBF9] px-5 py-5">
              <Text className="text-[16px] font-semibold text-[#293231]">{profilePendingText}</Text>
              <Text className="mt-2 text-[14px] leading-6 text-[#66706E]">{profilePendingHintText}</Text>
            </View>
          ) : null}

          <Text className="mb-2 text-[13px] font-semibold uppercase tracking-[1px] text-[#7A7A7A]">
            {roleLabel}
          </Text>
          <Text className="mb-5 text-[16px] font-medium text-[#7A7A7A]">{settingsText}</Text>

          <ProfileMenuRow
            icon="notifications"
            label={notificationText}
            onPress={onToggleNotifications}
            rightContent={
              <Switch
                value={notificationEnabled}
                onValueChange={onToggleNotifications}
                trackColor={{ false: "#E5E7EB", true: "#006D5B" }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E7EB"
              />
            }
          />
          <ProfileMenuRow icon="language" label={languageText} onPress={onLanguage} />
          <ProfileMenuRow icon="shield-checkmark" label={securityText} onPress={onSecurity} />
          {showMedicalHistory ? (
            <ProfileMenuRow icon="medkit" label={medicalHistoryText} onPress={onMedicalHistory} />
          ) : null}

          <View className="my-3 h-px bg-[#D8DDDC]" />

          <Text className="mb-5 mt-4 text-[16px] font-medium text-[#7A7A7A]">{supportText}</Text>
          <ProfileMenuRow icon="help-circle" label={helpCenterText} onPress={onHelp} />
          <ProfileMenuRow icon="flag" label={reportBugText} onPress={onBug} />
          <ProfileMenuRow
            icon="log-out-outline"
            label={isLoggingOut ? `${logoutText}...` : logoutText}
            onPress={onLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
