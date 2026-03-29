import { Text, TextInput, TouchableOpacity, View } from "react-native";
import FormShell from "./FormShell";

function VitalsField({ label, value, onChangeText }) {
  return (
    <View className="mb-5">
      <Text className="mb-2 text-[14px] font-medium text-[#9A9A9A]">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#B5B5B5"
        className="h-12 rounded-[14px] border border-[#1F2625] px-4 text-[14px] text-[#1F2625]"
      />
    </View>
  );
}

export default function UpdateVitalsForm({ visible, values, onChange, onClose, onSave }) {
  return (
    <FormShell visible={visible} onClose={onClose} title="Antenatal Update">
      <View className="pt-4">
        <VitalsField
          label="Blood pressure"
          value={values.bloodPressure}
          onChangeText={(value) => onChange("bloodPressure", value)}
        />
        <VitalsField
          label="Temperature"
          value={values.temperature}
          onChangeText={(value) => onChange("temperature", value)}
        />
        <VitalsField
          label="Weight"
          value={values.weight}
          onChangeText={(value) => onChange("weight", value)}
        />
        <VitalsField
          label="Blood level"
          value={values.bloodLevel}
          onChangeText={(value) => onChange("bloodLevel", value)}
        />
      </View>
      <TouchableOpacity
        onPress={onSave}
        activeOpacity={0.85}
        className="mt-64 h-12 items-center justify-center rounded-[16px] bg-[#0C7A67]"
      >
        <Text className="text-[16px] font-semibold text-white">Proceed</Text>
      </TouchableOpacity>
    </FormShell>
  );
}
