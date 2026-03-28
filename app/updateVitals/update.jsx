import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import useMockAuth from "../../hooks/useMockAuth";
import { getAccountAppRoute } from "../../utils/authRoutes";
import { useTranslation } from "../../utils/translator";

export default function UpdateVitalsStep() {
  const router = useRouter();
  const { submitAntenatalData, isLoading, account } = useMockAuth();

  // Form state
  const [bloodPressure, setBloodPressure] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodLevel, setBloodLevel] = useState("");

  // Translate all text
  const antenatalUpdateText = useTranslation("Antenatal Update");
  const bloodPressureText = useTranslation("Blood pressure");
  const bloodPressurePlaceholder = useTranslation(
    "Enter blood pressure (e.g., 120/80)",
  );
  const temperatureText = useTranslation("Temperature");
  const temperaturePlaceholder = useTranslation(
    "Enter temperature (e.g., 36.8°C)",
  );
  const weightText = useTranslation("Weight");
  const weightPlaceholder = useTranslation("Enter weight (e.g., 65kg)");
  const bloodLevelText = useTranslation("Blood level");
  const bloodLevelPlaceholder = useTranslation(
    "Enter blood level (e.g., 12.5g/dl)",
  );
  const proceedText = useTranslation("Proceed");

  const handleProceed = async () => {
    if (!bloodPressure && !temperature && !weight && !bloodLevel) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in at least one vital.",
        position: "top",
      });
      return;
    }

    const result = await submitAntenatalData({
      bloodPressure: bloodPressure || undefined,
      temperature: temperature || undefined,
      weight: weight || undefined,
      bloodLevel: bloodLevel || undefined,
      date: new Date().toISOString(),
    });

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Vitals Updated",
        text2: result.message || "Your vitals have been saved.",
        position: "top",
      });
      setTimeout(() => router.push(getAccountAppRoute(account)), 1500);
    } else {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: result.error || "Failed to update vitals.",
        position: "top",
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#B5FFFC", "#FFDEE9"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Fixed Header */}
      <View
        style={{
          paddingTop: 16,
          paddingBottom: 16,
          paddingHorizontal: 24,
        }}
      >
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={handleBack} className="absolute left-0">
            <Ionicons name="arrow-back" size={24} color="#293231" />
          </TouchableOpacity>
          <Text className="text-[#293231] text-xl font-bold">
            {antenatalUpdateText}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="justify-start pt-6">
          {/* Blood Pressure Input */}
          <View className="mb-4">
            <Text className="text-sm mb-2">{bloodPressureText}</Text>
            <TextInput
              placeholder={bloodPressurePlaceholder}
              placeholderTextColor="#D1D5DB"
              value={bloodPressure}
              onChangeText={setBloodPressure}
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
              }}
            />
          </View>

          {/* Temperature Input */}
          <View className="mb-4">
            <Text className="text-sm mb-2">{temperatureText}</Text>
            <TextInput
              placeholder={temperaturePlaceholder}
              placeholderTextColor="#D1D5DB"
              value={temperature}
              onChangeText={setTemperature}
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
              }}
            />
          </View>

          {/* Weight Input */}
          <View className="mb-4">
            <Text className="text-sm mb-2">{weightText}</Text>
            <TextInput
              placeholder={weightPlaceholder}
              placeholderTextColor="#D1D5DB"
              value={weight}
              onChangeText={setWeight}
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
              }}
            />
          </View>

          {/* Blood Level Input */}
          <View className="mb-8">
            <Text className="text-sm mb-2">{bloodLevelText}</Text>
            <TextInput
              placeholder={bloodLevelPlaceholder}
              placeholderTextColor="#D1D5DB"
              value={bloodLevel}
              onChangeText={setBloodLevel}
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Proceed Button at Bottom */}
      <View className="px-6 pb-6 pt-4 bg-transparent">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleProceed}
          disabled={isLoading}
          className="bg-[#006D5B] rounded-2xl py-4 items-center justify-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold text-base">
              {proceedText}
            </Text>
          )}
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
