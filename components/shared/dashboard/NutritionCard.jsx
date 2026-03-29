import { Text, TouchableOpacity, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function NutritionCard({ meals, onEditPlan }) {
  return (
    <Card>
      <SectionTitle title="Nutrition Today" rightLabel="Edit Plan" onPressRight={onEditPlan} />
      <View className="gap-3">
        {meals.map((item) => (
          <View key={item.id} className="rounded-[22px] border border-[#E8EFEC] bg-[#FBFCFC] px-4 py-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-[12px] font-semibold uppercase tracking-[1px] text-[#006D5B]">
                {item.category}
              </Text>
              <Text className="text-[12px] text-[#74807E]">{item.weight}</Text>
            </View>
            <Text className="mt-2 text-[14px] font-medium text-[#223130]">{item.meal}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onEditPlan}
        className="mt-4 h-11 items-center justify-center rounded-full border border-[#D8E5E1] bg-[#F8FBFA]"
      >
        <Text className="text-[13px] font-semibold text-[#21413B]">Manage meals</Text>
      </TouchableOpacity>
    </Card>
  );
}
