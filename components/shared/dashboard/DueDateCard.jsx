import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import { PillButton } from "./shared";

export default function DueDateCard({ onMarkDelivered, onEditEdd }) {
  return (
    <LinearGradient
      colors={["#DFF4EE", "#FBE4DA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 28, padding: 14 }}
    >
      <View className="rounded-[24px] border border-[#00D2B3] px-4 py-4">
        <Text className="text-center text-[16px] font-bold text-[#223130]">
          Your Expected Delivery date (EDD)
        </Text>
        <View className="mt-6 flex-row items-center justify-center">
          <Text className="mr-2 text-[16px] text-[#3A4543]">Date:</Text>
          <Text className="text-[18px] font-bold text-[#00BFA9]">23/12/2025</Text>
        </View>
        <View className="mt-6 flex-row gap-3">
          <View className="flex-1">
            <PillButton label="Edit EDD" tone="secondary" onPress={onEditEdd} />
          </View>
          <View className="flex-1">
            <PillButton label="Mark Delivered" onPress={onMarkDelivered} />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
