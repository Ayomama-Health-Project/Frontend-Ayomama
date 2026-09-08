import { LinearGradient } from "expo-linear-gradient";
import { Checkbox } from "expo-checkbox";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ChecklistCard({
  items,
  onToggle,
  title = "Daily Checklist",
  showCheckbox = true,
}) {
  return (
    <LinearGradient
      colors={["#DFF4EE", "#FBE4DA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 30,
        padding: 18,
        shadowColor: "#0D1B1E",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.07,
        shadowRadius: 18,
      }}
    >
      <View className="mb-5 flex-row items-center">
        <Text className="mr-2 text-[18px] text-[#223130]">✓</Text>
        <Text className="text-[18px] font-bold text-[#223130]">{title}</Text>
      </View>
      <View className="gap-4">
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.85}
            onPress={() => onToggle(item.id)}
            className="flex-row items-center rounded-[20px] bg-white px-4 py-4"
          >
            {item.image ? (
              <Image source={item.image} className="mr-4 h-12 w-12" resizeMode="contain" />
            ) : (
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F7F3]">
                <Text className="text-[18px] text-[#0B7A66]">✓</Text>
              </View>
            )}
            <Text className="flex-1 text-[14px] font-medium text-[#243533]">{item.label}</Text>
            {showCheckbox ? (
              <Checkbox value={item.checked} onValueChange={() => onToggle(item.id)} color="#1F2625" />
            ) : (
              <Text className="text-[12px] font-semibold text-[#0B7A66]">
                {item.checked ? "Done" : "Pending"}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}
