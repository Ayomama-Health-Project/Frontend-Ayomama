import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../utils/translator";

export default function DashboardHeader({ name, onOpenProfile, onOpenNotifications }) {
  const helloText = useTranslation("Hello,");
  return (
    <View className="mb-5 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity activeOpacity={0.85} onPress={onOpenProfile}>
          <Image
            source={require("../../../assets/images/profilepic.png")}
            className="h-11 w-11 rounded-full"
          />
        </TouchableOpacity>
        <View className="ml-3">
          <Text className="text-[14px] text-[#667270]">{helloText}</Text>
          <Text className="text-[20px] font-bold text-[#223130]">{name}</Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenNotifications}
        className="h-11 w-11 items-center justify-center rounded-full bg-white"
      >
        <Ionicons name="notifications" size={20} color="#223130" />
      </TouchableOpacity>
    </View>
  );
}
