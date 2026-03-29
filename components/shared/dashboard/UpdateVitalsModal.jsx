import { View } from "react-native";
import { DashboardModal, Field, PillButton } from "./shared";

export default function UpdateVitalsModal({
  visible,
  values,
  onChange,
  onClose,
  onSave,
}) {
  return (
    <DashboardModal
      visible={visible}
      onClose={onClose}
      title="Antenatal Update"
      subtitle="Update your recent vitals here. This is UI only for now."
    >
      <Field label="Blood Pressure" value={values.bloodPressure} onChangeText={(value) => onChange("bloodPressure", value)} placeholder="120/80 mmHg" />
      <Field label="Weight" value={values.weight} onChangeText={(value) => onChange("weight", value)} placeholder="65 kg" />
      <Field label="Temperature" value={values.temperature} onChangeText={(value) => onChange("temperature", value)} placeholder="36.8°C" />
      <Field label="Blood Level" value={values.bloodLevel} onChangeText={(value) => onChange("bloodLevel", value)} placeholder="12.5 g/dl" />
      <View className="mt-2">
        <PillButton label="Proceed" onPress={onSave} />
      </View>
    </DashboardModal>
  );
}
