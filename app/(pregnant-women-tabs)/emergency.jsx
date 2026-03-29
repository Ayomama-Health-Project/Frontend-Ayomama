import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import EmergencyHero from "../../components/shared/emergency/EmergencyHero";
import {
  FAMILY_CONTACTS,
  FRIEND_CONTACTS,
  HOSPITAL_CONTACTS,
  HOSPITALS,
} from "../../components/shared/emergency/data";
import { EmergencySheet, SheetListItem } from "../../components/shared/visit/shared";

const Emergency = () => {
  const insets = useSafeAreaInsets();
  const [tapCount, setTapCount] = useState(0);
  const [sheet, setSheet] = useState(null);

  const handleTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);

    if (nextCount >= 3) {
      Toast.show({
        type: "success",
        text1: "Emergency Alert",
        text2: "Message sent to your contacts!",
        position: "top",
      });
      setTapCount(0);
    }
  };

  const handleAction = (title, subtitle) => {
    Toast.show({ type: "info", text1: title, text2: subtitle, position: "top" });
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <EmergencyHero
          tapCount={tapCount}
          onTap={handleTap}
          onOpenHospitals={() => setSheet("hospitals")}
          onCallHospital={() => setSheet("call-hospital")}
          onCallFamily={() => setSheet("family")}
          onCallFriend={() => setSheet("friend")}
        />
      </ScrollView>

      <EmergencySheet visible={sheet === "hospitals"} onClose={() => setSheet(null)} title="Hospitals near you" icon="business-outline">
        {HOSPITALS.map((item, index) => (
          <SheetListItem
            key={`${item}-${index}`}
            title={item}
            actionLabel="Direction"
            icon="navigate"
            onPress={() => handleAction("Directions", `Opening route for ${item}`)}
          />
        ))}
      </EmergencySheet>

      <EmergencySheet visible={sheet === "call-hospital"} onClose={() => setSheet(null)} title="Call Hospital" icon="business-outline">
        {HOSPITAL_CONTACTS.map((item) => (
          <SheetListItem
            key={item.id}
            title={item.name}
            subtitle={item.phone}
            icon="call"
            onPress={() => handleAction("Calling hospital", item.name)}
          />
        ))}
      </EmergencySheet>

      <EmergencySheet visible={sheet === "friend"} onClose={() => setSheet(null)} title="Call Friend" icon="person-outline">
        {FRIEND_CONTACTS.map((item) => (
          <SheetListItem
            key={item.id}
            title={item.name}
            subtitle={item.phone}
            icon="call"
            onPress={() => handleAction("Calling friend", item.name)}
          />
        ))}
      </EmergencySheet>

      <EmergencySheet visible={sheet === "family"} onClose={() => setSheet(null)} title="Family" icon="people-outline">
        {FAMILY_CONTACTS.map((item) => (
          <SheetListItem
            key={item.id}
            title={item.name}
            subtitle={item.phone}
            icon="call"
            onPress={() => handleAction("Calling family", item.name)}
          />
        ))}
      </EmergencySheet>
    </SafeAreaView>
  );
};

export default Emergency;
