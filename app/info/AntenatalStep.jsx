import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function AntenatalStep({ onNext, onBack }) {
  const [hasStarted, setHasStarted] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bloodPressure: "",
    temperature: "",
    weight: "",
    bloodLevel: "",
    prescribedDrugs: "",
    drugsToAvoid: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleProceed = async () => {
    if (loading) return;

    if (!showForm) {
      if (hasStarted === null) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: "Please select Yes or No to continue",
          visibilityTime: 2000,
        });
        return;
      }

      if (hasStarted === false) {
        onNext();
      } else {
        setShowForm(true);
      }
      return;
    }

    const emptyField = Object.entries(formData).find(
      ([, value]) => !value.trim()
    );
    if (emptyField) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill out all fields before proceeding",
        visibilityTime: 2000,
      });
      return;
    }

    try {
      Toast.show({
        type: "success",
        text1: "Antenatal Info Saved",
        text2: "Your antenatal details have been recorded",
        visibilityTime: 2000,
      });

      onNext();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Submission Failed",
        text2: "Something went wrong, please try again",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback>
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          className="flex-1 p-5 pt-6"
        >
          <Text className="text-2xl font-bold text-gray-900 mb-6">
            Antenatal
          </Text>

          {/* STEP 1: Yes/No Section */}
          {!showForm && (
            <View className="">
              <Text className="text-gray-700 mb-4 text-base">
                Have you started antenatal?
              </Text>
              <View className="flex-row justify-between mb-8">
                {["Yes", "No"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setHasStarted(option === "Yes")}
                    className={`border border-gray-300 bg-white rounded-2xl px-5 py-4 flex-row items-center justify-between flex-1 mx-1`}
                  >
                    <Text className="text-gray-800 text-base font-medium">
                      {option}
                    </Text>
                    <View
                      className={`w-5 h-5 rounded-full border-2 ${
                        hasStarted === (option === "Yes")
                          ? "border-[#006D5B] bg-[#006D5B]"
                          : "border-gray-400 bg-white"
                      }`}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={handleProceed}
                className="bg-[#006D5B] rounded-2xl py-4 items-center"
              >
                <Text className="text-white font-semibold text-base">
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 2: Antenatal Form */}
          {showForm && (
            <View className="mt-2">
              {[
                { key: "bloodPressure", label: "Blood Pressure" },
                { key: "temperature", label: "Temperature" },
                { key: "weight", label: "Weight" },
                { key: "bloodLevel", label: "Blood Level" },
                { key: "prescribedDrugs", label: "Prescribed Drugs" },
                { key: "drugsToAvoid", label: "Drugs To Avoid" },
              ].map((field) => (
                <View key={field.key} className="mb-4">
                  <Text className="text-gray-700 mb-2">{field.label}</Text>
                  <TextInput
                    className="border border-gray-300 bg-[#FCFCFC] rounded-2xl px-4 py-[14px]"
                    placeholder={field.label}
                    placeholderTextColor="#9CA3AF"
                    value={formData[field.key]}
                    onChangeText={(val) => handleChange(field.key, val)}
                    returnKeyType="done"
                  />
                </View>
              ))}

              <View className="flex-row justify-between mt-6">
                <TouchableOpacity
                  className="bg-gray-400 rounded-2xl py-4 px-8"
                  onPress={() => setShowForm(false)}
                  disabled={loading}
                >
                  <Text className="text-white font-semibold">Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleProceed}
                  className="bg-[#006D5B] rounded-2xl py-4 px-8 flex-row items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                  ) : (
                    <Text className="text-white font-semibold">Proceed</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Toast />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
