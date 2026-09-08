import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CalendarStrip({ days, onSelectDay }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-3">
        {days.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onSelectDay?.(item)}
            className={`h-[62px] w-[52px] items-center justify-center rounded-[18px] ${
              item.active ? "bg-[#14D1BF]" : "bg-white"
            }`}
          >
            <Text className={`text-[18px] font-bold ${item.active ? "text-white" : "text-[#293231]"}`}>
              {item.day}
            </Text>
            <Text className={`text-[14px] ${item.active ? "text-white" : "text-[#5C6664]"}`}>
              {item.month}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
