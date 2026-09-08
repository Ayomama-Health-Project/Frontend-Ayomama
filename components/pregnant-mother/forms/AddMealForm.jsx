import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FormShell from "./FormShell";

export default function AddMealForm({
  visible,
  meal,
  onChange,
  onClose,
  onAdd,
}) {
  return (
    <FormShell visible={visible} onClose={onClose} title="Add new meal" compact>
      <View className="pt-2">
        <Text className="mb-2 text-[14px] font-medium text-[#252525]">Category</Text>
        <View className="mb-4 flex-row items-center rounded-[12px] bg-[#F2F4F7] px-4">
          <TextInput
            value={meal.category}
            onChangeText={(value) => onChange("category", value)}
            className="h-12 flex-1 text-[15px] text-[#6B7280]"
            placeholder="Breakfast"
            placeholderTextColor="#9CA3AF"
          />
          <Ionicons name="chevron-down" size={18} color="#1F2625" />
        </View>

        <Text className="mb-2 text-[14px] font-medium text-[#252525]">Meal</Text>
        <TextInput
          value={meal.meal}
          onChangeText={(value) => onChange("meal", value)}
          className="mb-4 h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
          placeholder="Plantain and eggs"
          placeholderTextColor="#9CA3AF"
        />

        <Text className="mb-2 text-[14px] font-medium text-[#252525]">Weight (g)</Text>
        <TextInput
          value={meal.weight}
          onChangeText={(value) => onChange("weight", value)}
          keyboardType="numeric"
          className="mb-4 h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
          placeholder="100"
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity
          onPress={onAdd}
          activeOpacity={0.85}
          className="mt-1 h-12 items-center justify-center rounded-[12px] bg-[#0C7A67]"
        >
          <Text className="text-[16px] font-semibold text-white">Add</Text>
        </TouchableOpacity>
      </View>
    </FormShell>
  );
}
