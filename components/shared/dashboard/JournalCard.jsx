import { Text, TouchableOpacity, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function JournalCard({ entries, onAddEntry }) {
  return (
    <Card>
      <SectionTitle icon="book-outline" title="Journal & Reflection" />
      <View className="gap-3">
        {entries.map((entry, index) => (
          <View
            key={entry.id || entry._id || `${entry.meta || "journal"}-${index}`}
            className="rounded-[22px] border border-[#E8EFEC] bg-[#FBFCFC] px-4 py-4"
          >
            <Text className="text-[13px] leading-6 text-[#243533]">{entry.body}</Text>
            <Text className="mt-3 text-[11px] text-[#7A8784]">{entry.meta}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onAddEntry}
        className="mt-4 h-11 items-center justify-center rounded-full bg-[#006D5B]"
      >
        <Text className="text-[14px] font-semibold text-white">Add new entry</Text>
      </TouchableOpacity>
    </Card>
  );
}
