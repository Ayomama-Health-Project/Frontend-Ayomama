import { useState } from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import EmergencyHero from "../../components/shared/emergency/EmergencyHero";
import {
  FAMILY_CONTACTS,
  FRIEND_CONTACTS,
  HOSPITAL_CONTACTS,
} from "../../components/shared/emergency/data";
import { EmergencySheet, SheetListItem } from "../../components/shared/visit/shared";
import { motherApi } from "../../services/motherApi";
import { useTranslation } from "../../utils/translator";

const Emergency = () => {
  const [tapCount, setTapCount] = useState(0);
  const [sheet, setSheet] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const hospitalsTitle = useTranslation("Hospitals near you");
  const noHospitalsText = useTranslation("No nearby hospitals found");
  const noHospitalsHintText = useTranslation("Try again in a moment or move to a location with stronger location accuracy.");
  const callHospitalTitle = useTranslation("Call Hospital");
  const callFriendTitle = useTranslation("Call Friend");
  const familyTitle = useTranslation("Family");

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

  const openHospitals = async () => {
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Location needed",
          text2: "Please allow location access to find nearby hospitals.",
          position: "top",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const data = await motherApi.fetchNearbyHospitals({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setHospitals(data);
      setSheet("hospitals");
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Hospitals unavailable",
        text2: "We could not load nearby hospitals right now.",
        position: "top",
      });
    }
  };

  const callPhoneNumber = async (phoneNumber, label) => {
    if (!phoneNumber) {
      Toast.show({
        type: "info",
        text1: "Phone unavailable",
        text2: `${label} does not have a saved phone number yet.`,
        position: "top",
      });
      return;
    }

    try {
      await Linking.openURL(`tel:${phoneNumber}`);
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Call failed",
        text2: "We could not open the dialer right now.",
        position: "top",
      });
    }
  };

  const openMapDirections = async (item) => {
    const query = item?.latitude && item?.longitude
      ? `${item.latitude},${item.longitude}`
      : item?.address || item?.name;

    try {
      await Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Directions unavailable",
        text2: "We could not open maps right now.",
        position: "top",
      });
    }
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
          onOpenHospitals={openHospitals}
          onCallHospital={() => setSheet("call-hospital")}
          onCallFamily={() => setSheet("family")}
          onCallFriend={() => setSheet("friend")}
        />
      </ScrollView>

      <EmergencySheet visible={sheet === "hospitals"} onClose={() => setSheet(null)} title={hospitalsTitle} icon="business-outline">
        {hospitals.length === 0 ? (
          <View className="rounded-[18px] bg-[#F6FBF9] px-4 py-5">
            <Text className="text-[15px] font-semibold text-[#293231]">{noHospitalsText}</Text>
            <Text className="mt-2 text-[14px] leading-6 text-[#66706E]">{noHospitalsHintText}</Text>
          </View>
        ) : (
          hospitals.map((item, index) => (
            <SheetListItem
              key={`${item.id || item.name}-${index}`}
              title={item.name}
              subtitle={item.phone ? `${item.address} · ${item.phone}` : item.address}
              actionLabel={item.phone ? "Call" : "Direction"}
              icon={item.phone ? "call" : "navigate"}
              onPress={() => (item.phone ? callPhoneNumber(item.phone, item.name) : openMapDirections(item))}
            />
          ))
        )}
      </EmergencySheet>

      <EmergencySheet visible={sheet === "call-hospital"} onClose={() => setSheet(null)} title={callHospitalTitle} icon="business-outline">
        {(hospitals.length ? hospitals : HOSPITAL_CONTACTS).map((item) => (
          <SheetListItem
            key={item.id}
            title={item.name}
            subtitle={item.phone || item.address}
            icon="call"
            onPress={() => callPhoneNumber(item.phone, item.name)}
          />
        ))}
      </EmergencySheet>

      <EmergencySheet visible={sheet === "friend"} onClose={() => setSheet(null)} title={callFriendTitle} icon="person-outline">
        {FRIEND_CONTACTS.map((item) => (
          <SheetListItem
            key={item.id}
            title={item.name}
            subtitle={item.phone}
            icon="call"
            onPress={() => callPhoneNumber(item.phone, item.name)}
          />
        ))}
      </EmergencySheet>

      <EmergencySheet visible={sheet === "family"} onClose={() => setSheet(null)} title={familyTitle} icon="people-outline">
        {FAMILY_CONTACTS.map((item) => (
          <SheetListItem
            key={item.id}
            title={item.name}
            subtitle={item.phone}
            icon="call"
            onPress={() => callPhoneNumber(item.phone, item.name)}
          />
        ))}
      </EmergencySheet>
    </SafeAreaView>
  );
};

export default Emergency;
