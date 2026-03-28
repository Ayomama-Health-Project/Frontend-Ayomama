import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppAuth from "../hooks/useAppAuth";
import { getAppLanguage, setAppLanguage } from "../utils/appLanguage";
import { useTranslation } from "../utils/translator";

const LANGUAGES = [
  { id: 1, name: "English", code: "en" },
  { id: 2, name: "Yoruba", code: "yo" },
  { id: 3, name: "Hausa", code: "ha" },
  { id: 4, name: "Igbo", code: "ig" },
];

export default function LanguagePickerPage() {
  const router = useRouter();
  const { updateLanguagePreference, account } = useAppAuth();
  const [selectedLanguage, setSelectedLanguage] = useState(getAppLanguage());
  const [isSaving, setIsSaving] = useState(false);

  const titleText = useTranslation("Choose language");
  const subtitleText = useTranslation(
    "Select the language you want AYOMAMA to use across your experience.",
  );
  const updatedTitleText = useTranslation("Language updated");
  const updatedBodyText = useTranslation("Your language preference has been saved.");

  useEffect(() => {
    setSelectedLanguage(getAppLanguage());
  }, []);

  const handleSelectLanguage = async (languageCode) => {
    if (isSaving || languageCode === selectedLanguage) {
      router.back();
      return;
    }

    setSelectedLanguage(languageCode);
    setIsSaving(true);

    try {
      await setAppLanguage(languageCode);
      if (account) {
        await updateLanguagePreference(languageCode);
      }
      Toast.show({
        type: "success",
        text1: updatedTitleText,
        text2: updatedBodyText,
      });
      router.back();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top", "bottom"]}>
      <View className="flex-1 px-6 pt-4">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="h-12 w-12 items-center justify-center rounded-full border border-[#DDE8E5] bg-white"
          >
            <Ionicons name="arrow-back" size={22} color="#293231" />
          </Pressable>

          <View className="h-12 w-12 items-center justify-center rounded-full bg-[#F4F7F6]">
            <Ionicons name="language-outline" size={20} color="#006D5B" />
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-[24px] font-bold text-[#293231]">{titleText}</Text>
          <Text className="mt-2 text-[14px] leading-6 text-[#6B7280]">
            {subtitleText}
          </Text>
        </View>

        <ScrollView
          className="mt-8 flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View className="gap-3">
            {LANGUAGES.map((language) => {
              const active = selectedLanguage === language.code;
              return (
                <Pressable
                  key={language.id}
                  onPress={() => handleSelectLanguage(language.code)}
                  disabled={isSaving}
                  className={`flex-row items-center justify-between rounded-[22px] border px-4 py-4 ${
                    active
                      ? "border-[#006D5B] bg-[#EAF7F4]"
                      : "border-[#E3E8E7] bg-white"
                  }`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`h-12 w-12 items-center justify-center rounded-[16px] ${
                        active ? "bg-[#006D5B]" : "bg-[#F4F7F6]"
                      }`}
                    >
                      <Text className={`text-[13px] font-bold ${active ? "text-white" : "text-[#5F6C6B]"}`}>
                        {language.code.toUpperCase()}
                      </Text>
                    </View>
                    <View className="ml-3">
                      <Text className="text-[16px] font-semibold text-[#293231]">
                        {language.name}
                      </Text>
                      <Text className="mt-1 text-[12px] text-[#7B8786]">
                        {active ? "Currently selected" : "Tap to switch language"}
                      </Text>
                    </View>
                  </View>

                  {isSaving && active ? (
                    <ActivityIndicator size="small" color="#006D5B" />
                  ) : active ? (
                    <Ionicons name="checkmark-circle" size={24} color="#006D5B" />
                  ) : (
                    <View className="h-5 w-5 rounded-full border border-[#D3DBD9]" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
