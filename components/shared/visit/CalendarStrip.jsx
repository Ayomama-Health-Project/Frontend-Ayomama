import { ScrollView, Text, View } from "react-native";

export default function CalendarStrip({ days }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-3">
        {days.map((item) => (
          <View
            key={item.id}
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
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
