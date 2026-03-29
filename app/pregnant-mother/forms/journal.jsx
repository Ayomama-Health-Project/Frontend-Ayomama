import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";

const entries = [
  { id: "1", body: '"Today, my baby smiled for the first time, It was the most beautiful sight💞"', meta: "Yesterday's entry" },
  { id: "2", body: '"Today, my baby smiled for the first time, It was the most beautiful sight💞"', meta: "2 days ago" },
  { id: "3", body: '"Today, my baby smiled for the first time, It was the most beautiful sight💞"', meta: "2 days ago" },
  { id: "4", body: '"Today, my baby smiled for the first time, It was the most beautiful sight💞"', meta: "2 days ago" },
  { id: "5", body: '"Today, my baby smiled for the first time, It was the most beautiful sight💞"', meta: "3 days ago" },
  { id: "6", body: '"Today, my baby smiled for the first time💞"', meta: "3 days ago" },
];

export default function JournalPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-1 px-5 pt-10">
        <View className="mb-7 flex-row items-center">
          <Text className="mr-3 text-[18px]">📖</Text>
          <Text className="text-[18px] font-bold text-[#293231]">Journal & Reflection</Text>
        </View>
        <View className="rounded-[28px] bg-[#E9F7F4] px-[10px] py-[12px]">
          {entries.map((entry) => (
            <View key={entry.id} className="mb-3 rounded-[18px] bg-white px-4 py-4">
              <Text className="text-[16px] italic leading-8 text-[#3B413F]">{entry.body}</Text>
              <Text className="mt-3 text-[13px] text-[#333]">{entry.meta}</Text>
            </View>
          ))}
        </View>
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
