import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PickerModal from "../../components/PickerModal";

export default function InformationStep({ onNext, onBack }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [lastPeriodMonth, setLastPeriodMonth] = useState("");
  const [lastPeriodDay, setLastPeriodDay] = useState("");
  const [lastPeriodYear, setLastPeriodYear] = useState("");
  const [openPicker, setOpenPicker] = useState(null); // 'month' | 'day' | 'year' | null
  const [openRelationPicker, setOpenRelationPicker] = useState(null); // contact id for relation selection

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
  const years = Array.from(
    { length: 6 },
    (_, i) => `${new Date().getFullYear() - i}`
  );

  const handleSelect = (type, value) => {
    if (type === "month") setLastPeriodMonth(value);
    if (type === "day") setLastPeriodDay(value);
    if (type === "year") setLastPeriodYear(value);
    setOpenPicker(null);
  };

  // Emergency contacts list
  const [contacts, setContacts] = useState([
    { id: Date.now().toString(), number: "", name: "", relation: "" },
  ]);

  const relationOptions = [
    "Father",
    "Mother",
    "Sister",
    "Brother",
    "Spouse",
    "Friend",
    "Doctor",
    "Guardian",
    "Neighbor",
    "Other",
  ];

  const updateContact = (id, field, value) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addContact = () => {
    setContacts((prev) => [
      ...prev,
      {
        id: (Date.now() + Math.random()).toString(),
        number: "",
        name: "",
        relation: "",
      },
    ]);
  };

  const removeContact = (id) => {
    setContacts((prev) =>
      prev.length === 1 ? prev : prev.filter((c) => c.id !== id)
    );
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-5 pt-6">
        <Text className="text-2xl font-bold mb-6">
          Personal Information
        </Text>
        {/* Full Name */}
        <Text className="text-gray-700 mb-2">Full Name</Text>
        <TextInput
          className="border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 py-[14px] mb-4"
          placeholder="Enter full name"
          placeholderTextColor="#9CA3AF"
          value={fullName}
          onChangeText={setFullName}
        />
        {/* Home Address */}
        <Text className="text-gray-700 mb-2">Home Address</Text>
        <TextInput
          className="border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 py-[14px] mb-4"
          placeholder="Enter address"
          placeholderTextColor="#9CA3AF"
          value={address}
          onChangeText={setAddress}
        />
        {/* Last Period */}
        <Text className="text-gray-700 mb-2">
          When last did you see your period?
        </Text>
        <View className="flex-row mb-4">
          <TouchableOpacity
            className="flex-1 mr-2 border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 flex-row items-center justify-between h-12"
            onPress={() => setOpenPicker("month")}
          >
            <Text
              className={`text-gray-800 ${
                !lastPeriodMonth ? "text-opacity-50" : ""
              }`}
            >
              {lastPeriodMonth || "Month"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-24 mr-2 border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 flex-row items-center justify-between h-12"
            onPress={() => setOpenPicker("day")}
          >
            <Text
              className={`text-gray-800 ${
                !lastPeriodDay ? "text-opacity-50" : ""
              }`}
            >
              {lastPeriodDay || "Day"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-32 border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 flex-row items-center justify-between h-12"
            onPress={() => setOpenPicker("year")}
          >
            <Text
              className={`text-gray-800 ${
                !lastPeriodYear ? "text-opacity-50" : ""
              }`}
            >
              {lastPeriodYear || "Year"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Modal selector for date */}
        <PickerModal
          visible={openPicker !== null}
          options={
            openPicker === "month"
              ? months
              : openPicker === "day"
              ? days
              : years
          }
          onSelect={(item) => handleSelect(openPicker, item)}
          onClose={() => setOpenPicker(null)}
          title={`Select ${openPicker}`}
        />
        <PickerModal
          visible={openRelationPicker !== null}
          options={relationOptions}
          onSelect={(item) => {
            updateContact(openRelationPicker, "relation", item);
            setOpenRelationPicker(null);
          }}
          onClose={() => setOpenRelationPicker(null)}
          title="Select Relation"
        />
        {/* Emergency Contact */}
        <View className="flex-row items-center justify-between mt-4 mb-3">
          <Text className="text-lg font-semibold text-gray-800">
            Emergency Contact(s)
          </Text>
          <TouchableOpacity
            className="flex-row items-center bg-[#006D5B] px-4 py-3 rounded-2xl"
            onPress={addContact}
          >
            <Text className="text-white text-base font-semibold mr-1">+</Text>
            <Text className="text-white font-medium">Add Contact</Text>
          </TouchableOpacity>
        </View>
        {contacts.map((c, idx) => (
          <View
            key={c.id}
            className="mb-6 border border-gray-200 rounded-2xl p-4 bg-white/30"
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700 font-medium">
                Contact {idx + 1}
              </Text>
              {contacts.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeContact(c.id)}
                  className="ml-2 px-2 py-1 rounded bg-red-100"
                >
                  <Text className="text-red-600 text-xs font-semibold">
                    Remove
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Name */}
            <Text className="text-gray-700 mb-2">Name</Text>
            <TextInput
              className="border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 py-[14px] mb-4"
              placeholder="Enter name"
              placeholderTextColor="#9CA3AF"
              value={c.name}
              onChangeText={(val) => updateContact(c.id, "name", val)}
            />
            {/* Phone split */}
            <Text className="text-gray-700 mb-2">Phone Number</Text>
            <View className="flex-row items-center mb-2">
              <View className="w-24 border-y border-l border-gray-300 bg-[#D9D9D9] rounded-l-2xl h-12 justify-center items-center">
                <Text className="text-gray-800 font-medium">+234</Text>
              </View>
              <TextInput
                className="flex-1 border border-gray-300 bg-[#FCFCFC] rounded-r-2xl px-4 h-12"
                placeholder="8012345678"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={c.number}
                onChangeText={(val) => updateContact(c.id, "number", val)}
                maxLength={10}
              />
            </View>
            {/* Relation selector */}
            <Text className="text-gray-700 mb-2">Relation</Text>
            <TouchableOpacity
              className="border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 h-12 flex-row items-center justify-between mb-4"
              onPress={() => setOpenRelationPicker(c.id)}
            >
              <Text
                className={`text-gray-800 ${
                  !c.relation ? "text-opacity-50" : ""
                }`}
              >
                {c.relation || "Select relation"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        ))}
        {/* Add Contact button moved above */}
        <View className="flex-row justify-between mt-4 mb-8">
          <TouchableOpacity
            className="bg-[#006D5B] rounded-2xl py-4 px-8"
            onPress={onBack}
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#006D5B] rounded-2xl py-4 px-8"
            onPress={onNext}
          >
            <Text className="text-white font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
