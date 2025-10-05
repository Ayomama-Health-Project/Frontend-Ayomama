import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import useAuthStore from "../../store/useAuthStore";

export default function LanguageStep({ onNext }) {
  const { updateLanguagePreference, isLoading } = useAuthStore();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [error, setError] = useState("");

  // Map display language to backend enum values
  const languageMap = {
    English: "en",
    Yoruba: "yo",
    Hausa: "ha",
    Igbo: "ig",
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setError("");
  };

  const handleProceed = async () => {
    if (!selectedLanguage) {
      setError("Please select a language before proceeding");
      return;
    }

    // Get the backend language code
    const languageCode = languageMap[selectedLanguage];

    // Update language preference via API
    const result = await updateLanguagePreference(languageCode);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Language Updated",
        text2: `Your preferred language is set to ${selectedLanguage}`,
        position: "top",
        visibilityTime: 2000,
      });
      onNext();
    } else {
      setError(result.error || "Failed to update language preference");
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: result.error || "Failed to update language preference",
        position: "top",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View className="flex-1 px-6 py-8 justify-between">
      <View>
        {/* Title */}
        <Text className="text-2xl font-bold text-left mb-10">
          Which language do you prefer?
        </Text>
        {/* English */}
        <TouchableOpacity
          className={`px-4 py-[14px] rounded-2xl mb-4 border flex-row justify-center items-center ${
            selectedLanguage === "English"
              ? "bg-black border-black"
              : "bg-[#FCFCFC] border-gray-300"
          }`}
          onPress={() => handleLanguageSelect("English")}
        >
          <Text
            className={`text-base text-center ${
              selectedLanguage === "English" ? "text-white" : "text-black"
            }`}
          >
            English
          </Text>
        </TouchableOpacity>
        {/* Hausa */}
        <TouchableOpacity
          className={`px-4 py-[14px] rounded-2xl mb-4 border flex-row justify-center items-center ${
            selectedLanguage === "Hausa"
              ? "bg-black border-black"
              : "bg-[#FCFCFC] border-gray-300"
          }`}
          onPress={() => handleLanguageSelect("Hausa")}
        >
          <Text
            className={`text-base text-center ${
              selectedLanguage === "Hausa" ? "text-white" : "text-black"
            }`}
          >
            Hausa
          </Text>
        </TouchableOpacity>
        {/* Yoruba */}
        <TouchableOpacity
          className={`px-4 py-[14px] rounded-2xl mb-4 border flex-row justify-center items-center ${
            selectedLanguage === "Yoruba"
              ? "bg-black border-black"
              : "bg-[#FCFCFC] border-gray-300"
          }`}
          onPress={() => handleLanguageSelect("Yoruba")}
        >
          <Text
            className={`text-base text-center ${
              selectedLanguage === "Yoruba" ? "text-white" : "text-black"
            }`}
          >
            Yoruba
          </Text>
        </TouchableOpacity>
        {/* Igbo */}
        <TouchableOpacity
          className={`px-4 py-[14px] rounded-2xl border flex-row justify-center items-center ${
            selectedLanguage === "Igbo"
              ? "bg-black border-black"
              : "bg-[#FCFCFC] border-gray-300"
          }`}
          onPress={() => handleLanguageSelect("Igbo")}
        >
          <Text
            className={`text-base text-center ${
              selectedLanguage === "Igbo" ? "text-white" : "text-black"
            }`}
          >
            Igbo
          </Text>
        </TouchableOpacity>
        {/* Error message */}
        {error ? (
          <Text className="text-red-500 text-sm mt-4 text-center">{error}</Text>
        ) : null}
      </View>

      {/* Proceed Button */}
      <TouchableOpacity
        className="bg-black py-5 rounded-2xl"
        onPress={handleProceed}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text className="text-white text-center font-bold text-base">
            Proceed
          </Text>
        )}
      </TouchableOpacity>

      {/* Toast component */}
      <Toast />
    </View>
  );
}
