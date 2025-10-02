import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Language = () => {
  const router = useRouter();
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
    console.log("Proceeding with:", selectedLanguage);
    router.push("/Information");
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold text-left mb-20">
        Which language do you prefer?
      </Text>

      {/* English */}
      <TouchableOpacity
        className={`py-3 rounded-xl mb-4 ${
          selectedLanguage === "English" ? "bg-black" : "bg-gray-300"
        }`}
        onPress={() => handleLanguageSelect("English")}
      >
        <Text
          className={`text-center font-semibold text-base ${
            selectedLanguage === "English" ? "text-white" : "text-black"
          }`}
        >
          English
        </Text>
      </TouchableOpacity>

      {/* Hausa */}
      <TouchableOpacity
        className={`py-3 rounded-xl mb-4 ${
          selectedLanguage === "Hausa" ? "bg-black" : "bg-gray-300"
        }`}
        onPress={() => handleLanguageSelect("Hausa")}
      >
        <Text
          className={`text-center font-semibold text-base ${
            selectedLanguage === "Hausa" ? "text-white" : "text-black"
          }`}
        >
          Hausa
        </Text>
      </TouchableOpacity>

      {/* Yoruba */}
      <TouchableOpacity
        className={`py-3 rounded-xl mb-4 ${
          selectedLanguage === "Yoruba" ? "bg-black" : "bg-gray-300"
        }`}
        onPress={() => handleLanguageSelect("Yoruba")}
      >
        <Text
          className={`text-center font-semibold text-base ${
            selectedLanguage === "Yoruba" ? "text-white" : "text-black"
          }`}
        >
          Yoruba
        </Text>
      </TouchableOpacity>

      {/* Igbo */}
      <TouchableOpacity
        className={`py-3 rounded-xl ${
          selectedLanguage === "Igbo" ? "bg-black" : "bg-gray-300"
        }`}
        onPress={() => handleLanguageSelect("Igbo")}
      >
        <Text
          className={`text-center font-semibold text-base ${
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

      {/* Proceed Button */}
      <TouchableOpacity
        className="bg-black py-3 rounded-xl mt-20"
        onPress={handleProceed}
      >
        <Text className="text-white text-center font-bold text-base">
          Proceed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Language;
