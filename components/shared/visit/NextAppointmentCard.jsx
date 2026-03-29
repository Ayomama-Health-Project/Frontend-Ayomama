import { Text, View } from "react-native";
import { useTranslation } from "../../../utils/translator";
import { VisitActionButton } from "./shared";

export default function NextAppointmentCard({ onSetReminder, onSeeDirections }) {
  const setReminderText = useTranslation("Set Reminder");
  const seeDirectionsText = useTranslation("See Directions");
  return (
    <View className="rounded-[22px] border border-[#FF8A57] px-4 py-4">
      <Text className="text-center text-[18px] font-bold text-[#293231]">
        Tomorrow, Sept 20 - <Text className="text-[#F59A38]">10:00am</Text>
      </Text>
      <Text className="mt-2 text-center text-[13px] text-[#7B7B7B]">
        Yaba Government hospital. Yaba Lagos
      </Text>
      <View className="mt-4 flex-row justify-center gap-3">
        <VisitActionButton label={setReminderText} onPress={onSetReminder} />
        <VisitActionButton label={seeDirectionsText} tone="secondary" onPress={onSeeDirections} />
      </View>
    </View>
  );
}
