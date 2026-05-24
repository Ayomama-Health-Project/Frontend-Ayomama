import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Linking, RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PREPARATION_ITEMS,
} from "../../components/shared/visit/data";
import CalendarStrip from "../../components/shared/visit/CalendarStrip";
import NextAppointmentCard from "../../components/shared/visit/NextAppointmentCard";
import PreparationChecklistCard from "../../components/shared/visit/PreparationChecklistCard";
import UpcomingAppointmentsList from "../../components/shared/visit/UpcomingAppointmentsList";
import { VisitEmptyState, VisitHeader, VisitSkeleton } from "../../components/shared/visit/shared";
import useAppAuth from "../../hooks/useAppAuth";
import { motherApi } from "../../services/motherApi";

export default function Visit() {
  const { account } = useAppAuth();
  const headerGradientColors = ["#DFF4EE", "#FBE4DA"];
  const [checklist, setChecklist] = useState(
    PREPARATION_ITEMS.map((item) => ({ ...item, checked: false })),
  );
  const [appointments, setAppointments] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  const loadVisits = async () => {
    const data = await motherApi.fetchVisits();
    setAppointments(data);
    const todayVisit = data.find((item) => new Date(item.scheduledFor).toDateString() === new Date().toDateString());
    const chosenVisit = todayVisit || data[0] || null;
    setSelectedDate(chosenVisit ? new Date(chosenVisit.scheduledFor) : new Date());
    setNextAppointment(chosenVisit);
  };

  useEffect(() => {
    loadVisits().then(() => {
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      showToast("error", "Visits unavailable", "We could not load your visits right now.");
    });
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadVisits();
    } catch (_error) {
      showToast("error", "Refresh failed", "We could not refresh your visits right now.");
    } finally {
      setRefreshing(false);
    }
  };

  const monthDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(year, month, index + 1);
      return {
        id: `${year}-${month + 1}-${index + 1}`,
        day: String(index + 1),
        month: date.toLocaleDateString([], { month: "short" }),
        active: date.toDateString() === selectedDate.toDateString(),
        value: date,
      };
    });
  }, [selectedDate]);

  const visibleAppointments = useMemo(
    () => appointments.filter((item) => new Date(item.scheduledFor).toDateString() === selectedDate.toDateString()),
    [appointments, selectedDate],
  );

  const openDirections = async (item) => {
    const target = item?.hospitalName || item?.hospital || item?.subtitle || "";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(target)}`;
    try {
      await Linking.openURL(url);
    } catch (_error) {
      showToast("error", "Directions unavailable", "We could not open maps right now.");
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#0C7A67" colors={["#0C7A67"]} />
          }
        >
          {isLoading ? (
            <View className="px-5 pt-6">
              <VisitSkeleton />
            </View>
          ) : (
            <>
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
                <CalendarStrip
                  days={monthDays}
                  onSelectDay={(day) => {
                    setSelectedDate(day.value);
                    const matchingVisit = appointments.find(
                      (item) => new Date(item.scheduledFor).toDateString() === day.value.toDateString(),
                    );
                    setNextAppointment(matchingVisit || null);
                  }}
                />
                <Text className="mb-3 mt-6 text-[18px] font-bold text-[#293231]">
                  {nextAppointment?.serviceType || "Appointment details"}
                </Text>
                <NextAppointmentCard
                  appointment={nextAppointment}
                  onSetReminder={() =>
                    router.push({
                      pathname: "/visit/visitInput",
                      params: nextAppointment
                        ? {
                            visitId: nextAppointment.id,
                            serviceType: nextAppointment.serviceType,
                            hospitalName: nextAppointment.hospitalName,
                            healthcareProvider: nextAppointment.healthcareProvider,
                            scheduledFor: nextAppointment.scheduledFor,
                            durationMinutes: String(nextAppointment.durationMinutes || 30),
                          }
                        : {},
                    })
                  }
                  onSeeDirections={() => openDirections(nextAppointment)}
                />
                <View className="mt-8">
                  <PreparationChecklistCard
                    items={checklist}
                    onToggle={handleChecklist}
                  />
                </View>
              </LinearGradient>

              <View className="bg-white px-5 pb-10 pt-6">
                {visibleAppointments.length ? (
                  <UpcomingAppointmentsList
                    appointments={visibleAppointments}
                    onReminder={(item) =>
                      router.push({
                        pathname: "/visit/visitInput",
                        params: item
                          ? {
                              visitId: item.id,
                              serviceType: item.serviceType || item.title,
                              hospitalName: item.hospitalName || item.hospital || item.subtitle,
                              healthcareProvider: item.healthcareProvider || "",
                              scheduledFor: item.scheduledFor,
                              durationMinutes: String(item.durationMinutes || 30),
                            }
                          : {},
                      })
                    }
                    onDirections={openDirections}
                  />
                ) : (
                  <VisitEmptyState />
                )}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
