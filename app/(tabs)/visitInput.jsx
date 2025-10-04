import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Visit = () => {
  const [visitDate, setVisitDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [serviceType, setServiceType] = useState("Antenatal visit");
  const [hospitalName, setHospitalName] = useState("");
  const [healthcareProvider, setHealthcareProvider] = useState("");

  // State for pickers
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate.toLocaleDateString();
      setVisitDate(currentDate);
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const formattedTime = `${hours % 12 || 12}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${hours >= 12 ? "PM" : "AM"}`;
      setTime(formattedTime);
    }
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
        onFocus={onPress} // Open picker when focused
      />
    </View>
  );

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
                <Ionicons name="arrow-back" size={25} />
                <Text className="text-2xl font-bold text-[#333333]">
                  Set Reminder
                </Text>
                <Icon name="notifications" size={25} color="#000" />
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
                  className="flex flex-row items-center border border-[#00D2B3]"
                >
                  <Image
                    source={require("../../assets/images/clinicVisit.png")}
                    style={{ height: 133, width: 195 }}
                  />
                </LinearGradient>
              </View>

              {/* Date Picker */}
              <Text className="text-[16px] font-medium text-[#333333] mb-2">
                Visit Date
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
                  {visitDate || "dd/mm/yyyy"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={new Date()}
                  onChange={onChangeDate}
                />
              )}

              {/* Time & Duration */}
              <View className="flex-row justify-between">
                <View className="flex-1 mr-3">
                  <Text className="text-[16px] font-medium text-[#333333] mb-2">
                    Time
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
                      {time || "00:00 AM"}
                    </Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      mode="time"
                      display="default"
                      value={new Date()}
                      onChange={onChangeTime}
                    />
                  )}
                </View>

                <View className="flex-1 ml-3">
                  <Text className="text-[16px] font-medium text-[#333333] mb-2">
                    Duration
                  </Text>
                  <InputField
                    icon="hourglass-empty"
                    placeholder="30 mins"
                    value={duration}
                    onChangeText={setDuration}
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
                Hospital Name
              </Text>
              <InputField
                icon="local-hospital"
                placeholder="Write hospital name"
                value={hospitalName}
                onChangeText={setHospitalName}
              />

              {/* Healthcare Provider */}
              <Text className="text-[16px] font-medium text-[#333333] mb-2">
                Healthcare Provider
              </Text>
              <InputField
                icon="person"
                placeholder="Doctor/Nurse name"
                value={healthcareProvider}
                onChangeText={setHealthcareProvider}
              />

              {/* Save Button */}
              <TouchableOpacity
                className="bg-[#00D2B3] rounded-xl py-5 items-center mt-4 mb-4"
                onPress={dismissKeyboard}
              >
                <Text className="text-white text-[18px] font-semibold">
                  Save Visit
                </Text>
              </TouchableOpacity>

              {Platform.OS === "ios" && <View className="h-4" />}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Visit;
