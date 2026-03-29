import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FormShell({
  visible,
  onClose,
  title,
  children,
  compact = false,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/35 px-4">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View
          className={`w-full overflow-hidden rounded-[18px] border border-[#D5E8E2] bg-white ${
            compact ? "max-w-[400px]" : "max-h-[88%] max-w-[420px]"
          }`}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 18 },
            shadowOpacity: 0.18,
            shadowRadius: 24,
          }}
        >
          <View className="flex-row items-center justify-between px-4 pb-2 pt-5">
            <View className="flex-1 items-center">
              <Text className="text-[18px] font-bold text-[#1F2625]">{title}</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="absolute right-4 top-4 h-8 w-8 items-center justify-center rounded-full"
            >
              <Ionicons name="close" size={20} color="#707070" />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 20, paddingTop: 8 }}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
