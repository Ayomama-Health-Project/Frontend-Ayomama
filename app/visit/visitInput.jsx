import { router } from "expo-router";
import { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

const VisitInput = () => {
  const [visitDate, setVisitDate] = useState("dd/mm/yyyy");
  const [visitTime, setVisitTime] = useState("00:00am");
  const [duration, setDuration] = useState("30 mins");
  const [serviceType, setServiceType] = useState("Antenatal visit");
  const [hospitalName, setHospitalName] = useState("");
  const [healthcareProvider, setHealthcareProvider] = useState("");

  const handleSave = () => {
    if (!hospitalName || !healthcareProvider) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all the required fields before saving.",
        position: "top",
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: "Visit saved",
      text2: "Your reminder has been saved locally for now.",
      position: "top",
    });
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#DDF4EE", "rgba(221,244,238,0.78)", "rgba(255,255,255,0)"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: 220 }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 12}
      >
        <ScrollView className="flex-1 px-6 pb-8 pt-4" contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View className="mb-10 mt-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.82}>
              <Text className="text-[28px] text-[#293231]">←</Text>
            </TouchableOpacity>
            <Text className="text-[22px] font-bold text-[#333333]">Set Reminder</Text>
            <View className="w-6" />
          </View>

        <View className="mb-8 items-center">
          <View className="h-[166px] w-[256px] items-center justify-center rounded-[24px] border border-[#00D2B3] bg-[#F8F1ED]">
            <Image
              source={require("../../assets/images/clinicVisit.png")}
              style={{ height: 133, width: 195 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <Field label="Visit date" prefix="📅" value={visitDate} onChangeText={setVisitDate} />
        <View className="mb-5 flex-row gap-4">
          <View className="flex-1">
            <Field label="Time" prefix="◔" value={visitTime} onChangeText={setVisitTime} />
          </View>
          <View className="flex-1">
            <Field label="Duration" prefix="◔" value={duration} onChangeText={setDuration} />
          </View>
        </View>
        <Field label="Service Type" prefix="⊞" value={serviceType} onChangeText={setServiceType} />
        <Field
          label="Hospital Name"
          prefix="🏥"
          value={hospitalName}
          onChangeText={setHospitalName}
          placeholder="Write hospital name"
        />
        <Field
          label="Healthcare provider"
          prefix="🩺"
          value={healthcareProvider}
          onChangeText={setHealthcareProvider}
          placeholder="Write doctor/nurse name below"
        />

          <View className="mt-auto pt-4">
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.85}
              className="mb-8 mt-4 h-12 items-center justify-center rounded-[16px] bg-[#0B7A66]"
            >
              <Text className="text-[16px] font-semibold text-white">Save Visit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

function Field({ label, prefix, value, onChangeText, placeholder }) {
  return (
    <View className="mb-5">
      <Text className="mb-3 text-[16px] font-medium text-[#333333]">{label}</Text>
      <View className="flex-row items-center rounded-[16px] border border-[#00D2B3] px-4 py-4">
        <Text className="mr-3 text-[18px] text-[#293231]">{prefix}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7B7B7B"
          className="flex-1 text-[16px] text-[#333333]"
        />
        <Text className="text-[16px] text-[#293231]">⌄</Text>
      </View>
    </View>
  );
}

export default VisitInput;
