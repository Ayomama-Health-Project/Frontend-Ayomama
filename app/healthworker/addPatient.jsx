import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const isIOS = Platform.OS === "ios";

export default function AddPatient() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [pregnancyStage, setPregnancyStage] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [duration, setDuration] = useState("");
  const [antenatalVisits, setAntenatalVisits] = useState([{ date: "" }]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addAntenatalVisit = () => {
    setAntenatalVisits([...antenatalVisits, { date: "" }]);
  };

  const updateAntenatalVisit = (index, value) => {
    const updatedVisits = [...antenatalVisits];
    updatedVisits[index].date = value;
    setAntenatalVisits(updatedVisits);
  };

  const removeAntenatalVisit = (index) => {
    if (antenatalVisits.length > 1) {
      const updatedVisits = antenatalVisits.filter((_, i) => i !== index);
      setAntenatalVisits(updatedVisits);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!patientName.trim()) {
      Toast.show({
        type: "error",
        text1: "Required Field",
        text2: "Please enter patient name",
      });
      return;
    }

    if (!pregnancyStage.trim()) {
      Toast.show({
        type: "error",
        text1: "Required Field",
        text2: "Please enter pregnancy stage",
      });
      return;
    }

    if (!visitDate.trim()) {
      Toast.show({
        type: "error",
        text1: "Required Field",
        text2: "Please select visit date",
      });
      return;
    }

    if (!visitTime.trim()) {
      Toast.show({
        type: "error",
        text1: "Required Field",
        text2: "Please select visit time",
      });
      return;
    }

    if (!duration.trim()) {
      Toast.show({
        type: "error",
        text1: "Required Field",
        text2: "Please select duration",
      });
      return;
    }

    if (!phoneNumber.trim()) {
      Toast.show({
        type: "error",
        text1: "Required Field",
        text2: "Please enter phone number",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement API call to save patient
      const patientData = {
        name: patientName,
        pregnancyStage,
        visitDate,
        visitTime,
        duration,
        antenatalVisits: antenatalVisits.filter((visit) => visit.date),
        phoneNumber,
      };

      console.log("Patient Data:", patientData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Patient added successfully",
      });

      // Navigate back to dashboard
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add patient. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="bg-white"
        style={{
          paddingTop: isIOS ? 50 : StatusBar.currentHeight || 24,
          paddingBottom: 16,
          paddingHorizontal: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <Ionicons name="arrow-back" size={24} color="#293231" />
          </TouchableOpacity>
          <Text className="text-[#293231] text-xl font-bold">Add Patient</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Patient Name */}
        <View className="mt-6">
          <Text className="text-[#293231] text-base font-medium mb-2">
            Patient Name
          </Text>
          <TextInput
            className="border border-[#00D2B3] rounded-2xl px-4 py-3 text-[#293231]"
            placeholder="Grace Adam"
            placeholderTextColor="#9CA3AF"
            value={patientName}
            onChangeText={setPatientName}
          />
        </View>

        {/* Pregnancy Stage */}
        <View className="mt-4">
          <Text className="text-[#293231] text-base font-medium mb-2">
            Pregnancy stage
          </Text>
          <TextInput
            className="border border-[#00D2B3] rounded-2xl px-4 py-3 text-[#293231]"
            placeholder="36 weeks"
            placeholderTextColor="#9CA3AF"
            value={pregnancyStage}
            onChangeText={setPregnancyStage}
          />
        </View>

        {/* Visit Date */}
        <View className="mt-4">
          <Text className="text-[#293231] text-base font-medium mb-2">
            Visit Date
          </Text>
          <View className="border border-[#00D2B3] rounded-2xl px-4 py-3 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#293231"
                style={{ marginRight: 8 }}
              />
              <TextInput
                className="flex-1 text-[#293231]"
                placeholder="dd/mm/yyyy"
                placeholderTextColor="#9CA3AF"
                value={visitDate}
                onChangeText={setVisitDate}
              />
            </View>
            <AntDesign name="down" size={16} color="#293231" />
          </View>
        </View>

        {/* Time and Duration */}
        <View className="flex-row mt-4">
          {/* Time */}
          <View className="flex-1 mr-2">
            <Text className="text-[#293231] text-base font-medium mb-2">
              Time
            </Text>
            <View className="border border-[#00D2B3] rounded-2xl px-4 py-3 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#293231"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  className="flex-1 text-[#293231]"
                  placeholder="00:00am"
                  placeholderTextColor="#9CA3AF"
                  value={visitTime}
                  onChangeText={setVisitTime}
                />
              </View>
              <AntDesign name="down" size={16} color="#293231" />
            </View>
          </View>

          {/* Duration */}
          <View className="flex-1 ml-2">
            <Text className="text-[#293231] text-base font-medium mb-2">
              Duration
            </Text>
            <View className="border border-[#00D2B3] rounded-2xl px-4 py-3 flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#293231"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  className="flex-1 text-[#293231]"
                  placeholder="30 mins"
                  placeholderTextColor="#9CA3AF"
                  value={duration}
                  onChangeText={setDuration}
                />
              </View>
              <AntDesign name="down" size={16} color="#293231" />
            </View>
          </View>
        </View>

        {/* Antenatal Visits */}
        <View className="mt-4">
          <Text className="text-[#293231] text-base font-medium mb-2">
            Antinental visit
          </Text>
          {antenatalVisits.map((visit, index) => (
            <View key={index} className="mb-3 flex-row items-center">
              <View className="flex-1 border border-[#00D2B3] rounded-2xl px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="#293231"
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    className="flex-1 text-[#293231]"
                    placeholder="dd/mm/yyyy"
                    placeholderTextColor="#9CA3AF"
                    value={visit.date}
                    onChangeText={(value) => updateAntenatalVisit(index, value)}
                  />
                </View>
                <AntDesign name="down" size={16} color="#293231" />
              </View>
              {antenatalVisits.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeAntenatalVisit(index)}
                  className="ml-2 w-10 h-10 rounded-full bg-red-500 items-center justify-center"
                >
                  <Ionicons name="close" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Add Button */}
          <TouchableOpacity
            onPress={addAntenatalVisit}
            className="w-12 h-12 rounded-full bg-white border border-gray-300 items-center justify-center"
          >
            <Ionicons name="add" size={24} color="#293231" />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View className="mt-4">
          <Text className="text-[#293231] text-base font-medium mb-2">
            Contact Info
          </Text>
          <TextInput
            className="border border-[#00D2B3] rounded-2xl px-4 py-3 text-[#293231]"
            placeholder="Phone number"
            placeholderTextColor="#9CA3AF"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
      </ScrollView>

      {/* Save Button - Fixed at Bottom */}
      <View className="px-6 py-4">
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          className="bg-[#00695C] rounded-3xl py-4"
          style={{
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          <Text className="text-white text-center text-base font-semibold">
            {isLoading ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
