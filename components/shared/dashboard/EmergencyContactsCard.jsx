import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Card } from "./shared";

function ContactButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="rounded-[14px] bg-white px-4 py-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        minWidth: 142,
      }}
    >
      <View className="mr-2 h-7 w-7 items-center justify-center rounded-full bg-[#FFD5C8]">
        <Ionicons name={icon} size={14} color="#FF8A57" />
      </View>
      <Text className="text-[13px] font-semibold text-[#27403B]">{label}</Text>
    </TouchableOpacity>
  );
}

export default function EmergencyContactsCard({ onCallHospital, onCallFamily, onCallFriend }) {
  return (
    <Card>
      <View className="mb-4 flex-row items-center">
        <Ionicons name="call-outline" size={20} color="#223130" />
        <Text className="ml-2 text-[18px] font-bold text-[#223130]">Emergency Contact</Text>
      </View>
      <View className="items-center rounded-[28px] bg-[#FBE7DF] px-5 py-4">
        <Text className="text-[18px] font-bold text-[#223130]">Need Urgent Help?</Text>
        <Image
          source={require("../../../assets/images/emergency.png")}
          className="mt-3 h-28 w-36"
          resizeMode="contain"
        />
      </View>
      <View className="mt-5 items-center">
        <ContactButton icon="business-outline" label="Call Hospital" onPress={onCallHospital} />
      </View>
      <View className="mt-4 flex-row justify-between">
        <ContactButton icon="people-outline" label="Call family" onPress={onCallFamily} />
        <ContactButton icon="person-outline" label="Call Friend" onPress={onCallFriend} />
      </View>
    </Card>
  );
}
