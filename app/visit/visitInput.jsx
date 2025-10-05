import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import useVisitStore from "../../store/useVisitStore";

// 🔔 Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const VisitInput = () => {
  const [visitDate, setVisitDate] = useState(null);
  const [visitTime, setVisitTime] = useState(null);
  const [duration, setDuration] = useState("");
  const [serviceType, setServiceType] = useState("Antenatal visit");
  const [hospitalName, setHospitalName] = useState("");
  const [healthcareProvider, setHealthcareProvider] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createSchedule } = useVisitStore();

  // 🟢 Handle notification click
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        Toast.show({
          type: "info",
          text1: "Visit Reminder",
          text2: `It's time for your ${
            data?.serviceType || "scheduled"
          } visit.`,
          position: "top",
        });
      }
    );
    return () => subscription.remove();
  }, []);

  const dismissKeyboard = () => Keyboard.dismiss();

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setVisitDate(selectedDate);
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setVisitTime(selectedTime);
  };

  const formatDate = (date) =>
    date
      ? date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "dd/mm/yyyy";

  const formatTime = (time) =>
    time
      ? time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // 🔹 backend expects HH:mm
        })
      : "00:00";

  // ✅ Format date for backend (YYYY-MM-DD)
  const formatDateForBackend = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ✅ Create proper reminderDateTime by combining date and time
  const createReminderDateTime = (date, time) => {
    if (!date || !time) return null;

    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);

    return combined;
  };

  const InputField = ({
    icon,
    placeholder,
    value,
    onChangeText,
    onPress,
    editable = true,
  }) => (
    <View className="border border-[#E5E5E5] rounded-xl flex-row items-center px-4 py-5 mb-8 bg-white">
      <Icon name={icon} size={22} color="#999" style={{ marginRight: 8 }} />
      <TextInput
        className="flex-1 text-[16px] text-[#333333]"
        placeholder={placeholder}
        placeholderTextColor="#999999"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        onFocus={onPress}
      />
    </View>
  );

  const handleSave = async () => {
    dismissKeyboard();

    if (
      !visitDate ||
      !visitTime ||
      !duration ||
      !hospitalName ||
      !healthcareProvider
    ) {
      Toast.show({
        type: "error",
        text1: "Missing Fields ⚠️",
        text2: "Please fill in all the required fields before saving.",
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Create proper reminderDateTime
      const reminderDateTime = createReminderDateTime(visitDate, visitTime);

      if (!reminderDateTime || isNaN(reminderDateTime.getTime())) {
        throw new Error("Invalid date/time combination");
      }

      // ✅ Prepare visit data for backend
      const visitData = {
        visitDate: formatDateForBackend(visitDate), // YYYY-MM-DD format
        visitTime: formatTime(visitTime), // HH:mm format
        reminderDateTime: reminderDateTime.toISOString(), // ISO string for backend
        duration: parseInt(duration),
        doctorName: healthcareProvider.trim(),
        hospitalName: hospitalName.trim(),
        serviceType: serviceType.trim(),
      };

      console.log("📤 Sending visit data:", visitData);

      const result = await createSchedule(visitData);

      if (result.success) {
        // 🔔 Schedule local notification 10 minutes before visit
        const triggerTime = new Date(
          reminderDateTime.getTime() - 10 * 60 * 1000
        );

        // Only schedule if trigger time is in the future
        if (triggerTime > new Date()) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "⏰ Upcoming Visit Reminder",
              body: `You have a ${serviceType} at ${hospitalName} with ${healthcareProvider} at ${formatTime(
                visitTime
              )}.`,
              data: visitData,
            },
            trigger: triggerTime,
          });
        }

        Toast.show({
          type: "success",
          text1: "Visit Scheduled ✅",
          text2: "Your visit has been saved and a reminder set!",
          position: "top",
        });

        // 🔄 Reset fields
        setVisitDate(null);
        setVisitTime(null);
        setDuration("");
        setServiceType("Antenatal visit");
        setHospitalName("");
        setHealthcareProvider("");
      } else {
        console.error("❌ Create visit error:", result.error);
        Toast.show({
          type: "error",
          text1: "Error ❌",
          text2: result.error || "Something went wrong, please try again.",
          position: "top",
        });
      }
    } catch (error) {
      console.error("❌ Error in handleSave:", error);
      Toast.show({
        type: "error",
        text1: "Validation Error ⚠️",
        text2: "Please check your date and time inputs.",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 bg-white px-6 pt-4 pb-8">
              {/* Header */}
              <View className="items-center flex flex-row justify-between mb-10 mt-4">
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="arrow-back" size={25} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-[#333333]">
                  Set Reminder
                </Text>
                <TouchableOpacity onPress={() => router.push("/notifications")}>
                  <Icon name="notifications" size={25} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Banner */}
              <View className="flex flex-row justify-center items-center h-[166px] mb-8">
                <LinearGradient
                  colors={["#FBE9E2", "#A5DFD7"]}
                  style={{
                    borderRadius: 20,
                    padding: 5,
                    width: 256,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 166,
                    borderColor: "#00D2B3",
                    borderWidth: 1,
                  }}
                >
                  <Image
                    source={require("../../assets/images/clinicVisit.png")}
                    style={{ height: 133, width: 195 }}
                  />
                </LinearGradient>
              </View>

              {/* Visit Date */}
              <Text className="text-[16px] font-medium text-[#333333] mb-2">
                Visit Date *
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="border border-[#E5E5E5] rounded-xl flex-row items-center px-4 py-5 mb-8 bg-white"
              >
                <Icon
                  name="calendar-today"
                  size={22}
                  color="#999"
                  style={{ marginRight: 8 }}
                />
                <Text className="flex-1 text-[16px] text-[#333333]">
                  {formatDate(visitDate)}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={visitDate || new Date()}
                  onChange={onChangeDate}
                  minimumDate={new Date()} // Prevent past dates
                />
              )}

              {/* Time & Duration */}
              <View className="flex-row justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-[16px] font-medium text-[#333333] mb-2">
                    Time *
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowTimePicker(true)}
                    className="border border-[#E5E5E5] rounded-xl flex-row items-center px-4 py-5 mb-8 bg-white"
                  >
                    <Icon
                      name="access-time"
                      size={22}
                      color="#999"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="flex-1 text-[16px] text-[#333333]">
                      {formatTime(visitTime)}
                    </Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      mode="time"
                      display="default"
                      value={visitTime || new Date()}
                      onChange={onChangeTime}
                    />
                  )}
                </View>

                <View className="flex-1 ml-3">
                  <Text className="text-[16px] font-medium text-[#333333] mb-2">
                    Duration (minutes) *
                  </Text>
                  <InputField
                    icon="hourglass-empty"
                    placeholder="30"
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Service Type */}
              <Text className="text-[16px] font-medium text-[#333333] mb-2 mt-4">
                Service Type
              </Text>
              <InputField
                icon="medical-services"
                placeholder="Service type"
                value={serviceType}
                onChangeText={setServiceType}
              />

              {/* Hospital Name */}
              <Text className="text-[16px] font-medium text-[#333333] mb-2">
                Hospital Name *
              </Text>
              <InputField
                icon="local-hospital"
                placeholder="Write hospital name"
                value={hospitalName}
                onChangeText={setHospitalName}
              />

              {/* Healthcare Provider */}
              <Text className="text-[16px] font-medium text-[#333333] mb-2">
                Healthcare Provider *
              </Text>
              <InputField
                icon="person"
                placeholder="Doctor/Nurse name"
                value={healthcareProvider}
                onChangeText={setHealthcareProvider}
              />

              {/* Save Button */}
              <TouchableOpacity
                className="bg-[#00D2B3] rounded-xl py-5 items-center mt-4 mb-4 flex-row justify-center"
                onPress={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <ActivityIndicator size="small" color="#ffffff" />
                    <Text className="text-white text-[18px] font-semibold ml-2">
                      Saving...
                    </Text>
                  </>
                ) : (
                  <Text className="text-white text-[18px] font-semibold">
                    Save Visit
                  </Text>
                )}
              </TouchableOpacity>

              {Platform.OS === "ios" && <View className="h-4" />}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VisitInput;