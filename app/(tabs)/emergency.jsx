import * as Location from "expo-location";
import * as SMS from "expo-sms";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import useAuthStore from "../../store/useAuthStore";
import useEmergency from "../../store/useEmergeency";
import { useTranslation } from "../../utils/translator";

const Emergency = () => {
  const [tapCount, setTapCount] = useState(0);
  const [showHospitals, setShowHospitals] = useState(false);
  const [coords, setCoords] = useState(null);
  const [noHospitalMessage, setNoHospitalMessage] = useState(false);

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const { hospitals, loading, fetchNearbyHospitals } = useEmergency();

  const iconBg = "#FDD8D5";
  const iconColor = "#E67A73";

  /** ------------------------------
   * MAP BACKEND CONTACT FORMAT
   * ------------------------------ */
  const emergencyContacts = user?.emergencyContact || [];

  const mappedContacts = emergencyContacts.map((c) => ({
    name: c.name,
    phone: c.phone,
    type: ["mother", "father", "sister", "brother", "uncle", "aunt"].includes(
      c.relationship?.toLowerCase()
    )
      ? "family"
      : "friend",
  }));

  const groupedContacts = {
    family: mappedContacts.filter((c) => c.type === "family"),
    friend: mappedContacts.filter((c) => c.type === "friend"),
  };

  /** ------------------------------
   *   LOCATION PERMISSION
   * ------------------------------ */
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Allow location access to find nearby hospitals.",
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  /** ------------------------------
   *   TRANSLATIONS
   * ------------------------------ */
  const viewHospitalsText = useTranslation("View hospitals near you");
  const emergencyTitleText = useTranslation("Emergency Help Needed?");
  const emergencySubtitleText = useTranslation(
    "We are here to help with everything"
  );
  const tapInstructionText = useTranslation(
    "Tap 3 times to send message to all your emergency contact."
  );
  const emergencyAlertText = useTranslation("Emergency Alert");
  const messageSentText = useTranslation("Message sent to your contacts!");
  const callFailedText = useTranslation("Call Failed 📞");
  const unableToCallText = useTranslation("Unable to make call.");

  /** ------------------------------
   *  HANDLE TAP 3 TIMES
   * ------------------------------ */
  const handleTap = () => {
    setTapCount((prev) => {
      const updated = prev + 1;
      if (updated >= 3) {
        Toast.show({
          type: "success",
          text1: emergencyAlertText,
          text2: messageSentText,
        });
        return 0;
      }
      return updated;
    });
  };

  /** ------------------------------
   *  CALL CONTACT
   * ------------------------------ */
  const handleEmergencyCall = (contact) => {
    Alert.alert(
      `Call ${contact.name}?`,
      `Are you sure you want to call ${contact.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () =>
            Linking.openURL(`tel:${contact.phone}`).catch(() => {
              Toast.show({
                type: "error",
                text1: callFailedText,
                text2: unableToCallText,
              });
            }),
        },
      ]
    );
  };

  /** ------------------------------
   *  SEND EMERGENCY SMS
   * ------------------------------ */
  const handleSendSMS = async (contact) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Toast.show({
        type: "error",
        text1: "SMS Not Supported",
        text2: "This device cannot send SMS.",
      });
      return;
    }

    await SMS.sendSMSAsync(
      [contact.phone],
      `🚨 EMERGENCY ALERT!\n\nYour contact *${user?.name}* needs help.\nPlease call immediately.`
    );

    Toast.show({
      type: "success",
      text1: "Emergency Message Sent",
      text2: `SMS sent to ${contact.name}`,
    });
  };

  /** ------------------------------
   *  TRIPLE RING COLORS
   * ------------------------------ */
  const getCircleColors = () => {
    switch (tapCount) {
      case 1:
        return { outer: "#FF000020", middle: "#FF000040", inner: "#C70C0C" };
      case 2:
        return { outer: "#0000FF20", middle: "#0000FF40", inner: "#0000FF" };
      case 3:
        return { outer: "#ABC70C40", middle: "#ABC70C80", inner: "#ABC70C" };
      default:
        return { outer: "#FF000020", middle: "#FF000040", inner: "#C70C0C" };
    }
  };

  const colors = getCircleColors();

  /** ------------------------------
   *  SHOW NEARBY HOSPITALS
   * ------------------------------ */
  const handleViewHospitals = async () => {
    if (!coords) {
      Toast.show({
        type: "info",
        text1: "Location not ready",
        text2: "Fetching location...",
      });
      return;
    }

    await fetchNearbyHospitals(coords.latitude, coords.longitude);
    setShowHospitals(true);
    setNoHospitalMessage(true);
    setTimeout(() => setNoHospitalMessage(false), 3000);
  };

  /** ------------------------------
   *  RENDER
   * ------------------------------ */
  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <View className="flex-1 items-center justify-between py-10">
        {/* TOP SECTION */}
        <View className="w-full px-5 flex flex-row justify-center">
          <TouchableOpacity
            onPress={handleViewHospitals}
            disabled={loading}
            className="border border-[#00D2B3] w-[200px] justify-center px-3 py-1.5 rounded-full flex-row items-center space-x-1"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#00D2B3" />
            ) : (
              <>
                <Text className="text-[14px]">{viewHospitalsText}</Text>
                <Icon name="directions" size={16} color="#00D2B3" />
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* CENTER TEXT */}
        <View className="items-center w-[300px] h-[50vh] justify-between">
          <View>
            <Text className="text-[32px] font-bold text-[#333] text-center mb-2">
              {emergencyTitleText}
            </Text>
            <Text className="text-[15px] text-[#666] mb-8 text-center">
              {emergencySubtitleText}
            </Text>
          </View>

          {/* TRIPLE CIRCLE */}
          <TouchableOpacity onPress={handleTap} activeOpacity={0.8}>
            <View className="relative justify-center items-center">
              <View
                className="absolute rounded-full"
                style={{
                  width: 180,
                  height: 180,
                  backgroundColor: colors.outer,
                }}
              />
              <View
                className="absolute rounded-full"
                style={{
                  width: 130,
                  height: 130,
                  backgroundColor: colors.middle,
                }}
              />
              <View
                className="rounded-full justify-center items-center"
                style={{ width: 80, height: 80, backgroundColor: colors.inner }}
              >
                <Icon name="touch-app" size={30} color="#000" />
              </View>
            </View>
          </TouchableOpacity>

          <Text className="text-[#666] text-center mt-8 px-8">
            {tapInstructionText}
          </Text>
        </View>

        {/* HOSPITAL RESULTS */}
        {showHospitals && hospitals.length > 0 && (
          <ScrollView className="w-full px-5 mb-2">
            <Text className="font-bold text-[16px] text-center mb-2">
              Nearby Hospitals
            </Text>

            {hospitals.map((h, i) => (
              <View
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-3 mb-2"
              >
                <Text className="font-semibold">{h.name}</Text>
                <Text className="text-gray-600 text-[13px]">{h.address}</Text>
                {h.distance && (
                  <Text className="text-gray-500 text-[12px]">
                    {h.distance.toFixed(2)} km away
                  </Text>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        {showHospitals && hospitals.length === 0 && noHospitalMessage && (
          <Text className="text-gray-500 text-center mt-4">
            No nearby hospitals found.
          </Text>
        )}
      </View>

      {/* ===============================================
           DYNAMIC BOTTOM BUTTONS  (Updated)
         =============================================== */}
      {/* Bottom SECTION */}
      <View className="w-full items-center mt-4 mb-8">
        {/* --- Row for Family + Friend --- */}
        <View className="flex-row space-x-4 mt-2">
          {/* FAMILY BUTTON */}
          {groupedContacts.family.length > 0 && (
            <TouchableOpacity
              onPress={() => handleEmergencyCall(groupedContacts.family[0])}
              className="bg-white h-[42px] w-[146px] justify-center rounded-2xl shadow-lg flex flex-row items-center gap-2"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: iconBg,
                  width: 20,
                  height: 20,
                  borderRadius: 19,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <Icon name="group" size={15} color={iconColor} />
              </View>
              <Text className="font-semibold text-[15px]">
                Call {groupedContacts.family[0].name}
              </Text>
            </TouchableOpacity>
          )}

          {/* FRIEND BUTTON */}
          {groupedContacts.friend.length > 0 && (
            <TouchableOpacity
              onPress={() => handleEmergencyCall(groupedContacts.friend[0])}
              className="bg-white w-[150px] py-3 rounded-2xl shadow-lg items-center"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 6,
              }}
            >
              <View
                style={{
                  backgroundColor: iconBg,
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                <Icon name="people" size={20} color={iconColor} />
              </View>
              <Text className="font-semibold text-[15px]">
                Call {groupedContacts.friend[0].name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Toast />
    </SafeAreaView>
  );
};

export default Emergency;
