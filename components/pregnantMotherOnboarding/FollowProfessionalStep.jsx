import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../utils/translator";
import { StepHeading } from "./shared";

function ProfessionalCard({ professional, followed, onToggle }) {
  const followingText = useTranslation("Following");
  const followText = useTranslation("Follow");
  return (
    <View className="rounded-[16px] bg-white p-4">
      <View className="flex-row items-center">
        <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-[#EAF3F1]">
          <Text className="text-[20px] font-bold text-[#006D5B]">
            {getInitials(professional.fullName)}
          </Text>
        </View>

        <View className="ml-4 flex-1">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[15px] font-semibold text-[#293231]">
                {professional.fullName}
              </Text>
              <Text className="mt-1 text-[12px] leading-5 text-[#586664]">
                {professional.subtitle}
              </Text>
              <View className="mt-3 self-start rounded-full bg-[#EEF7F5] px-3 py-1.5">
                <Text className="text-[11px] font-semibold uppercase tracking-[1px] text-[#006D5B]">
                  {professional.clinicLabel}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.88}
              onPress={onToggle}
              className={`rounded-[12px] px-4 py-2 ${
                followed ? "bg-[#006D5B]" : "bg-[#F6E3DA]"
              }`}
            >
              <Text className={`text-[12px] font-semibold ${followed ? "text-white" : "text-black"}`}>
                {followed ? followingText : followText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function FollowProfessionalStep({
  followedProfessionals,
  toggleProfessional,
  professionals,
  isLoading,
}) {
  const titleText = useTranslation("Follow Health Professionals");
  const subtitleText = useTranslation(
    "Discover registered professionals on AYOMAMA and choose who you want to follow.",
  );
  const loadingText = useTranslation("Loading health professionals...");
  const emptyTitleText = useTranslation("No professionals available yet");
  const emptySubtitleText = useTranslation(
    "Registered health professionals will appear here once accounts are active.",
  );
  return (
    <View className="flex-1">
      <StepHeading
        title={titleText}
        subtitle={subtitleText}
      />

      <View className="px-5 pt-[18px] gap-4">
        {isLoading ? (
          <View className="items-center rounded-[18px] bg-white px-5 py-10">
            <ActivityIndicator size="large" color="#006D5B" />
            <Text className="mt-4 text-[14px] text-[#6B7280]">
              {loadingText}
            </Text>
          </View>
        ) : null}

        {!isLoading && professionals.length === 0 ? (
          <View className="items-center rounded-[18px] bg-white px-5 py-10">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-[#EEF7F5]">
              <Ionicons name="medkit-outline" size={22} color="#006D5B" />
            </View>
            <Text className="mt-4 text-[15px] font-semibold text-[#293231]">
              {emptyTitleText}
            </Text>
            <Text className="mt-2 text-center text-[13px] leading-5 text-[#6B7280]">
              {emptySubtitleText}
            </Text>
          </View>
        ) : null}

        {!isLoading
          ? professionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
                followed={followedProfessionals.includes(professional.id)}
                onToggle={() => toggleProfessional(professional.id)}
              />
            ))
          : null}
      </View>
    </View>
  );
}

function getInitials(name) {
  return (name || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
