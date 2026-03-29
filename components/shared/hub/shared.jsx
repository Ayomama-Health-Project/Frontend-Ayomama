import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../utils/translator";

export function HubBackground({ children }) {
  return (
    <View className="flex-1 bg-[#F7F5F1]">
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: "#F7F5F1",
        }}
      />
      <View
        className="absolute inset-0"
        style={{
          backgroundColor: "transparent",
          shadowColor: "#000",
        }}
      />
      {children}
    </View>
  );
}

export function BackHeader({ title, onBack, right = null, accentTitle = false }) {
  return (
    <View className="flex-row items-center justify-between px-5 pb-4 pt-3">
      <TouchableOpacity onPress={onBack} activeOpacity={0.82} className="h-10 w-10 items-center justify-center">
        <Ionicons name="arrow-back" size={23} color="#293231" />
      </TouchableOpacity>
      <Text className={`text-[18px] font-bold ${accentTitle ? "text-[#FF7F50]" : "text-[#293231]"}`}>
        {title}
      </Text>
      <View className="min-w-[40px] items-end">{right || <View className="w-10" />}</View>
    </View>
  );
}

export function CommunityTabs({ active, onChange }) {
  const items = [
    { key: "community", label: useTranslation("Community"), icon: "people" },
    { key: "messages", label: useTranslation("Messages"), icon: "chatbox-ellipses" },
    { key: "workers", label: useTranslation("Health Workers"), icon: "mic" },
    { key: "blogs", label: useTranslation("Blogs"), icon: "briefcase" },
  ];

  return (
    <View className="flex-row flex-wrap items-center gap-2">
      {items.map((item) => {
        const selected = active === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => onChange(item.key)}
            activeOpacity={0.82}
            className={`flex-row items-center rounded-[12px] px-3 py-2 ${selected ? "border border-[#00D2B3] bg-[#EAF9F5]" : ""}`}
          >
            <Text className="mr-1 text-[12px] font-medium text-[#111]">{item.label}</Text>
            <Ionicons name={item.icon} size={12} color="#111" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
