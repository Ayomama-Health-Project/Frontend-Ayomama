import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import { StepHeading } from "./shared";

export default function AntenatalStep({
  startedAntenatal,
  setStartedAntenatal,
}) {
  const titleText = useTranslation("Antenatal");
  const subtitleText = useTranslation("Have you started antinental");
  const yesStartedText = useTranslation("Yes I’ve Started");
  const notYetText = useTranslation("Not Yet");
  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle={subtitleText} />

      <View className="px-5 pt-4">
        <View className="flex-row gap-[13px]">
          {[
            { key: "yes", label: yesStartedText },
            { key: "no", label: notYetText },
          ].map((item) => {
            const active = startedAntenatal === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.88}
                onPress={() => setStartedAntenatal(item.key)}
                className={`h-[46px] flex-1 flex-row items-center justify-between rounded-[10px] px-[17px] ${
                  active ? "border border-[#006D5B] bg-white" : "bg-white"
                }`}
              >
                <Text className="text-[12px] font-medium text-[#293231]/50">
                  {item.label}
                </Text>
                <View
                  className={`h-5 w-5 rounded-full border ${
                    active ? "border-[#006D5B] bg-[#006D5B]" : "border-[#D4D4D4] bg-[#D4D4D4]"
                  }`}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
