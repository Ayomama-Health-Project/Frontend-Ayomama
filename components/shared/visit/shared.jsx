import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../utils/translator";

export function VisitHeader({ name, onBack, onOpenNotifications }) {
  const helloText = useTranslation("Hello,");
  return (
    <View className="flex-row items-center justify-between px-4 pb-5 pt-3">
      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.82}
        className="h-10 w-10 items-center justify-center rounded-full bg-white/90"
      >
        <Ionicons name="arrow-back" size={22} color="#293231" />
      </TouchableOpacity>
      <View className="items-center">
        <Text className="text-[15px] text-[#9A9A9A]">{helloText}</Text>
        <Text className="text-[28px] font-bold text-[#293231]">{name}</Text>
      </View>
      <TouchableOpacity onPress={onOpenNotifications} activeOpacity={0.82}>
        <Ionicons name="notifications" size={20} color="#293231" />
      </TouchableOpacity>
    </View>
  );
}

export function VisitActionButton({ label, onPress, tone = "primary" }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`h-9 items-center justify-center rounded-[12px] px-4 ${
        tone === "primary" ? "bg-white" : "border border-[#00D2B3] bg-white"
      }`}
    >
      <Text className="text-[13px] font-medium text-[#293231]">{label}</Text>
    </TouchableOpacity>
  );
}

export function EmergencySheet({ visible, onClose, title, icon, children }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/35">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="rounded-t-[34px] bg-white px-5 pb-8 pt-5">
          <View className="mb-5 h-1.5 w-14 self-center rounded-full bg-[#D9D9D9]" />
          <View className="mb-5 flex-row items-center">
            <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-[#FFD5C8]">
              <Ionicons name={icon} size={18} color="#FF8A57" />
            </View>
            <Text className="text-[18px] font-bold text-[#293231]">{title}</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export function SheetListItem({ title, subtitle, icon = "call", onPress, actionLabel = null }) {
  const translatedActionLabel = actionLabel ? useTranslation(actionLabel) : null;
  return (
    <View className="mb-3 rounded-[22px] bg-[#F7F2EF] p-[1px]">
      <View className="flex-row items-center justify-between rounded-[21px] bg-white px-4 py-4">
        <View className="flex-1 pr-3">
          <Text className="text-[16px] font-medium text-[#293231]">{title}</Text>
          {subtitle ? <Text className="mt-2 text-[14px] text-[#4B5553]">{subtitle}</Text> : null}
        </View>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.82}
          className="flex-row items-center rounded-[4px] bg-white px-2 py-1"
        >
          {actionLabel ? (
            <Text className="mr-2 text-[15px] font-medium text-[#293231]">{translatedActionLabel}</Text>
          ) : null}
          <View className="h-7 w-7 items-center justify-center rounded-[6px] border border-[#00D2B3]">
            <Ionicons name={icon} size={15} color="#00AFA0" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
