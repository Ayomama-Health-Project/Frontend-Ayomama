import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import PageHeader from "../../../components/pregnant-mother/forms/PageHeader";
import { motherApi } from "../../../services/motherApi";

function Field({ label, value, onChangeText }) {
  const keyboardType = label === "Blood pressure" ? "numbers-and-punctuation" : "decimal-pad";

  return (
    <View className="mb-6">
      <Text className="mb-2 text-[14px] font-medium text-[#A1A1A1]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    motherApi.fetchDashboardSummary().then((data) => {
      if (data.summary?.vitalsOverview) {
        setForm({
          bloodPressure: data.summary.vitalsOverview.bloodPressure || "",
          temperature: data.summary.vitalsOverview.temperature || "",
          weight: data.summary.vitalsOverview.weight || "",
          bloodLevel: data.summary.vitalsOverview.bloodLevel || "",
        });
      }
    }).catch(() => null);
  }, []);

  const updateField = (field, value) => {
    const normalized =
      field === "bloodPressure"
        ? value.replace(/[^0-9/]/g, "")
        : value.replace(/[^0-9.]/g, "");
    setForm((prev) => ({ ...prev, [field]: normalized }));
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
                onPress={async () => {
                  try {
                    setIsSaving(true);
                    await motherApi.updateDashboardSummary({
                      vitalsOverview: form,
                    });
                    Toast.show({ type: "success", text1: "Vitals updated", text2: "Your dashboard has been refreshed with the latest values.", position: "top" });
                    router.back();
                  } catch (_error) {
                    Toast.show({ type: "error", text1: "Update failed", text2: "We could not save your vitals right now.", position: "top" });
                  } finally {
                    setIsSaving(false);
                  }
                }}
                disabled={isSaving}
                activeOpacity={0.85}
                className={`mb-4 h-12 items-center justify-center rounded-[16px] ${isSaving ? "bg-[#6BAFA2]" : "bg-[#0C7A67]"}`}
              >
                <Text className="text-[16px] font-semibold text-white">{isSaving ? "Saving..." : "Proceed"}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
