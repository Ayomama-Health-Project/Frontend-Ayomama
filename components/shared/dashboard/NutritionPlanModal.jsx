import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { DashboardModal, Field, PillButton } from "./shared";

export default function NutritionPlanModal({ visible, meals, onClose, onSaveMeals }) {
  const [draftMeals, setDraftMeals] = useState(meals);
  const [newMeal, setNewMeal] = useState({ category: "Breakfast", meal: "", weight: "" });

  const categories = useMemo(() => ["Breakfast", "Lunch", "Dinner"], []);

  const addMeal = () => {
    if (!newMeal.meal.trim()) return;
    setDraftMeals((prev) => [
      ...prev,
      { id: `${Date.now()}`, category: newMeal.category, meal: newMeal.meal, weight: newMeal.weight || "100g" },
    ]);
    setNewMeal({ category: "Breakfast", meal: "", weight: "" });
  };

  const removeMeal = (id) => {
    setDraftMeals((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DashboardModal
      visible={visible}
      onClose={onClose}
      title="Edit Nutrition plan"
      subtitle="Manage today's meals here. Changes stay local in the UI for now."
    >
      <View className="mb-4 gap-3">
        {draftMeals.map((item) => (
          <View key={item.id} className="rounded-[20px] border border-[#E8EFEC] bg-[#FBFCFC] px-4 py-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-[12px] font-semibold text-[#006D5B]">{item.category}</Text>
              <TouchableOpacity onPress={() => removeMeal(item.id)} activeOpacity={0.8}>
                <Text className="text-[12px] font-semibold text-[#D65A5A]">Delete</Text>
              </TouchableOpacity>
            </View>
            <Text className="mt-2 text-[14px] font-medium text-[#223130]">{item.meal}</Text>
            <Text className="mt-1 text-[12px] text-[#74807E]">{item.weight}</Text>
          </View>
        ))}
      </View>

      <Text className="mb-3 text-[15px] font-bold text-[#223130]">Add new meal</Text>
      <View className="mb-4 flex-row gap-2">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setNewMeal((prev) => ({ ...prev, category }))}
            activeOpacity={0.85}
            className={`rounded-full px-4 py-2 ${
              newMeal.category === category ? "bg-[#006D5B]" : "bg-[#F1F6F4]"
            }`}
          >
            <Text className={`text-[12px] font-semibold ${newMeal.category === category ? "text-white" : "text-[#21413B]"}`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Field label="Meal" value={newMeal.meal} onChangeText={(value) => setNewMeal((prev) => ({ ...prev, meal: value }))} placeholder="Plantain and eggs" />
      <Field label="Weight (g)" value={newMeal.weight} onChangeText={(value) => setNewMeal((prev) => ({ ...prev, weight: value }))} placeholder="100g" keyboardType="numeric" />
      <View className="mb-4">
        <PillButton label="Add New meal" onPress={addMeal} />
      </View>
      <PillButton label="Save Plan" onPress={() => onSaveMeals(draftMeals)} />
    </DashboardModal>
  );
}
