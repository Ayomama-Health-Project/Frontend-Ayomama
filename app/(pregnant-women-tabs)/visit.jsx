import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PREPARATION_ITEMS,
  UPCOMING_APPOINTMENTS,
  VISIT_DAYS,
} from "../../components/shared/visit/data";
import CalendarStrip from "../../components/shared/visit/CalendarStrip";
import NextAppointmentCard from "../../components/shared/visit/NextAppointmentCard";
import PreparationChecklistCard from "../../components/shared/visit/PreparationChecklistCard";
import UpcomingAppointmentsList from "../../components/shared/visit/UpcomingAppointmentsList";
import { VisitHeader } from "../../components/shared/visit/shared";
import useAppAuth from "../../hooks/useAppAuth";

export default function Visit() {
  const { account } = useAppAuth();
  const headerGradientColors = ["#DFF4EE", "#FBE4DA"];
  const [checklist, setChecklist] = useState(
    PREPARATION_ITEMS.map((item) => ({ ...item, checked: false })),
  );

  const displayName = useMemo(
    () => account?.profile?.fullName?.split(" ")[0] || "Mama Grace",
    [account?.profile?.fullName],
  );

  const showToast = (type, text1, text2) => {
    Toast.show({ type, text1, text2, position: "top" });
  };

  const handleChecklist = (id) => {
    const item = checklist.find((entry) => entry.id === id);
    setChecklist((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, checked: !entry.checked } : entry,
      ),
    );
    if (item && !item.checked) {
      showToast(
        "success",
        "Checklist updated",
        `${item.label} marked as ready.`,
      );
    }
  };

  return (
    <LinearGradient colors={headerGradientColors} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-transparent" edges={["top"]}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <ScrollView
          className="flex-1 bg-transparent"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={headerGradientColors}
            style={{
              borderBottomEndRadius: 36,
              borderBottomStartRadius: 36,
              padding: 20,
            }}
          >
            <VisitHeader
              name={displayName}
              onBack={() => router.push("/(pregnant-women-tabs)")}
              onOpenNotifications={() => router.push("/notifications")}
            />
            <Text className="mb-4 text-[18px] font-bold text-[#293231]">
              Next Appointment
            </Text>
            <CalendarStrip days={VISIT_DAYS} />
            <Text className="mb-3 mt-6 text-[18px] font-bold text-[#293231]">
              Antenatal Checkup
            </Text>
            <NextAppointmentCard
              onSetReminder={() => router.push("/visit/visitInput")}
              onSeeDirections={() =>
                showToast(
                  "info",
                  "Directions",
                  "Maps routing is UI-only for now.",
                )
              }
            />
            <View className="mt-8">
              <PreparationChecklistCard
                items={checklist}
                onToggle={handleChecklist}
              />
            </View>
          </LinearGradient>

          <View className="bg-white px-5 pb-10 pt-6">
            <UpcomingAppointmentsList
              appointments={UPCOMING_APPOINTMENTS}
              onReminder={() => router.push("/visit/visitInput")}
              onDirections={() =>
                showToast(
                  "info",
                  "Directions",
                  "Maps routing is UI-only for now.",
                )
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
