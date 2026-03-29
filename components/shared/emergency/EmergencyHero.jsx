import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../utils/translator";

export default function EmergencyHero({
  tapCount,
  onTap,
  onOpenHospitals,
  onCallHospital,
  onCallFamily,
  onCallFriend,
}) {
  const viewHospitalsText = useTranslation("View hospitals near you");
  const titleText = useTranslation("Emergency Help Needed?");
  const subtitleText = useTranslation("We are here to help with everything");
  const tapText = useTranslation("Tap 3 times to send message to all your emergency contact.");
  const callHospitalText = useTranslation("Call Hospital");
  const callFamilyText = useTranslation("Call family");
  const callFriendText = useTranslation("Call Friend");
  return (
    <View className="flex-1 items-center px-6 pt-6">
      <TouchableOpacity
        onPress={onOpenHospitals}
        activeOpacity={0.82}
        className="flex-row items-center rounded-full border border-[#00D2B3] px-4 py-2"
      >
        <Text className="mr-2 text-[14px] font-medium text-[#293231]">{viewHospitalsText}</Text>
        <Ionicons name="business-outline" size={16} color="#293231" />
      </TouchableOpacity>

      <Text className="mt-14 text-center text-[28px] font-bold text-[#293231]">{titleText}</Text>
      <Text className="mt-4 text-center text-[15px] text-[#414B49]">{subtitleText}</Text>

      <TouchableOpacity
        onPress={onTap}
        activeOpacity={0.9}
        className="mt-8 items-center justify-center"
      >
        <View className="h-52 w-52 items-center justify-center rounded-full bg-[#F6C7C7]">
          <View className="h-36 w-36 items-center justify-center rounded-full bg-[#E56E6E]">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-[#DD0707]">
              <Ionicons name="hand-left-outline" size={28} color="#111" />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Text className="mt-12 text-center text-[15px] leading-7 text-[#293231]">{tapText}</Text>

      <View className="mt-16 items-center">
        <View className="mb-4">
          <EmergencyActionButton
            icon="business-outline"
            label={callHospitalText}
            onPress={onCallHospital}
          />
        </View>
        <View className="flex-row gap-4">
          <EmergencyActionButton
            icon="people-outline"
            label={callFamilyText}
            onPress={onCallFamily}
          />
          <EmergencyActionButton
            icon="person-outline"
            label={callFriendText}
            onPress={onCallFriend}
          />
        </View>
      </View>
    </View>
  );
}

function EmergencyActionButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      className="flex-row items-center rounded-[14px] bg-white px-5 py-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      }}
    >
      <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-[#FFD5C8]">
        <Ionicons name={icon} size={16} color="#FF8A57" />
      </View>
      <Text className="text-[14px] font-medium text-[#293231]">{label}</Text>
    </TouchableOpacity>
  );
}
