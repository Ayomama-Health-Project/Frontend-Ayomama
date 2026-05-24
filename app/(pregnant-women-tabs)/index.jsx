import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Linking, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
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
  INITIAL_CHECKLIST,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_MEALS,
  INITIAL_VITALS,
  WELLNESS_ACTIVITIES,
} from "../../components/shared/dashboard/constants";
import { DashboardScreenSkeleton } from "../../components/shared/dashboard/shared";
import useAppAuth from "../../hooks/useAppAuth";
import { motherApi } from "../../services/motherApi";
import { useTranslation } from "../../utils/translator";

const CHECKLIST_IMAGES = {
  supplement: require("../../assets/images/ironSupplement.png"),
  water: require("../../assets/images/water.png"),
  walk: require("../../assets/images/shoe.png"),
  clinic: require("../../assets/images/clinic.png"),
  card: require("../../assets/images/motherandbaby.png"),
};

export default function PregnantDashboardScreen() {
  const { account } = useAppAuth();
  const [checklist, setChecklist] = useState(
    INITIAL_CHECKLIST.map((item) => ({ ...item, checked: false })),
  );
  const [journalEntries, setJournalEntries] = useState(INITIAL_JOURNAL_ENTRIES);
  const [meals, setMeals] = useState(INITIAL_MEALS);
  const [articles, setArticles] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [summary, setSummary] = useState(null);
  const [vitals, setVitals] = useState(INITIAL_VITALS);
  const [wellnessItems, setWellnessItems] = useState(WELLNESS_ACTIVITIES);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pregnancyDeliveryText = useTranslation("Your Expected Delivery date (EDD)");
  const dateText = useTranslation("Date:");
  const editEddText = useTranslation("Edit EDD");
  const medicationReminderText = useTranslation("Medication Reminder");
  const editMedicationText = useTranslation("Edit medication");
  const reminderEmptyText = useTranslation("Your medication schedule will appear here once it is set up.");
  const wellnessStartedText = useTranslation("Wellness started");
  const switchedText = useTranslation("Profile updated");
  const switchedBodyText = useTranslation("Please complete your postpartum profile to continue.");

  const displayName = useMemo(
    () => account?.profile?.fullName?.split(" ")[0] || "Mama Grace",
    [account?.profile?.fullName],
  );

  useEffect(() => {
    let mounted = true;

    const loadSummary = async (isRefresh = false) => {
      if (isRefresh && mounted) {
        setRefreshing(true);
      }

      try {
        const data = await motherApi.fetchDashboardSummary();
        if (!mounted) return;

        setSummary(data.summary || null);
        setChecklist(
          data.summary?.checklistItems?.length
            ? data.summary.checklistItems.map((item) => ({
                ...item,
                id: item.itemId || item.id,
                image: CHECKLIST_IMAGES[item.itemId || item.id] || null,
              }))
            : INITIAL_CHECKLIST,
        );
        setJournalEntries(
          data.summary?.journalEntries?.length ? data.summary.journalEntries : INITIAL_JOURNAL_ENTRIES,
        );
        setMeals(data.summary?.nutritionPlan?.length ? data.summary.nutritionPlan : INITIAL_MEALS);
        setVitals(data.summary?.vitalsOverview || INITIAL_VITALS);
        setWellnessItems(
          (data.summary?.wellnessActivities || []).length
            ? data.summary.wellnessActivities.map((item) => ({
                id: item.activityId || item._id,
                title: item.title,
                meta: item.meta,
                icon: item.icon,
              }))
            : WELLNESS_ACTIVITIES,
        );
        setArticles(data.publishedBlogs || []);
        setCommunityPosts(
          (data.summary?.communityHighlights || []).length
            ? data.summary.communityHighlights
            : [],
        );
        setNextAppointment(data.nextAppointment || null);
      } catch (_error) {
        if (!mounted) return;
        Toast.show({
          type: "error",
          text1: "Dashboard unavailable",
          text2: "We could not load your live dashboard data right now.",
          position: "top",
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
          setRefreshing(false);
        }
      }
    };

    loadSummary();
    return () => {
      mounted = false;
    };
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await motherApi.fetchDashboardSummary();
      setSummary(data.summary || null);
      setChecklist(
        data.summary?.checklistItems?.length
          ? data.summary.checklistItems.map((item) => ({
              ...item,
              id: item.itemId || item.id,
              image: CHECKLIST_IMAGES[item.itemId || item.id] || null,
            }))
          : INITIAL_CHECKLIST,
      );
      setJournalEntries(
        data.summary?.journalEntries?.length ? data.summary.journalEntries : INITIAL_JOURNAL_ENTRIES,
      );
      setMeals(data.summary?.nutritionPlan?.length ? data.summary.nutritionPlan : INITIAL_MEALS);
      setVitals(data.summary?.vitalsOverview || INITIAL_VITALS);
      setWellnessItems(
        (data.summary?.wellnessActivities || []).length
          ? data.summary.wellnessActivities.map((item) => ({
              id: item.activityId || item._id,
              title: item.title,
              meta: item.meta,
              icon: item.icon,
            }))
          : WELLNESS_ACTIVITIES,
      );
      setArticles(data.publishedBlogs || []);
      setCommunityPosts((data.summary?.communityHighlights || []).length ? data.summary.communityHighlights : []);
      setNextAppointment(data.nextAppointment || null);
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Refresh failed",
        text2: "We could not refresh your dashboard right now.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const toggleChecklist = (id) => {
    const nextItem = checklist.find((item) => (item.id || item.itemId) === id);
    setChecklist((prev) =>
      prev.map((item) =>
        (item.id || item.itemId) === id
          ? { ...item, checked: !item.checked, completed: !item.completed }
          : item,
      ),
    );
    motherApi.toggleChecklistItem(id).catch(() => null);

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

  const openPhone = async (phoneNumber, label) => {
    if (!phoneNumber) {
      showUiToast("Phone unavailable", `${label} does not have a saved phone number yet.`);
      return;
    }

    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (_error) {
      showUiToast("Call failed", "We could not open the dialer right now.");
    }
  };

  const hospitalContact = summary?.emergencyContacts?.find((item) => item.relationship?.toLowerCase() === "hospital");
  const familyContact = summary?.emergencyContacts?.find((item) => item.relationship?.toLowerCase() === "family");
  const friendContact = summary?.emergencyContacts?.find((item) => item.relationship?.toLowerCase() === "friend");

  const handleSwitchToPostpartum = async () => {
    try {
      await motherApi.switchMotherType("postpartum");
      Toast.show({
        type: "success",
        text1: switchedText,
        text2: switchedBodyText,
        position: "top",
      });
      router.replace("/onboarding/mother/postpartum");
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: "We could not switch your journey right now.",
        position: "top",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5FAF8]" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5FAF8" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 32, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#0C7A67" colors={["#0C7A67"]} />
        }
      >
        <DashboardHeader
          name={displayName}
          onOpenProfile={() => router.push("/(pregnant-women-tabs)/profile")}
          onOpenNotifications={() => router.push("/notifications")}
        />

        {isLoading ? <DashboardScreenSkeleton showHeader={false} /> : (
        <View className="gap-5">
          <BabyHighlightsCard
            stageLabel={summary?.developmentSnapshot?.stageLabel || "Current stage"}
            headline={summary?.developmentSnapshot?.headline || `${summary?.babyDisplayName || "Your baby"} is growing beautifully this week.`}
            description={(summary?.developmentSnapshot?.tips || []).join(" ") || "Stay hydrated, well rested, and keep following your care routine."}
          />
          <DueDateCard
            title={pregnancyDeliveryText}
            dateLabel={dateText}
            dateValue={summary?.dueDate ? new Date(summary.dueDate).toLocaleDateString() : "Due date not set"}
            secondaryActionLabel={editEddText}
            onEditEdd={() => router.push("/profile/EditProfile")}
            onMarkDelivered={handleSwitchToPostpartum}
          />
          <ChecklistCard
            items={checklist.map((item) => ({
              ...item,
              id: item.id || item.itemId,
              checked: typeof item.checked === "boolean" ? item.checked : Boolean(item.completed),
            }))}
            onToggle={toggleChecklist}
          />
          <View className="-mt-2 rounded-[22px] border border-[#FFE0D2] bg-[#FFF7F2] px-4 py-4">
            <Text className="text-[15px] font-bold text-[#223130]">{medicationReminderText}</Text>
            <View className="mt-2 gap-2">
              {(summary?.medicationReminders || []).length ? (
                summary.medicationReminders.map((item) => (
                  <Text key={item._id || item.title} className="text-[13px] leading-5 text-[#6D7876]">
                    {item.title} at {item.timeLabel} {item.enabled ? "" : "(paused)"}
                  </Text>
                ))
              ) : (
                <Text className="text-[13px] leading-5 text-[#6D7876]">{reminderEmptyText}</Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => router.push("/pregnant-mother/forms/edit-medication")}
              activeOpacity={0.85}
              className="mt-3 h-10 items-center justify-center rounded-full bg-[#0C7A67]"
            >
              <Text className="text-[13px] font-semibold text-white">{editMedicationText}</Text>
            </TouchableOpacity>
          </View>
          <ArticlesCarousel articles={articles.length ? articles : []} />
          <VitalsCard
            vitals={vitals}
            onOpenUpdate={() => router.push("/pregnant-mother/forms/update-vitals")}
          />
          <UpcomingVisitCard
            appointment={nextAppointment}
            onViewDetails={() => router.push("/(pregnant-women-tabs)/visit")}
            onAddToCalendar={() => router.push("/visit/visitInput")}
          />
          <EmergencyContactsCard
            onCallHospital={() => openPhone(hospitalContact?.phoneNumber, hospitalContact?.name || "Hospital")}
            onCallFamily={() => openPhone(familyContact?.phoneNumber, familyContact?.name || "Family")}
            onCallFriend={() => openPhone(friendContact?.phoneNumber, friendContact?.name || "Friend")}
          />
          <WellnessGrid
            items={wellnessItems}
            onStart={(title) => showUiToast(wellnessStartedText, `${title} is now part of your focus for today.`)}
          />
          <JournalCard
            entries={journalEntries}
            onAddEntry={() => router.push("/pregnant-mother/forms/journal")}
          />
          <CommunityCard posts={communityPosts} />
          <NutritionCard
            meals={meals}
            onEditPlan={() => router.push("/pregnant-mother/forms/nutrition-plan")}
          />
          <BabyDevelopmentCard
            milestoneTitle={summary?.developmentSnapshot?.stageLabel || "Baby development"}
            milestones={summary?.developmentSnapshot?.milestones || []}
            ctaLabel={summary?.babyDisplayName ? `Learn more about ${summary.babyDisplayName}` : undefined}
            onLearnMore={() => router.push("/babyDevelopment/development")}
          />
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
