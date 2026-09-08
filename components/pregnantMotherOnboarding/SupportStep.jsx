import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Share, Text, TouchableOpacity, View } from "react-native";
import { useTranslations, useTranslation } from "../../utils/translator";
import { SUPPORT_OPTIONS } from "./constants";
import { StepHeading } from "./shared";

export default function SupportStep({
  supportSelection,
  setSupportSelection,
  generatedInvite,
  onGenerateInvite,
  isGeneratingInvite,
}) {
  const titleText = useTranslation("Support Circle");
  const subtitleText = useTranslation("Who’s joining you on this journey?");
  const generatingCodeText = useTranslation("Generating code...");
  const generateNewCodeText = useTranslation("Generate New Invite Code");
  const generateCodeText = useTranslation("Generate Invite Code");
  const inviteCodeText = useTranslation("Invite code");
  const inviteHintText = useTranslation(
    "Share this code with your partner, spouse, family member, or friend. Generating a new code will replace this one.",
  );
  const shareInviteText = useTranslation("Share invite");
  const shareMessageText = useTranslation(
    "Hello,\n\nI’d love you to join me on AYOMAMA as part of my support circle.\n\nYour invite code is:",
  );
  const shareUseCodeText = useTranslation(
    "Please use the code during sign up to connect with my account.",
  );
  const supportOptionLabels = useTranslations(SUPPORT_OPTIONS.map((option) => option.label));
  const handleShareInvite = async () => {
    if (!generatedInvite?.inviteCode) return;
    await Share.share({
      message: `${shareMessageText} ${generatedInvite.inviteCode}${
        generatedInvite?.inviteUrl
          ? `\n${generatedInvite.inviteUrl}`
          : ""
      }\n\n${shareUseCodeText}`,
      url: generatedInvite.inviteUrl,
    });
  };

  return (
    <View className="flex-1">
      <StepHeading title={titleText} subtitle={subtitleText} />

      <View className="px-5 pt-8 gap-[14px]">
        {SUPPORT_OPTIONS.map((option) => {
          const active = supportSelection === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.88}
              onPress={() => setSupportSelection(option.id)}
              className={`h-[46px] flex-row items-center rounded-[10px] px-[18px] ${
                active ? "border border-[#006D5B] bg-white" : "bg-white"
              }`}
            >
              <Ionicons name={option.icon} size={20} color="#293231" />
              <Text className="ml-7 text-[16px] font-medium text-[#293231]">
                {supportOptionLabels[SUPPORT_OPTIONS.findIndex((item) => item.id === option.id)] || option.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onGenerateInvite}
          disabled={isGeneratingInvite}
          className="mt-10 h-[46px] flex-row items-center justify-center rounded-[10px] bg-[#006D5B]"
        >
          {isGeneratingInvite ? (
            <>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text className="ml-3 text-[16px] font-medium text-white">{generatingCodeText}</Text>
            </>
          ) : (
            <>
              <Text className="mr-3 text-[16px] font-medium text-white">
                {generatedInvite?.inviteCode ? generateNewCodeText : generateCodeText}
              </Text>
              <Ionicons name="key-outline" size={22} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>

        {generatedInvite?.inviteCode ? (
          <View className="rounded-[18px] border border-[#B7D7D1] bg-white px-4 py-4">
            <Text className="text-[12px] font-semibold uppercase tracking-[1px] text-[#6D7E7A]">
              {inviteCodeText}
            </Text>
            <Text className="mt-2 text-[22px] font-bold tracking-[1.5px] text-[#006D5B]">
              {generatedInvite.inviteCode}
            </Text>
            <Text className="mt-2 text-[13px] leading-5 text-[#6D7E7A]">
              {inviteHintText}
            </Text>
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleShareInvite}
              className="mt-4 h-[42px] flex-row items-center justify-center rounded-[12px] bg-[#EEF7F5]"
            >
              <Ionicons name="share-social-outline" size={18} color="#006D5B" />
              <Text className="ml-2 text-[14px] font-semibold text-[#006D5B]">
                {shareInviteText}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}
