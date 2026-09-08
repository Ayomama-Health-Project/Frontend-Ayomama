import { useState } from "react";
import { View } from "react-native";
import { DashboardModal, Field, PillButton } from "./shared";

export default function JournalEntryModal({ visible, onClose, onAddEntry }) {
  const [entry, setEntry] = useState("");

  const submit = () => {
    if (!entry.trim()) return;
    onAddEntry(entry.trim());
    setEntry("");
  };

  return (
    <DashboardModal
      visible={visible}
      onClose={onClose}
      title="Add new entry"
      subtitle="Capture a small memory, feeling, or reflection from today."
    >
      <Field label="Journal entry" value={entry} onChangeText={setEntry} placeholder="Today baby kicked right after lunch..." />
      <View className="mt-2">
        <PillButton label="Save entry" onPress={submit} />
      </View>
    </DashboardModal>
  );
}
