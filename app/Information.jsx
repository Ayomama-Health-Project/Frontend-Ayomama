import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";

export default function PersonalInformation() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [lastPeriod, setLastPeriod] = useState("");
  const [emergencyNumber, setEmergencyNumber] = useState("");
  const [emergencyName, setEmergencyName] = useState("");

  return (
    <ScrollView className="flex-1 p-5">

      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Personal Information
      </Text>

      {/* Full Name */}
      <Text className="text-gray-700 mb-2">Full Name</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Enter full name"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Home Address */}
      <Text className="text-gray-700 mb-2">Home Address</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="Enter address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Last Period */}
      <Text className="text-gray-700 mb-2">When last did you see your period?</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="e.g. June 25, 2025"
        value={lastPeriod}
        onChangeText={setLastPeriod}
      />

      {/* Emergency Contact */}
      <Text className="text-lg font-semibold text-gray-800 mt-4 mb-3">
        Emergency Contact
      </Text>

      <Text className="text-gray-700 mb-2">Phone Number</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        placeholder="+234..."
        keyboardType="phone-pad"
        value={emergencyNumber}
        onChangeText={setEmergencyNumber}
      />

      <Text className="text-gray-700 mb-2">Contact Name</Text>
      <TextInput
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        placeholder="Enter name"
        value={emergencyName}
        onChangeText={setEmergencyName}
      />

      {/* Next Button */}
      <TouchableOpacity className="bg-green-500 rounded-full py-4">
        <Text className="text-center text-white font-semibold text-lg">
          Next
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}