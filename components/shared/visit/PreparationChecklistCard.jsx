import Checkbox from "expo-checkbox";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../utils/translator";

export default function PreparationChecklistCard({ items, onToggle }) {
  const checklistText = useTranslation("Preparation Checklist");
  return (
    <View>
      <View className="mb-4 flex-row items-center">
        <Text className="mr-2 text-[18px] text-[#293231]">✓</Text>
        <Text className="text-[18px] font-bold text-[#293231]">{checklistText}</Text>
      </View>
      <View className="gap-4">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onToggle(item.id)}
            activeOpacity={0.85}
            className="flex-row items-center rounded-[20px] bg-white px-4 py-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
            }}
          >
            <Image source={item.image} className="mr-4 h-12 w-12" resizeMode="contain" />
            <Text className="flex-1 text-[14px] text-[#293231]">{item.label}</Text>
            <Checkbox value={item.checked} onValueChange={() => onToggle(item.id)} color="#1F2625" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
