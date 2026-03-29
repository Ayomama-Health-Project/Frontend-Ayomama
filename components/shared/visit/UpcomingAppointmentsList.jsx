import { Text, View } from "react-native";
import { useTranslation } from "../../../utils/translator";
import { VisitActionButton } from "./shared";

function AppointmentCard({ item, onReminder, onDirections }) {
  const setReminderText = useTranslation("Set Reminder");
  const seeDirectionsText = useTranslation("See Directions");
  return (
    <View className="rounded-[22px] border border-[#FF8A57] px-4 py-4">
      <Text className="text-[18px] font-bold text-[#293231]">
        {item.date} - <Text className="text-[#F59A38]">{item.time}</Text>{" "}
        <Text className="font-medium">{item.note}</Text>
      </Text>
      <Text className="mt-1 text-[13px] text-[#7B7B7B]">{item.hospital}</Text>
      <View className="mt-4 flex-row gap-3">
        <VisitActionButton label={setReminderText} onPress={() => onReminder(item)} />
        <VisitActionButton label={seeDirectionsText} tone="secondary" onPress={() => onDirections(item)} />
      </View>
    </View>
  );
}

export default function UpcomingAppointmentsList({ appointments, onReminder, onDirections }) {
  const upcomingText = useTranslation("Upcoming Appointments");
  const editText = useTranslation("Edit");
  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[18px] font-bold text-[#293231]">{upcomingText}</Text>
        <View className="flex-row items-center rounded-full border border-[#00D2B3] px-3 py-1">
          <Text className="mr-2 text-[13px] text-[#6D7876]">{editText}</Text>
          <Text className="text-[14px]">✎</Text>
        </View>
      </View>
      {appointments.map((item) => (
        <AppointmentCard
          key={item.id}
          item={item}
          onReminder={onReminder}
          onDirections={onDirections}
        />
      ))}
    </View>
  );
}
