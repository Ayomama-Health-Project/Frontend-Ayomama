import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function AddMealPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    category: "Breakfast",
    meal: "Plantain and eggs",
    weight: "100",
  });

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 12}
        >
          <View className="flex-1 bg-black/20 px-3">
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingVertical: 24 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View
                className="w-full max-w-[410px] self-center rounded-[14px] border border-[#D6D6D6] bg-white px-5 py-5"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.18,
                  shadowRadius: 18,
                }}
              >
                <View className="mb-4 flex-row items-center justify-between">
                  <View className="w-6" />
                  <Text className="text-[18px] font-bold text-[#151515]">Add new meal</Text>
                  <TouchableOpacity onPress={() => router.back()} activeOpacity={0.82}>
                    <Ionicons name="close" size={20} color="#707070" />
                  </TouchableOpacity>
                </View>

                <Text className="mb-2 text-[14px] font-medium text-[#252525]">Category</Text>
                <View className="mb-4 flex-row items-center rounded-[12px] bg-[#F2F4F7] px-4">
                  <TextInput
                    value={form.category}
                    onChangeText={(value) => setField("category", value)}
                    className="h-12 flex-1 text-[15px] text-[#6B7280]"
                  />
                  <Ionicons name="chevron-down" size={18} color="#1F2625" />
                </View>

                <Text className="mb-2 text-[14px] font-medium text-[#252525]">Meal</Text>
                <TextInput
                  value={form.meal}
                  onChangeText={(value) => setField("meal", value)}
                  className="mb-4 h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
                />

                <Text className="mb-2 text-[14px] font-medium text-[#252525]">Weight (g)</Text>
                <TextInput
                  value={form.weight}
                  onChangeText={(value) => setField("weight", value)}
                  keyboardType="numeric"
                  className="mb-4 h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
                />

                <TouchableOpacity
                  onPress={() => {
                    Toast.show({ type: "success", text1: "Meal added", text2: "Saved locally for now.", position: "top" });
                    router.back();
                  }}
                  activeOpacity={0.85}
                  className="mt-2 h-12 items-center justify-center rounded-[12px] bg-[#0C7A67]"
                >
                  <Text className="text-[16px] font-semibold text-white">Add</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
