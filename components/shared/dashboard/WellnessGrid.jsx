import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function WellnessGrid({ items, onStart }) {
  return (
    <Card>
      <SectionTitle icon="leaf-outline" title="Wellness Activities" />
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {items.map((item) => (
          <View key={item.id} className="w-[48%] rounded-[24px] border border-[#E7EFEC] bg-[#FBFCFC] px-3 py-4">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F7F3]">
              <Ionicons name={item.icon} size={22} color="#006D5B" />
            </View>
            <Text className="mt-4 text-[14px] font-bold text-[#223130]">{item.title}</Text>
            <Text className="mt-1 text-[11px] text-[#6F7B78]">{item.meta}</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onStart(item.title)}
              className="mt-4 h-9 items-center justify-center rounded-full bg-[#006D5B]"
            >
              <Text className="text-[12px] font-semibold text-white">Start</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Card>
  );
}
