import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import PageHeader from "../../../components/pregnant-mother/forms/PageHeader";

function Field({ label, value, onChangeText }) {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-[14px] font-medium text-[#A1A1A1]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="h-12 rounded-[14px] border border-[#1F2625] px-4 text-[14px] text-[#1F2625]"
      />
    </View>
  );
}

export default function UpdateVitalsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    bloodPressure: "",
    temperature: "",
    weight: "",
    bloodLevel: "",
  });

  const updateField = (field, value) => {
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
          <PageHeader title="Antenatal Update" onBack={() => router.back()} rightIcon="fitness" />
          <ScrollView
            className="flex-1 px-5"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Field label="Blood pressure" value={form.bloodPressure} onChangeText={(value) => updateField("bloodPressure", value)} />
            <Field label="Temperature" value={form.temperature} onChangeText={(value) => updateField("temperature", value)} />
            <Field label="Weight" value={form.weight} onChangeText={(value) => updateField("weight", value)} />
            <Field label="Blood level" value={form.bloodLevel} onChangeText={(value) => updateField("bloodLevel", value)} />
            <View className="mt-auto pt-8">
              <TouchableOpacity
                onPress={() => {
                  Toast.show({ type: "success", text1: "Vitals updated", text2: "Saved locally for now.", position: "top" });
                  router.back();
                }}
                activeOpacity={0.85}
                className="mb-4 h-12 items-center justify-center rounded-[16px] bg-[#0C7A67]"
              >
                <Text className="text-[16px] font-semibold text-white">Proceed</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
