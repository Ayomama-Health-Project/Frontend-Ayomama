import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function HealthInfoStep() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [facilityCode, setFacilityCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProceed = async () => {
    // // Validation
    // if (!fullName.trim()) {
    //   setError("Full name is required");
    //   Toast.show({
    //     type: "error",
    //     text1: "Validation Error",
    //     text2: "Please enter your full name",
    //     position: "top",
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }

    // if (!state.trim()) {
    //   setError("State is required");
    //   Toast.show({
    //     type: "error",
    //     text1: "Validation Error",
    //     text2: "Please enter your state",
    //     position: "top",
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }

    // if (!lga.trim()) {
    //   setError("LGA is required");
    //   Toast.show({
    //     type: "error",
    //     text1: "Validation Error",
    //     text2: "Please enter your LGA",
    //     position: "top",
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }

    // if (!facilityName.trim()) {
    //   setError("Facility name is required");
    //   Toast.show({
    //     type: "error",
    //     text1: "Validation Error",
    //     text2: "Please enter facility name",
    //     position: "top",
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }

    // if (!facilityCode.trim()) {
    //   setError("Facility code/ID is required");
    //   Toast.show({
    //     type: "error",
    //     text1: "Validation Error",
    //     text2: "Please enter facility code or ID",
    //     position: "top",
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }

    setError("");
    setIsLoading(true);

    try {
      // TODO: Implement healthcare worker profile API call
      const healthcareData = {
        fullName: fullName.trim(),
        state: state.trim(),
        lga: lga.trim(),
        facilityName: facilityName.trim(),
        facilityCode: facilityCode.trim(),
      };

      console.log("Healthcare worker data:", healthcareData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Toast.show({
        type: "success",
        text1: "Profile Complete!",
        text2: "Your information has been saved successfully",
        position: "top",
        visibilityTime: 2000,
      });

      // Navigate to healthcare dashboard after success
      setTimeout(() => {
        router.replace("/healthworker/dashboard");
      }, 2000);
    } catch (err) {
      setError("Failed to save information");
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Failed to save your information",
        position: "top",
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <ScrollView className="flex-1 px-6 pt-6">
          <Text className="text-2xl font-bold text-[#293231] mb-6">
            Personal information
          </Text>

          {/* Full Name */}
          <Text className="text-[#293231] mb-2 text-[15px]">Full Name</Text>
          <TextInput
            className="border border-gray-300 bg-white rounded-2xl px-4 py-4 mb-5"
            placeholder="Enter full name"
            placeholderTextColor="#9CA3AF"
            value={fullName}
            onChangeText={setFullName}
            editable={!isLoading}
          />

          {/* State and LGA Row */}
          <View className="flex-row mb-5">
            <View className="flex-1 mr-3">
              <Text className="text-[#293231] mb-2 text-[15px]">State</Text>
              <TextInput
                className="border border-gray-300 bg-white rounded-2xl px-4 py-4"
                placeholder="Enter state"
                placeholderTextColor="#9CA3AF"
                value={state}
                onChangeText={setState}
                editable={!isLoading}
              />
            </View>

            <View className="flex-1">
              <Text className="text-[#293231] mb-2 text-[15px]">LGA</Text>
              <TextInput
                className="border border-gray-300 bg-white rounded-2xl px-4 py-4"
                placeholder="Enter LGA"
                placeholderTextColor="#9CA3AF"
                value={lga}
                onChangeText={setLga}
                editable={!isLoading}
              />
            </View>
          </View>

          {/* Facility Name */}
          <Text className="text-[#293231] mb-2 text-[15px]">Facility Name</Text>
          <TextInput
            className="border border-gray-300 bg-white rounded-2xl px-4 py-4 mb-5"
            placeholder="Enter facility name"
            placeholderTextColor="#9CA3AF"
            value={facilityName}
            onChangeText={setFacilityName}
            editable={!isLoading}
          />

          {/* Facility Code / ID */}
          <Text className="text-[#293231] mb-2 text-[15px]">
            Facility Code / ID
          </Text>
          <TextInput
            className="border border-gray-300 bg-white rounded-2xl px-4 py-4 mb-8"
            placeholder="Enter facility code or ID"
            placeholderTextColor="#9CA3AF"
            value={facilityCode}
            onChangeText={setFacilityCode}
            editable={!isLoading}
          />

          {/* Error Message */}
          {error ? (
            <Text className="text-red-500 mb-4 text-sm">{error}</Text>
          ) : null}

          {/* Spacer */}
          <View className="h-20" />
        </ScrollView>

        {/* Proceed Button - Fixed at bottom */}
        <View className="px-6 pb-8 pt-4">
          <TouchableOpacity
            className="bg-[#006D5B] py-5 rounded-3xl"
            style={{
              shadowColor: "#006D5B",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
            onPress={handleProceed}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="text-white text-center font-bold text-[17px]">
                Proceed
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Toast component */}
        <Toast />
      </View>
    </TouchableWithoutFeedback>
  );
}
