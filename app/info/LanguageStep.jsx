import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LanguageStep({ onNext }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [error, setError] = useState("");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setError("");
  };

  const handleProceed = () => {
    if (!selectedLanguage) {
      setError("Please select a language before proceeding");
      return;
    }
    onNext();
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
      {/* Next Button */}
      <TouchableOpacity
        className="bg-[#006D5B] py-4 rounded-2xl"
        onPress={handleProceed}
      >
        <Text className="text-white text-center font-bold text-base">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
