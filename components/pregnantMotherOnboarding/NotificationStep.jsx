import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";

const NOTIFICATION_PREVIEW =
  "https://www.figma.com/api/mcp/asset/070188e8-50d7-43c2-86b1-fb4d2f27acfd";

function PreviewCard({ text, topClassName }) {
  const translatedText = useTranslation(text);
  return (
    <View
      className={`absolute left-1/2 z-20 h-[57px] w-[359px] -translate-x-1/2 rounded-[15px] bg-white px-6 py-3 shadow ${topClassName}`}
    >
      <Text className="text-[12px] font-light text-[#293231]">{translatedText}</Text>
    </View>
  );
}

export default function NotificationStep({
  onEnableNotifications,
  onSkipNotifications,
  title = "Never miss out on your daily routine",
  description = "When turn on, we will remind you of all your activities through out day",
  primaryLabel = "Turn on notification",
  secondaryLabel = "Another time",
  primaryLoading = false,
  secondaryLoading = false,
}) {
  const translatedTitle = useTranslation(title);
  const translatedDescription = useTranslation(description);
  const translatedPrimaryLabel = useTranslation(primaryLabel);
  const translatedSecondaryLabel = useTranslation(secondaryLabel);
  const pleaseWaitText = useTranslation("Please wait...");
  return (
    <View className="flex-1">
      <View className="items-center pt-2">
        <View className="relative h-[538px] w-full items-center">
          <Image
            source={{ uri: NOTIFICATION_PREVIEW }}
            className="absolute top-[-6px] h-[838px] w-[403px]"
            resizeMode="contain"
          />

          <PreviewCard
            text="Don’t forget to use your drug it is essential for your well being"
            topClassName="top-[184px]"
          />
          <PreviewCard
            text="Studies shows that hydration solves more than 50 % to boost immunity"
            topClassName="top-[262px]"
          />

          <View className="absolute bottom-0 left-0 right-0 h-[80px] bg-[#FCFCFC]/90" />
          <View className="absolute bottom-0 left-0 right-0 h-[120px] bg-[#FCFCFC]" />
        </View>

        <View className="mt-2 w-[338px] items-center">
          <Text className="text-center text-[24px] font-medium text-[#293231]">
            {translatedTitle}
          </Text>
          <Text className="mt-[15px] text-center text-[14px] font-medium leading-6 text-[#293231]/80">
            {translatedDescription}
          </Text>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={onEnableNotifications}
            disabled={primaryLoading || secondaryLoading}
            className="mt-6 h-[46px] w-full items-center justify-center rounded-[15px] bg-[#006D5B]"
          >
            {primaryLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text className="ml-2 text-[14px] font-semibold text-white">
                  {translatedPrimaryLabel}
                </Text>
              </View>
            ) : (
              <Text className="text-[14px] font-semibold text-white">
                {translatedPrimaryLabel}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.86}
            onPress={onSkipNotifications}
            disabled={primaryLoading || secondaryLoading}
          >
            <Text className="mt-[11px] text-[14px] font-medium text-[#293231]/80">
              {secondaryLoading ? pleaseWaitText : translatedSecondaryLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
