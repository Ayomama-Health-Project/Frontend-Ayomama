import { Text, TouchableOpacity, View } from "react-native";
import { LANGUAGES } from "./constants";
import { StepHeading } from "./shared";
import { useTranslation } from "../../utils/translator";

export default function LanguageStep({
  selectedLanguage,
  setSelectedLanguage,
  onSelectLanguage,
}) {
  const titleText = useTranslation("Which Language do you prefer?");
  return (
    <View className="flex-1">
      <StepHeading
        title={titleText}
        subtitle=""
      />

      <View className="px-5 pt-[42px] gap-[19px]">
        {LANGUAGES.map((language) => {
          const active = selectedLanguage === language.id;
          return (
            <TouchableOpacity
              key={language.id}
              activeOpacity={0.88}
              onPress={() => {
                setSelectedLanguage(language.id);
                onSelectLanguage?.(language.id);
              }}
              className={`h-[49px] items-center justify-center rounded-[15px] ${
                active ? "border border-[#006D5B] bg-white" : "bg-white"
              }`}
            >
              <Text className="text-[16px] font-medium text-[#293231]">
                {language.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
