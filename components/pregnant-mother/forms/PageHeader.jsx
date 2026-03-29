import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

export default function PageHeader({ title, onBack, rightIcon = "notifications" }) {
  return (
    <View className="relative mb-8 overflow-hidden px-5 pt-3">
      <LinearGradient
        colors={["#DDF4EE", "rgba(221,244,238,0.78)", "rgba(255,255,255,0)"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: 132 }}
      />
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.82}
          className="h-11 w-11 items-center justify-center rounded-full"
        >
          <Ionicons name="arrow-back" size={22} color="#293231" />
        </TouchableOpacity>
        <Text className="text-[22px] font-bold text-[#293231]">{title}</Text>
        <View className="h-11 w-11 items-center justify-center rounded-full">
          <Ionicons name={rightIcon} size={20} color="#293231" />
        </View>
      </View>
    </View>
  );
}
