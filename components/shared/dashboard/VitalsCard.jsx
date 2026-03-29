import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Card } from "./shared";

function VitalTile({ icon, label, value, accent }) {
  return (
    <View className="w-[48%] rounded-[18px] bg-[#DDF8F3] px-3 py-4">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={18} color={accent} />
        <Text className="ml-2 flex-1 text-[12px] font-semibold text-[#30413E]">{label}</Text>
      </View>
      <Text className="mt-4 text-center text-[16px] font-bold text-[#223130]">{value}</Text>
    </View>
  );
}

export default function VitalsCard({ vitals, onOpenUpdate }) {
  return (
    <Card>
      <Text className="mb-4 text-[18px] font-medium text-[#223130]">Your Vitals Overview</Text>
      <View className="items-center rounded-[22px] bg-[#DDF4F0] py-4">
        <Image
          source={require("../../../assets/images/vitals.png")}
          className="h-44 w-[88%]"
          resizeMode="contain"
        />
      </View>
      <View className="flex-row flex-wrap justify-between gap-y-3">
        <VitalTile icon="water-outline" label="Blood Pressure" value={vitals.bloodPressure} accent="#FF4D4F" />
        <VitalTile icon="barbell-outline" label="Weight" value={vitals.weight} accent="#223130" />
        <VitalTile icon="thermometer-outline" label="Temperature" value={vitals.temperature} accent="#223130" />
        <VitalTile icon="water-outline" label="Blood Level" value={vitals.bloodLevel} accent="#FF4D4F" />
      </View>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onOpenUpdate}
        className="mt-4 h-11 items-center justify-center rounded-[14px] bg-[#0B7A66]"
      >
        <Text className="text-[14px] font-semibold text-white">Update Vitals</Text>
      </TouchableOpacity>
    </Card>
  );
}
