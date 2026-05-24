import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { authApi } from "../../../services/authApi";
import { useTranslation } from "../../../utils/translator";

const NOTIFICATION_MAP = {
  partner: [
    {
      id: "1",
      icon: "heart",
      title: "Partner Reminder",
      message: "Check in with her today and encourage plenty of rest.",
    },
    {
      id: "2",
      icon: "calendar",
      title: "Clinic Visit",
      message: "Her next antenatal appointment is coming up soon.",
    },
    {
      id: "3",
      icon: "water",
      title: "Hydration",
      message: "A gentle reminder to help her stay hydrated today.",
    },
    {
      id: "4",
      icon: "medical",
      title: "Medication",
      message: "Support her routine by reminding her about vitamins and supplements.",
    },
  ],
  default: [
    {
      id: "1",
      icon: "medical",
      title: "Medication Reminder",
      message: "Time for your iron supplement, your glow up fuel.",
    },
    {
      id: "2",
      icon: "water",
      title: "Hydration Tip",
      message: "8 glasses today, mama. Hydration keeps you and baby happy.",
    },
    {
      id: "3",
      icon: "walk",
      title: "Movement",
      message: "A short walk today can help with energy and circulation.",
    },
    {
      id: "4",
      icon: "calendar",
      title: "Clinic Visit",
      message: "Clinic visit tomorrow. Stay ready and steady.",
    },
  ],
};

const ICONS = {
  heart: "heart",
  calendar: "calendar",
  water: "water",
  medical: "medical",
  walk: "walk",
};

export default function SharedNotificationsScreen({
  role = "default",
  title = "Notification",
}) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const translatedTitle = useTranslation(title);
  const emptyTitle = useTranslation("No notifications yet");
  const emptyDescription = useTranslation("Helpful reminders, visit updates, and support prompts will appear here.");

  useEffect(() => {
    let mounted = true;

    authApi.fetchNotifications()
      .then((data) => {
        if (!mounted) return;
        setItems(data.items || []);
      })
      .catch(() => {
        if (!mounted) return;
        setItems([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const notifications = useMemo(() => {
    if (items.length) {
      return items;
    }

    return NOTIFICATION_MAP[role] || NOTIFICATION_MAP.default;
  }, [items, role]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#DDF4EE", "rgba(251,234,227,0.82)", "rgba(255,255,255,0)"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: 210 }}
      />

      <View className="px-6 pb-5 pt-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.82}
            className="h-11 w-11 items-center justify-center rounded-full bg-white/90"
          >
            <Ionicons name="arrow-back" size={22} color="#293231" />
          </TouchableOpacity>
          <Text className="text-[22px] font-bold text-[#293231]">{translatedTitle}</Text>
          <View className="h-11 w-11 items-center justify-center rounded-full bg-white/90">
            <Ionicons name="notifications" size={20} color="#293231" />
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 28, paddingHorizontal: 20 }}
      >
        {notifications.length ? (
          notifications.map((item) => (
            <View
              key={item.id}
              className="mb-4 rounded-[22px] border border-[#E2F3EE] bg-white px-4 py-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.06,
                shadowRadius: 14,
              }}
            >
              <View className="flex-row items-start">
                <View className="mr-4 h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F7F4]">
                  <Ionicons name={ICONS[item.icon] || "notifications"} size={20} color="#006D5B" />
                </View>
                <View className="flex-1">
                  <Text className="text-[15px] font-semibold text-[#293231]">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-[14px] leading-6 text-[#5C6664]">
                    {item.message}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="mt-10 rounded-[24px] border border-[#E2F3EE] bg-white px-5 py-6">
            <Text className="text-[17px] font-semibold text-[#293231]">{emptyTitle}</Text>
            <Text className="mt-2 text-[14px] leading-6 text-[#5C6664]">{emptyDescription}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
