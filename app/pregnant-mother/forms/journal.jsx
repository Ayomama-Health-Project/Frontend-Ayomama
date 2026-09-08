import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { motherApi } from "../../../services/motherApi";
import { EmptyStateCard } from "../../../components/shared/hub/shared";

export default function JournalPage() {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEntries = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await motherApi.fetchDashboardSummary();
      setEntries(data.summary?.journalEntries || []);
    } catch (_error) {
      setEntries([]);
      Toast.show({
        type: "error",
        text1: "Journal unavailable",
        text2: "We could not load your journal entries right now.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadEntries().catch(() => null);
    }, [loadEntries]),
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-5 pt-10">
        <View className="mb-7 flex-row items-center">
          <Text className="mr-3 text-[18px]">📖</Text>
          <Text className="text-[18px] font-bold text-[#293231]">Journal & Reflection</Text>
        </View>
        {isLoading ? (
          <View className="rounded-[28px] bg-[#E9F7F4] px-[10px] py-[12px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <View key={index} className="mb-3 rounded-[18px] bg-white px-4 py-4">
                <View className="h-4 w-full rounded-full bg-[#EDF3F1]" />
                <View className="mt-2 h-4 w-[80%] rounded-full bg-[#EDF3F1]" />
                <View className="mt-4 h-3 w-24 rounded-full bg-[#EDF3F1]" />
              </View>
            ))}
          </View>
        ) : entries.length ? (
          <ScrollView className="rounded-[28px] bg-[#E9F7F4] px-[10px] py-[12px]" showsVerticalScrollIndicator={false}>
            {entries.map((entry, index) => (
              <View key={entry.id || entry._id || `${entry.meta || "entry"}-${index}`} className="mb-3 rounded-[18px] bg-white px-4 py-4">
                <Text className="text-[16px] italic leading-8 text-[#3B413F]">{entry.body}</Text>
                <Text className="mt-3 text-[13px] text-[#333]">{entry.meta || entry.createdAtLabel || "Recent entry"}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <EmptyStateCard
            title="No journal entries yet"
            description="Your reflections will appear here once you save your first note."
          />
        )}
        <TouchableOpacity
          onPress={() => router.push("/pregnant-mother/forms/new-entry")}
          activeOpacity={0.85}
          className="mt-6 h-12 items-center justify-center rounded-[14px] bg-[#0C7A67]"
        >
          <Text className="text-[16px] font-semibold text-white">Add new entry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
