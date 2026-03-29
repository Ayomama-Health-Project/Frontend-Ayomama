import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export function SectionTitle({ icon, title, rightLabel, onPressRight }) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <View className="flex-row items-center">
        {icon ? (
          <View className="mr-2 h-6 w-6 items-center justify-center rounded-full bg-[#E9F7F3]">
            <Ionicons name={icon} size={14} color="#006D5B" />
          </View>
        ) : null}
        <Text className="text-[18px] font-bold text-[#223130]">{title}</Text>
      </View>
      {rightLabel ? (
        <TouchableOpacity onPress={onPressRight} activeOpacity={0.8}>
          <Text className="text-[12px] font-semibold text-[#006D5B]">{rightLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function Card({ children, className = "" }) {
  return (
    <View
      className={`rounded-[28px] border border-[#00D2B3] bg-white p-4 ${className}`}
      style={{
        shadowColor: "#0D1B1E",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 18,
      }}
    >
      {children}
    </View>
  );
}

export function PillButton({ label, onPress, tone = "primary" }) {
  const filled = tone === "primary";
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`h-10 items-center justify-center rounded-full px-4 ${
        filled ? "bg-[#0B7A66]" : "border border-[#0B7A66] bg-white"
      }`}
    >
      <Text className={`text-[12px] font-semibold ${filled ? "text-white" : "text-[#21413B]"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function DashboardModal({ visible, title, subtitle, children, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/30" onPress={onClose} />
      <View className="absolute bottom-0 left-0 right-0 rounded-t-[32px] bg-white px-5 pb-8 pt-5">
        <View className="mb-4 flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-[22px] font-bold text-[#223130]">{title}</Text>
            {subtitle ? (
              <Text className="mt-1 text-[13px] leading-5 text-[#6A7775]">{subtitle}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            className="h-10 w-10 items-center justify-center rounded-full bg-[#F2F6F5]"
          >
            <Ionicons name="close" size={18} color="#223130" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </Modal>
  );
}

export function Field({ label, value, onChangeText, placeholder, keyboardType = "default" }) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[13px] font-semibold text-[#31413E]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#9AA8A5"
        className="h-12 rounded-2xl border border-[#D8E4E0] bg-[#FBFDFC] px-4 text-[14px] text-[#223130]"
      />
    </View>
  );
}
