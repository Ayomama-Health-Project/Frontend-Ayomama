import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import useAuthStore from "../../store/useAuthStore";
import useTranslatorStore from "../../store/useTranslatorStore";
import { useTranslation } from "../../utils/translator";

const ios = Platform.OS === "ios";

export default function ChangeLanguage() {
  const router = useRouter();
  const { user, updateLanguagePreference, isLoading } = useAuthStore();
  const { setLanguage: setTranslatorLanguage } = useTranslatorStore();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Translate UI text
  const titleText = useTranslation("Change Language");

  const languages = [
    { id: 1, name: "English", code: "en" },
    { id: 2, name: "Yoruba", code: "yo" },
    { id: 3, name: "Hausa", code: "ha" },
    { id: 4, name: "Igbo", code: "ig" },
  ];

  // Map language code to name
  const getLanguageName = (code) => {
    const language = languages.find((lang) => lang.code === code);
    return language ? language.name : "English";
  };

  // Set initial language from user data
  useEffect(() => {
    if (user?.preferredLanguages) {
      const languageName = getLanguageName(user.preferredLanguages);
      setSelectedLanguage(languageName);
    }
  }, [user]);

  const handleBack = () => {
    router.back();
  };

  const handleSelectLanguage = async (language) => {
    setSelectedLanguage(language);

    // Get the language code
    const languageCode = languages.find((lang) => lang.name === language)?.code;

    if (!languageCode) {
      console.log("Invalid language selection");
      return;
    }

    // Update translator language immediately
    await setTranslatorLanguage(languageCode);

    // Update language preference via API immediately
    const result = await updateLanguagePreference(languageCode);

    if (result.success) {
      console.log("Language updated successfully to:", language);
    } else {
      console.log("Failed to update language:", result.error);
    }
  };

  return (
    <View className="flex-1 bg-[#FCFCFC]">
      {/* Gradient Background at Top */}
      <LinearGradient
        colors={["#BCF2E9", "#FCFCFC"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 200,
        }}
      />

      <View className="flex-1">
        {/* Header with Back Button and Title */}
        <View
          className="px-6 flex-row items-center"
          style={{ paddingTop: ios ? 64 : 76 }}
        >
          <TouchableOpacity
            onPress={handleBack}
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#293231" />
          </TouchableOpacity>

          <Text className="text-xl font-bold text-[#293231] ml-[65px]">
            {titleText}
          </Text>
        </View>

        {/* Language Options */}
        <View className="px-6 mt-10 flex-1">
          {languages.map((language, index) => (
            <TouchableOpacity
              key={language.id}
              onPress={() => handleSelectLanguage(language.name)}
              className="bg-white rounded-2xl mb-4 px-4 py-[14px] flex-row items-center justify-between border border-[#E5E5E5]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
              disabled={isLoading}
            >
              <Text className="text-[16px] font-medium text-[#293231]">
                {language.name}
              </Text>

              {/* Radio Button */}
              <View
                className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  selectedLanguage === language.name
                    ? "border-[#006D5B]"
                    : "border-[#D1D5DB]"
                }`}
              >
                {selectedLanguage === language.name && (
                  <View className="w-3.5 h-3.5 rounded-full bg-[#006D5B]" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
