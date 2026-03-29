import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FormShell from "./FormShell";

function SmallField({ label, value, onChangeText }) {
  return (
    <View className="flex-1">
      <Text className="mb-2 text-[14px] font-medium text-[#252525]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
        placeholder={label}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}

export default function EditMedicationForm({
  visible,
  values,
  onChange,
  onClose,
  onSave,
  onAddTime,
}) {
  return (
    <FormShell visible={visible} onClose={onClose} title="Edit Medication" compact>
      <Text className="mb-2 text-[14px] font-medium text-[#252525]">Medication Name</Text>
      <TextInput
        value={values.name}
        onChangeText={(value) => onChange("name", value)}
        className="mb-4 h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
      />

      <Text className="mb-2 text-[14px] font-medium text-[#252525]">Dosage</Text>
      <TextInput
        value={values.dosage}
        onChangeText={(value) => onChange("dosage", value)}
        className="mb-4 h-12 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
      />

      <Text className="mb-2 text-[14px] font-medium text-[#252525]">Reminder Times</Text>
      <View className="mb-4 flex-row items-center gap-3">
        {values.reminderTimes.map((time, index) => (
          <TextInput
            key={`${time}-${index}`}
            value={time}
            onChangeText={(value) => onChange("reminderTime", value, index)}
            className="h-11 flex-1 rounded-[12px] bg-[#F2F4F7] px-4 text-[15px] text-[#6B7280]"
          />
        ))}
        <TouchableOpacity
          onPress={onAddTime}
          activeOpacity={0.85}
          className="h-11 items-center justify-center rounded-[10px] bg-[#FF8A57] px-3"
        >
          <Text className="text-[13px] font-semibold text-white">Add Time</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-5 flex-row gap-3">
        <SmallField label="Start Date" value={values.startDate} onChangeText={(value) => onChange("startDate", value)} />
        <SmallField label="End Date" value={values.endDate} onChangeText={(value) => onChange("endDate", value)} />
      </View>

      <TouchableOpacity
        onPress={onSave}
        activeOpacity={0.85}
        className="h-12 items-center justify-center rounded-[12px] bg-[#0C7A67]"
      >
        <Text className="text-[16px] font-semibold text-white">Save Reminder</Text>
      </TouchableOpacity>
    </FormShell>
  );
}
