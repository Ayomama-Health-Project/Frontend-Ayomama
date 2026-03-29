import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import { PillButton } from "./shared";

export default function UpcomingVisitCard({ onViewDetails, onAddToCalendar }) {
  return (
    <View>
      <View className="mb-4 flex-row items-center">
        <Ionicons name="calendar-outline" size={20} color="#223130" />
        <Text className="ml-2 text-[18px] font-bold text-[#223130]">Upcoming Visit</Text>
      </View>
      <LinearGradient
        colors={["#DFF4EE", "#FBE4DA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 16 }}
      >
        <View className="items-center">
          <Text className="text-center text-[18px] font-bold text-[#223130]">Tomorrow, Antenatal Checkup!</Text>
          <Text className="mt-1 text-[13px] text-[#243533]">10:30 am July 20th</Text>
        </View>
        <Image
          source={require("../../../assets/images/clinicVisit.png")}
          className="mt-4 h-44 w-full"
          resizeMode="contain"
        />
      </LinearGradient>
      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <PillButton label="View Details" onPress={onViewDetails} />
        </View>
        <View className="flex-1">
          <PillButton label="Add to Calendar" tone="secondary" onPress={onAddToCalendar} />
        </View>
      </View>
    </View>
  );
}
