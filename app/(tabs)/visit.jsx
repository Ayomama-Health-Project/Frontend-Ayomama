import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const Visit = () => {
  const [visitDate, setVisitDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [serviceType, setServiceType] = useState("Antenatal visit");
  const [hospitalName, setHospitalName] = useState("");
  const [healthcareProvider, setHealthcareProvider] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
              <View className="items-center flex flex-row justify-between mb-10 mt-4">
                <Ionicons name="arrow-back" size={25} />
                <Text className="text-2xl font-bold text-[#333333]">
                  Set Reminder
                </Text>
                <Icon name="notifications" size={25} color="#000" />
              </View>

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
                    borderWidth: 1
                  }}
                  className="flex flex-row items-center border border-[#00D2B3]"
                >
                  <Image
                    source={require("../../assets/images/clinicVisit.png")}
                    style={{ height: 133, width: 195 }}
                  />
                </LinearGradient>
              </View>

              {/* Visit Date */}
              <View className="mb-8">
                <Text className="text-[16px] font-medium text-[#333333] mb-4">
                  Visit date
                </Text>
                <TextInput
                  className="border border-[#E5E5E5] rounded-xl px-4 py-5 bg-white text-[16px]"
                  placeholder="dd/mm/yyyy"
                  placeholderTextColor="#999999"
                  value={visitDate}
                  onChangeText={setVisitDate}
                  returnKeyType="next"
                />
              </View>

              {/* Time and Duration Row */}
              <View className="flex-row justify-between mb-8">
                {/* Time */}
                <View className="flex-1 mr-3">
                  <Text className="text-[16px] font-medium text-[#333333] mb-4">
                    Time
                  </Text>
                  <TextInput
                    className="border border-[#E5E5E5] rounded-xl px-4 py-5 bg-white text-[16px]"
                    placeholder="00:00am"
                    placeholderTextColor="#999999"
                    value={time}
                    onChangeText={setTime}
                    returnKeyType="next"
                  />
                </View>

                {/* Duration */}
                <View className="flex-1 ml-3">
                  <Text className="text-[16px] font-medium text-[#333333] mb-4">
                    Duration
                  </Text>
                  <TextInput
                    className="border border-[#E5E5E5] rounded-xl px-4 py-5 bg-white text-[16px]"
                    placeholder="30 mins"
                    placeholderTextColor="#999999"
                    value={duration}
                    onChangeText={setDuration}
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Service Type */}
              <View className="mb-8">
                <Text className="text-[16px] font-medium text-[#333333] mb-4">
                  Service Type
                </Text>
                <TextInput
                  className="border border-[#E5E5E5] rounded-xl px-4 py-5 bg-white text-[16px] text-[#333333]"
                  value={serviceType}
                  onChangeText={setServiceType}
                  returnKeyType="next"
                />
              </View>

              {/* Hospital Name */}
              <View className="mb-8">
                <Text className="text-[16px] font-medium text-[#333333] mb-4">
                  Hospital Name
                </Text>
                <TextInput
                  className="border border-[#E5E5E5] rounded-xl px-4 py-5 bg-white text-[16px]"
                  placeholder="Write hospital name"
                  placeholderTextColor="#999999"
                  value={hospitalName}
                  onChangeText={setHospitalName}
                  returnKeyType="next"
                />
              </View>

              {/* Healthcare Provider */}
              <View className="mb-10">
                <Text className="text-[16px] font-medium text-[#333333] mb-4">
                  Healthcare provider
                </Text>
                <TextInput
                  className="border border-[#E5E5E5] rounded-xl px-4 py-5 bg-white text-[16px]"
                  placeholder="Write doctor/nurse name below"
                  placeholderTextColor="#999999"
                  value={healthcareProvider}
                  onChangeText={setHealthcareProvider}
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                />
              </View>

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
