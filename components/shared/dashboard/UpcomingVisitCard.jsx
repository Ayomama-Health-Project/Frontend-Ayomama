import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import { PillButton } from "./shared";

export default function UpcomingVisitCard({
  appointment,
  onViewDetails,
  onAddToCalendar,
  cardTitle = "Upcoming Visit",
  primaryActionLabel = "View Details",
  secondaryActionLabel = "Add to Calendar",
  hideSecondaryAction = false,
}) {
  const title = appointment?.serviceType || "Tomorrow, Antenatal Checkup!";
  const dateLabel = appointment?.scheduledFor
    ? new Date(appointment.scheduledFor).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
      })
    : "10:30 am July 20th";

  return (
    <View>
      <View className="mb-4 flex-row items-center">
        <Ionicons name="calendar-outline" size={20} color="#223130" />
        <Text className="ml-2 text-[18px] font-bold text-[#223130]">{cardTitle}</Text>
      </View>
      <LinearGradient
        colors={["#DFF4EE", "#FBE4DA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 16 }}
      >
        <View className="items-center">
          <Text className="text-center text-[18px] font-bold text-[#223130]">{title}</Text>
          <Text className="mt-1 text-[13px] text-[#243533]">{dateLabel}</Text>
        </View>
        <Image
          source={require("../../../assets/images/clinicVisit.png")}
          className="mt-4 h-44 w-full"
          resizeMode="contain"
        />
      </LinearGradient>
      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <PillButton label={primaryActionLabel} onPress={onViewDetails} />
        </View>
        {!hideSecondaryAction ? (
          <View className="flex-1">
            <PillButton label={secondaryActionLabel} tone="secondary" onPress={onAddToCalendar} />
          </View>
        ) : null}
      </View>
    </View>
  );
}
