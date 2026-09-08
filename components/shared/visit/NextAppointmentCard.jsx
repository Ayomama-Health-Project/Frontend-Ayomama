import { Text, View } from "react-native";
import { useTranslation } from "../../../utils/translator";
import { VisitActionButton } from "./shared";

export default function NextAppointmentCard({ appointment, onSetReminder, onSeeDirections }) {
  const setReminderText = useTranslation("Set Reminder");
  const seeDirectionsText = useTranslation("See Directions");
  const title = appointment?.scheduledFor
    ? `${new Date(appointment.scheduledFor).toLocaleDateString()} - ${new Date(appointment.scheduledFor).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "No appointment selected";
  const service = appointment?.serviceType || "No visit scheduled";
  const hospital = appointment?.hospitalName || "Choose a date to view the scheduled appointment details.";
  return (
    <View className="rounded-[22px] border border-[#FF8A57] px-4 py-4">
      <Text className="text-center text-[18px] font-bold text-[#293231]">
        {title} <Text className="text-[#F59A38]">{service}</Text>
      </Text>
      <Text className="mt-2 text-center text-[13px] text-[#7B7B7B]">
        {hospital}
      </Text>
      {appointment ? (
        <View className="mt-4 flex-row justify-center gap-3">
          <VisitActionButton label={setReminderText} onPress={onSetReminder} />
          <VisitActionButton label={seeDirectionsText} tone="secondary" onPress={onSeeDirections} />
        </View>
      ) : null}
    </View>
  );
}
