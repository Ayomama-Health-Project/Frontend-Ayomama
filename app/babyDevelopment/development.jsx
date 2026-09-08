import { useRouter } from "expo-router";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { BackHeader } from "../../components/shared/hub/shared";
import { EmptyStateCard } from "../../components/shared/hub/shared";
import { motherApi } from "../../services/motherApi";
import { useTranslation } from "../../utils/translator";

function TipCard({ text }) {
  return (
    <View className="mb-5 rounded-[22px] bg-[#F6F0EC] px-5 py-5">
      <View className="flex-row items-center">
        <Text className="mr-4 text-[22px]">👶</Text>
        <Text className="flex-1 text-[16px] font-medium leading-7 text-[#293231]">{text}</Text>
      </View>
    </View>
  );
}

export default function BabyDevelopment() {
  const router = useRouter();
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const titleText = useTranslation("Baby Development");
  const emptyTitleText = useTranslation("Development details are not ready yet");
  const emptyBodyText = useTranslation("Complete the pregnancy dates in your profile so AYOMAMA can calculate the right stage and show tailored development updates.");

  const loadSummary = async () => {
    setIsLoading(true);
    try {
      const data = await motherApi.fetchDashboardSummary();
      setSummary(data.summary || null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSummary().catch(() => null);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadSummary();
    } finally {
      setRefreshing(false);
    }
  };

  const snapshot = summary?.developmentSnapshot;
  const sizeText = snapshot?.sizeComparison
    ? `${summary?.babyDisplayName || "Your baby"} is about the size of ${snapshot.sizeComparison}`
    : `${summary?.babyDisplayName || "Your baby"} is growing beautifully`;
  const milestoneTitle = snapshot?.stageLabel || "Baby development";
  const milestones = snapshot?.milestones || [];
  const tips = snapshot?.tips || [];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <BackHeader title={titleText} onBack={() => router.back()} />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#0C7A67" colors={["#0C7A67"]} />
        }
      >
        {isLoading ? (
          <View className="pt-6">
            <View className="rounded-[28px] border border-[#E4ECE8] bg-[#F8FBFA] px-5 py-5">
              <View className="h-6 w-48 rounded-full bg-[#E7F1EE]" />
              <View className="mt-4 h-4 w-full rounded-full bg-[#EEF5F3]" />
              <View className="mt-2 h-4 w-[82%] rounded-full bg-[#EEF5F3]" />
              <View className="mt-6 items-center">
                <View className="h-48 w-36 rounded-[24px] bg-[#E7F1EE]" />
              </View>
              <View className="mt-6 h-4 w-40 rounded-full bg-[#EEF5F3]" />
              <View className="mt-3 h-4 w-full rounded-full bg-[#EEF5F3]" />
              <View className="mt-2 h-4 w-[90%] rounded-full bg-[#EEF5F3]" />
              <View className="mt-2 h-4 w-[76%] rounded-full bg-[#EEF5F3]" />
            </View>
          </View>
        ) : summary ? (
          <>
            <View className="rounded-[28px] border border-[#00D2B3] px-5 py-5">
              <View className="flex-row items-center">
                <Text className="mr-2 text-[18px]">👶</Text>
                <Text className="flex-1 text-[18px] font-bold text-[#293231]">{sizeText}</Text>
              </View>

              <Text className="mt-3 text-[15px] leading-6 text-[#5F6C69]">
                {snapshot?.headline || "We will keep this page updated as your pregnancy stage changes."}
              </Text>

              <Text className="mt-8 text-[18px] font-medium text-[#293231]">{milestoneTitle}</Text>
              <View className="items-center">
                <View className="mt-5 rounded-[24px] bg-[#DFF4EE] px-8 py-5">
                  <Image source={require("../../assets/images/infant.png")} className="h-40 w-28" resizeMode="contain" />
                </View>
              </View>

              <View className="mt-4 rounded-[22px] border border-[#00D2B3] px-4 py-4">
                {milestones.length ? (
                  milestones.map((item, index) => (
                    <Text key={`${item}-${index}`} className={`text-[16px] leading-7 text-[#293231] ${index < milestones.length - 1 ? "mb-3" : ""}`}>
                      • {item}
                    </Text>
                  ))
                ) : (
                  <Text className="text-[16px] leading-7 text-[#293231]">
                    • Fresh development milestones will appear here once your stage is calculated.
                  </Text>
                )}
              </View>
            </View>

            <View className="mt-8">
              {(tips.length ? tips : ["Keep up with hydration, rest, and your care routine while we prepare more guidance."]).map((tip, index) => (
                <TipCard key={`${tip}-${index}`} text={tip} />
              ))}
            </View>
          </>
        ) : (
          <View className="pt-8">
            <EmptyStateCard title={emptyTitleText} description={emptyBodyText} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
