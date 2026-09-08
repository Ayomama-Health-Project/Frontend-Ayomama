import { useRouter } from "expo-router";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppAuth from "../../hooks/useAppAuth";
import { useTranslation } from "../../utils/translator";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { motherApi } from "../../services/motherApi";
import BabyDevelopmentCard from "../../components/shared/dashboard/BabyDevelopmentCard";
import BabyHighlightsCard from "../../components/shared/dashboard/BabyHighlightsCard";
import ChecklistCard from "../../components/shared/dashboard/ChecklistCard";
import CommunityCard from "../../components/shared/dashboard/CommunityCard";
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader";
import DueDateCard from "../../components/shared/dashboard/DueDateCard";
import UpcomingVisitCard from "../../components/shared/dashboard/UpcomingVisitCard";
import { Card, DashboardScreenSkeleton, PillButton, SectionTitle } from "../../components/shared/dashboard/shared";

export default function PartnerHome() {
  const router = useRouter();
  const { account } = useAppAuth();
  const greetingText = useTranslation("Welcome back");
  const checklistText = useTranslation("Her Daily Checklist");
  const remindersText = useTranslation("Routine & Vitamins Reminders");
  const remindersSubtext = useTranslation("Stay on track with her daily health routine");
  const viewRemindersText = useTranslation("View Reminders");
  const developmentText = useTranslation("Baby's Development");
  const supportText = useTranslation("How you can support her today");
  const supportEmptyText = useTranslation("Practical ways you can show up for her will appear here.");
  const checklistEmptyText = useTranslation("Her care checklist will appear here once onboarding and planning are complete.");
  const postsEmptyText = useTranslation("Community highlights for your shared journey will appear here soon.");
  const remindersEmptyText = useTranslation("No reminders have been added yet.");
  const expectedDeliveryTitle = useTranslation("Her Expected Delivery Date (EDD)");
  const dateText = useTranslation("Date:");
  const viewTimelineText = useTranslation("View Timeline");
  const noAppointmentText = useTranslation("No visit scheduled yet");
  const noAppointmentHintText = useTranslation("As soon as the next appointment is added, it will appear here.");
  const upcomingVisitTitle = useTranslation("Her Upcoming Visit");
  const learnMoreText = useTranslation("Learn more");
  const sharedHighlightsText = useTranslation("Shared Community Highlights");
  const name = account?.profile?.fullName?.split(" ")[0] || "Papa James";
  const [summary, setSummary] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    motherApi.fetchDashboardSummary().then((data) => {
      setSummary(data.summary || null);
      setAppointment(data.nextAppointment || null);
    }).catch(() => null).finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await motherApi.fetchDashboardSummary();
      setSummary(data.summary || null);
      setAppointment(data.nextAppointment || null);
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Refresh failed",
        text2: "We could not refresh the shared dashboard right now.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const checklist = (summary?.checklistItems || []).slice(0, 3).map((item) => ({
    id: item.itemId,
    checked: Boolean(item.completed),
    image:
      item.iconKey === "water"
        ? require("../../assets/images/water.png")
        : item.iconKey === "shoe"
          ? require("../../assets/images/shoe.png")
          : require("../../assets/images/ironSupplement.png"),
    label: item.label,
  }));

  const reminderItems = (summary?.medicationReminders || []).map(
    (item) => `${item.title} · ${item.timeLabel}`,
  );

  const supportTips = [
    ...(summary?.supportTips || []),
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 32, paddingTop: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#0C7A67" colors={["#0C7A67"]} />
        }
      >
        <DashboardHeader
          name={name}
          onOpenProfile={() => router.push("/(partner-tabs)/profile")}
          onOpenNotifications={() => router.push("/notifications")}
        />

        {isLoading ? <DashboardScreenSkeleton showHeader={false} /> : (
        <View className="gap-5">
          <View>
            <Text className="mb-3 text-sm text-[#8F8D8D]">{greetingText}</Text>
            <BabyHighlightsCard
              stageLabel={summary?.developmentSnapshot?.stageLabel || "Current stage"}
              headline={summary?.developmentSnapshot?.headline || `${summary?.babyDisplayName || "Your baby"} is growing beautifully and becoming more active each day.`}
              description={(summary?.developmentSnapshot?.tips || []).join(" ") || "Stay close, stay encouraging, and keep supporting healthy rest, meals, and appointments."}
            />
          </View>

          <DueDateCard
            title={expectedDeliveryTitle}
            dateLabel={dateText}
            dateValue={summary?.dueDate ? new Date(summary.dueDate).toLocaleDateString() : "Due date not set"}
            secondaryActionLabel={viewTimelineText}
            onSecondaryAction={() => router.push("/(partner-tabs)/visit")}
            hidePrimaryAction
          />

          {checklist.length ? (
            <ChecklistCard
              items={checklist}
              onToggle={() => {}}
              title={checklistText}
              showCheckbox={false}
            />
          ) : (
            <Card>
              <SectionTitle title={checklistText} />
              <Text className="text-[14px] leading-6 text-[#6C7674]">{checklistEmptyText}</Text>
            </Card>
          )}

          <Card>
            <SectionTitle title={remindersText} />
            <Text className="text-[13px] leading-6 text-[#6C7674]">{remindersSubtext}</Text>
            <View className="mt-4 gap-3">
              {reminderItems.length ? (
                reminderItems.map((item) => (
                  <View key={item} className="rounded-[18px] bg-[#EDF8F4] px-4 py-4">
                    <Text className="text-[14px] font-medium text-[#223130]">{item}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-[14px] leading-6 text-[#6C7674]">{remindersEmptyText}</Text>
              )}
            </View>
            <View className="mt-4">
              <PillButton label={viewRemindersText} onPress={() => router.push("/(partner-tabs)/visit")} />
            </View>
          </Card>

          {appointment ? (
            <UpcomingVisitCard
              appointment={appointment}
              cardTitle={upcomingVisitTitle}
              primaryActionLabel={viewRemindersText}
              onViewDetails={() => router.push("/(partner-tabs)/visit")}
              hideSecondaryAction
            />
          ) : (
            <Card>
              <SectionTitle title={upcomingVisitTitle} />
              <Text className="text-[15px] font-semibold text-[#223130]">{noAppointmentText}</Text>
              <Text className="mt-2 text-[14px] leading-6 text-[#6C7674]">{noAppointmentHintText}</Text>
            </Card>
          )}

          <BabyDevelopmentCard
            title={developmentText}
            milestoneTitle={summary?.developmentSnapshot?.stageLabel || "Baby development"}
            milestones={(summary?.developmentSnapshot?.milestones || []).length ? summary.developmentSnapshot.milestones : []}
            ctaLabel={learnMoreText}
            onLearnMore={() => router.push("/babyDevelopment/development")}
          />

          <CommunityCard
            title={sharedHighlightsText}
            posts={summary?.communityHighlights || []}
            emptyText={postsEmptyText}
          />

          <Card>
            <SectionTitle title={supportText} />
            <View className="gap-3">
              {supportTips.length ? (
                supportTips.map((tip, index) => (
                  <View key={tip} className="flex-row items-start rounded-[18px] bg-[#F7FBFA] px-4 py-4">
                    <View className="mr-3 mt-0.5 h-7 w-7 items-center justify-center rounded-full bg-[#223130]">
                      <Text className="text-[11px] font-bold text-white">{index + 1}</Text>
                    </View>
                    <Text className="flex-1 text-[14px] leading-6 text-[#4E5B58]">{tip}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-[14px] leading-6 text-[#6C7674]">{supportEmptyText}</Text>
              )}
            </View>
          </Card>
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
