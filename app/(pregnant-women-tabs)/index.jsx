import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticlesCarousel from "../../components/shared/dashboard/ArticlesCarousel";
import BabyDevelopmentCard from "../../components/shared/dashboard/BabyDevelopmentCard";
import BabyHighlightsCard from "../../components/shared/dashboard/BabyHighlightsCard";
import ChecklistCard from "../../components/shared/dashboard/ChecklistCard";
import CommunityCard from "../../components/shared/dashboard/CommunityCard";
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader";
import DueDateCard from "../../components/shared/dashboard/DueDateCard";
import EmergencyContactsCard from "../../components/shared/dashboard/EmergencyContactsCard";
import JournalCard from "../../components/shared/dashboard/JournalCard";
import NutritionCard from "../../components/shared/dashboard/NutritionCard";
import UpcomingVisitCard from "../../components/shared/dashboard/UpcomingVisitCard";
import VitalsCard from "../../components/shared/dashboard/VitalsCard";
import WellnessGrid from "../../components/shared/dashboard/WellnessGrid";
import {
  COMMUNITY_POSTS,
  DASHBOARD_ARTICLES,
  INITIAL_CHECKLIST,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_MEALS,
  INITIAL_VITALS,
  WELLNESS_ACTIVITIES,
} from "../../components/shared/dashboard/constants";
import useAppAuth from "../../hooks/useAppAuth";

export default function PregnantDashboardScreen() {
  const { account } = useAppAuth();
  const [checklist, setChecklist] = useState(
    INITIAL_CHECKLIST.map((item) => ({ ...item, checked: false })),
  );
  const [vitals] = useState(INITIAL_VITALS);
  const [journalEntries, setJournalEntries] = useState(INITIAL_JOURNAL_ENTRIES);
  const [meals, setMeals] = useState(INITIAL_MEALS);

  const displayName = useMemo(
    () => account?.profile?.fullName?.split(" ")[0] || "Mama Grace",
    [account?.profile?.fullName],
  );

  const toggleChecklist = (id) => {
    const nextItem = checklist.find((item) => item.id === id);
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );

    if (nextItem && !nextItem.checked) {
      Toast.show({
        type: "success",
        text1: "Checklist updated",
        text2: `${nextItem.label} marked as done.`,
        position: "top",
      });
    }
  };

  const showUiToast = (title, text) => {
    Toast.show({
      type: "info",
      text1: title,
      text2: text,
      position: "top",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5FAF8]" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5FAF8" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 32, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader
          name={displayName}
          onOpenProfile={() => router.push("/(pregnant-women-tabs)/profile")}
          onOpenNotifications={() => router.push("/notifications")}
        />

        <View className="gap-5">
          <BabyHighlightsCard />
          <DueDateCard
            onMarkDelivered={() => showUiToast("Coming soon", "Delivery flow will be added next.")}
            onEditEdd={() => showUiToast("Coming soon", "EDD editing will be added next.")}
          />
          <ChecklistCard items={checklist} onToggle={toggleChecklist} />
          <View className="-mt-2 rounded-[22px] border border-[#FFE0D2] bg-[#FFF7F2] px-4 py-4">
            <Text className="text-[15px] font-bold text-[#223130]">Medication Reminder</Text>
            <Text className="mt-1 text-[13px] leading-5 text-[#6D7876]">
              Review your supplement dose, reminder times, and schedule for this week.
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/pregnant-mother/forms/edit-medication")}
              activeOpacity={0.85}
              className="mt-3 h-10 items-center justify-center rounded-full bg-[#0C7A67]"
            >
              <Text className="text-[13px] font-semibold text-white">Edit medication</Text>
            </TouchableOpacity>
          </View>
          <ArticlesCarousel articles={DASHBOARD_ARTICLES} />
          <VitalsCard
            vitals={vitals}
            onOpenUpdate={() => router.push("/pregnant-mother/forms/update-vitals")}
          />
          <UpcomingVisitCard
            onViewDetails={() => showUiToast("Visit details", "Visit details UI will live here.")}
            onAddToCalendar={() => showUiToast("Calendar", "Calendar integration will be added later.")}
          />
          <EmergencyContactsCard
            onCallHospital={() => showUiToast("Call Hospital", "Hospital call action is UI-only for now.")}
            onCallFamily={() => showUiToast("Call family", "Family call action is UI-only for now.")}
            onCallFriend={() => showUiToast("Call Friend", "Friend call action is UI-only for now.")}
          />
          <WellnessGrid
            items={WELLNESS_ACTIVITIES}
            onStart={(title) => showUiToast(title, "This wellness session is UI-only for now.")}
          />
          <JournalCard
            entries={journalEntries}
            onAddEntry={() => router.push("/pregnant-mother/forms/journal")}
          />
          <CommunityCard posts={COMMUNITY_POSTS} />
          <NutritionCard
            meals={meals}
            onEditPlan={() => router.push("/pregnant-mother/forms/nutrition-plan")}
          />
          <BabyDevelopmentCard
            onLearnMore={() => router.push("/babyDevelopment/development")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
