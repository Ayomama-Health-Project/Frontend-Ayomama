import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import PageHeader from "../../../components/pregnant-mother/forms/PageHeader";
import { motherApi } from "../../../services/motherApi";

function formatTimeLabel(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();
}

function formatDateLabel(date) {
  return new Date(date).toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function parseTimeLabel(label) {
  const parsed = new Date();
  const [timePart = "08:00", meridian = "am"] = String(label || "08:00 am").split(" ");
  const [hoursRaw, minutesRaw] = timePart.split(":").map(Number);
  let hours = Number.isFinite(hoursRaw) ? hoursRaw : 8;
  const minutes = Number.isFinite(minutesRaw) ? minutesRaw : 0;

  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;

  parsed.setHours(hours, minutes, 0, 0);
  return parsed;
}

export default function EditMedicationPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "Amoxicillin 500mg",
    dosage: "Twice Daily",
    reminderTimes: ["08:00 am", "08:00 pm"],
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [pickerState, setPickerState] = useState(null);

  useEffect(() => {
    motherApi
      .fetchDashboardSummary()
      .then((data) => {
        const reminderItems = data.summary?.medicationReminders || [];
        if (!reminderItems.length) return;

        const firstReminder = reminderItems[0];
        const timeLabels = reminderItems.map((item) => item.timeLabel).filter(Boolean);

        setForm((prev) => ({
          ...prev,
          name: firstReminder.title || prev.name,
          dosage: firstReminder.dosage || prev.dosage,
          reminderTimes: timeLabels.length ? timeLabels : prev.reminderTimes,
          startDate: firstReminder.startDate ? new Date(firstReminder.startDate) : prev.startDate,
          endDate: firstReminder.endDate ? new Date(firstReminder.endDate) : prev.endDate,
        }));
      })
      .catch(() => null);
  }, []);

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

  const openPicker = (mode, field, index = null) => {
    const value =
      field === "reminderTime"
        ? parseTimeLabel(form.reminderTimes[index] || "08:00 am")
        : form[field];

    setPickerState({ mode, field, index, value });
  };

  const handlePickerChange = (_event, selectedValue) => {
    if (!pickerState) return;

    if (!selectedValue) {
      setPickerState(null);
      return;
    }

    if (pickerState.field === "reminderTime") {
      setField("reminderTime", formatTimeLabel(selectedValue), pickerState.index);
    } else {
      setField(pickerState.field, selectedValue);
    }

    if (Platform.OS !== "ios") {
      setPickerState(null);
    }
  };

  const closePicker = () => setPickerState(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const data = await motherApi.fetchDashboardSummary();
      const existing = data.summary?.medicationReminders || [];
      const nextReminders = form.reminderTimes.map((timeLabel, index) => ({
        ...(existing[index] || {}),
        title: form.name,
        dosage: form.dosage,
        timeLabel,
        startDate: form.startDate,
        endDate: form.endDate,
        enabled: true,
      }));

      await motherApi.updateDashboardSummary({
        medicationReminders: nextReminders,
      });

      Toast.show({
        type: "success",
        text1: "Reminder saved",
        text2: "Medication settings updated successfully.",
        position: "top",
      });
      router.back();
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Save failed",
        text2: "We could not save your medication reminder right now.",
        position: "top",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 12}
        >
          <PageHeader
            title="Edit Medication"
            onBack={() => router.back()}
            rightIcon="medical-outline"
          />
          <ScrollView
            className="flex-1 px-5"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
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
                <TouchableOpacity
                  key={`${time}-${index}`}
                  activeOpacity={0.85}
                  onPress={() => openPicker("time", "reminderTime", index)}
                  className="h-11 flex-1 justify-center rounded-[12px] bg-[#F2F4F7] px-4"
                >
                  <Text className="text-[15px] text-[#6B7280]">{time}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() =>
                  setForm((prev) => ({
                    ...prev,
                    reminderTimes: [...prev.reminderTimes, "09:00 pm"],
                  }))
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
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => openPicker("date", "startDate")}
                  className="h-12 justify-center rounded-[12px] bg-[#F2F4F7] px-4"
                >
                  <Text className="text-[15px] text-[#6B7280]">{formatDateLabel(form.startDate)}</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-[14px] font-medium text-[#252525]">End Date</Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => openPicker("date", "endDate")}
                  className="h-12 justify-center rounded-[12px] bg-[#F2F4F7] px-4"
                >
                  <Text className="text-[15px] text-[#6B7280]">{formatDateLabel(form.endDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-auto pt-8">
              <TouchableOpacity
                onPress={handleSave}
                disabled={isSaving}
                activeOpacity={0.85}
                className={`mb-4 h-12 items-center justify-center rounded-[12px] ${isSaving ? "bg-[#6BAFA2]" : "bg-[#0C7A67]"}`}
              >
                <Text className="text-[16px] font-semibold text-white">
                  {isSaving ? "Saving..." : "Save Reminder"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {pickerState ? (
            <View className="border-t border-[#E5ECEA] bg-white px-4 pb-4">
              {Platform.OS === "ios" ? (
                <View className="flex-row justify-end py-2">
                  <TouchableOpacity activeOpacity={0.85} onPress={closePicker}>
                    <Text className="text-[15px] font-semibold text-[#0C7A67]">Done</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <DateTimePicker
                value={pickerState.value || new Date()}
                mode={pickerState.mode}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handlePickerChange}
              />
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
