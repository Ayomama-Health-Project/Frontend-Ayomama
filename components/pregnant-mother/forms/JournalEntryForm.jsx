import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FormShell from "./FormShell";

export default function JournalEntryForm({ visible, entry, onChangeEntry, onClose, onDelete, onSave }) {
  return (
    <FormShell visible={visible} onClose={onClose} title="New Entry">
      <View className="rounded-[24px] bg-[#E8F8F4] p-3" style={{ minHeight: 620 }}>
        <TextInput
          multiline
          value={entry}
          onChangeText={onChangeEntry}
          placeholder="Today, my baby smiled for the first time 💕"
          placeholderTextColor="#4B5563"
          className="rounded-[20px] bg-white px-4 py-4 text-[15px] leading-7 text-[#243533]"
          style={{ minHeight: 96, textAlignVertical: "top" }}
        />
      </View>
      <View className="mt-6 flex-row gap-4">
        <TouchableOpacity
          onPress={onDelete}
          activeOpacity={0.85}
          className="h-12 flex-1 items-center justify-center rounded-[14px] border border-[#0C7A67] bg-white"
        >
          <Text className="text-[16px] font-semibold text-[#2E3937]">Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSave}
          activeOpacity={0.85}
          className="h-12 flex-1 items-center justify-center rounded-[14px] bg-[#0C7A67]"
        >
          <Text className="text-[16px] font-semibold text-white">Save Note</Text>
        </TouchableOpacity>
      </View>
    </FormShell>
  );
}
