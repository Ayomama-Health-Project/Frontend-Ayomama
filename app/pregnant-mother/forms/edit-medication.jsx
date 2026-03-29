import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import PageHeader from "../../../components/pregnant-mother/forms/PageHeader";

export default function EditMedicationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Amoxicilin 500mg",
    dosage: "Twice Daily",
    reminderTimes: ["08:00 am", "08:00 pm"],
    startDate: "27/11/2025",
    endDate: "27/12/2025",
  });

  const setField = (field, value, index) => {
    if (field === "reminderTime") {
      setForm((prev) => ({
        ...prev,
        reminderTimes: prev.reminderTimes.map((item, currentIndex) =>
          currentIndex === index ? value : item,
        ),
      }));
      return;
    }
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
      <PageHeader title="Edit Medication" onBack={() => router.back()} rightIcon="medical-outline" />
      <ScrollView className="flex-1 px-5" keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} showsVerticalScrollIndicator={false}>

        {[
          ["Medication Name", "name"],
          ["Dosage", "dosage"],
        ].map(([label, key]) => (
          <View key={key} className="mb-4">
            <Text className="mb-2 text-[14px] font-medium text-[#252525]">{label}</Text>
            <TextInput
              value={form[key]}
              onChangeText={(value) => setField(key, value)}
              className="h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
            />
          </View>
        ))}

        <Text className="mb-2 text-[14px] font-medium text-[#252525]">Reminder Times</Text>
        <View className="mb-4 flex-row items-center gap-3">
          {form.reminderTimes.map((time, index) => (
            <TextInput
              key={`${time}-${index}`}
              value={time}
              onChangeText={(value) => setField("reminderTime", value, index)}
              className="h-11 flex-1 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
            />
          ))}
          <TouchableOpacity
            onPress={() =>
              setForm((prev) => ({ ...prev, reminderTimes: [...prev.reminderTimes, "09:00 pm"] }))
            }
            activeOpacity={0.85}
            className="h-11 items-center justify-center rounded-[10px] bg-[#FF8A57] px-3"
          >
            <Text className="text-[13px] font-semibold text-white">Add Time</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-5 flex-row gap-3">
          <View className="flex-1">
            <Text className="mb-2 text-[14px] font-medium text-[#252525]">Start Date</Text>
            <TextInput
              value={form.startDate}
              onChangeText={(value) => setField("startDate", value)}
              className="h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
            />
          </View>
          <View className="flex-1">
            <Text className="mb-2 text-[14px] font-medium text-[#252525]">End Date</Text>
            <TextInput
              value={form.endDate}
              onChangeText={(value) => setField("endDate", value)}
              className="h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
            />
          </View>
        </View>

        <View className="mt-auto pt-8">
          <TouchableOpacity
            onPress={() => {
              Toast.show({ type: "success", text1: "Reminder saved", text2: "Medication settings saved locally.", position: "top" });
              router.back();
            }}
            activeOpacity={0.85}
            className="mb-4 h-12 items-center justify-center rounded-[12px] bg-[#0C7A67]"
          >
            <Text className="text-[16px] font-semibold text-white">Save Reminder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
