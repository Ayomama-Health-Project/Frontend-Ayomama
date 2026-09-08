import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { motherApi } from "../../../services/motherApi";

export default function NewEntryPage() {
  const router = useRouter();
  const [entry, setEntry] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 12}
      >
      <ScrollView className="flex-1 px-6 pt-10" keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <Text className="text-[24px] font-bold text-[#151515]">New Entry</Text>
        <View className="mt-10 rounded-[24px] bg-[#E8F8F4] p-3" style={{ minHeight: 420 }}>
          <TextInput
            multiline
            value={entry}
            onChangeText={setEntry}
            className="rounded-[20px] bg-white px-4 py-4 text-[15px] leading-7 text-[#243533]"
            style={{ minHeight: 96, textAlignVertical: "top" }}
          />
        </View>
        <View className="mb-4 mt-auto flex-row gap-4 pt-8">
          <TouchableOpacity
            onPress={() => setEntry("")}
            activeOpacity={0.85}
            className="h-12 flex-1 items-center justify-center rounded-[14px] border border-[#0C7A67] bg-white"
          >
            <Text className="text-[16px] font-semibold text-[#2E3937]">Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              if (!entry.trim()) {
                Toast.show({ type: "info", text1: "Write something first", text2: "Add a few thoughts before saving your journal entry.", position: "top" });
                return;
              }
              try {
                setIsSaving(true);
                const data = await motherApi.fetchDashboardSummary();
                const existingEntries = data.summary?.journalEntries || [];
                await motherApi.updateDashboardSummary({
                  journalEntries: [
                    {
                      body: entry.trim(),
                      meta: "Just now",
                      createdAtLabel: "Today",
                    },
                    ...existingEntries,
                  ],
                });
                Toast.show({ type: "success", text1: "Note saved", text2: "Your journal entry has been added to the dashboard.", position: "top" });
                router.back();
              } catch (_error) {
                Toast.show({ type: "error", text1: "Save failed", text2: "We could not save your journal entry right now.", position: "top" });
              } finally {
                setIsSaving(false);
              }
            }}
            disabled={isSaving}
            activeOpacity={0.85}
            className={`h-12 flex-1 items-center justify-center rounded-[14px] ${isSaving ? "bg-[#6BAFA2]" : "bg-[#0C7A67]"}`}
          >
            <Text className="text-[16px] font-semibold text-white">{isSaving ? "Saving..." : "Save Note"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
