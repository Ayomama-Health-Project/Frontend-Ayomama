import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../../utils/translator";

const InfoCard = ({ icon, label, value, color, bg }) => (
  <View
    className="flex-1 rounded-2xl px-4 py-4 mx-1"
    style={{
      backgroundColor: bg,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    }}
  >
    <View
      className="w-9 h-9 rounded-full items-center justify-center mb-2"
      style={{ backgroundColor: color + "20" }}
    >
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <Text className="text-xs text-gray-400">{label}</Text>
    <Text className="text-base font-bold mt-0.5" style={{ color: "#293231" }}>
      {value}
    </Text>
  </View>
);

const TipCard = ({ tip, index }) => (
  <View
    className="bg-white rounded-2xl px-4 py-4 mb-3 flex-row items-start"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      elevation: 2,
    }}
  >
    <View className="w-8 h-8 rounded-full bg-[#293231] items-center justify-center mr-3 mt-0.5">
      <Text className="text-white text-xs font-bold">{index + 1}</Text>
    </View>
    <Text className="flex-1 text-sm text-gray-600 leading-5">{tip}</Text>
  </View>
);

export default function PartnerHome() {
  const router = useRouter();

  const greetingText = useTranslation("Welcome back");
  const pregnancyWeekText = useTranslation("Pregnancy Week");
  const trimesterText = useTranslation("Trimester");
  const daysLeftText = useTranslation("Days Left");
  const babyWeightText = useTranslation("Est. Weight");
  const howToHelpText = useTranslation("How You Can Help This Week");
  const messageMomText = useTranslation("Message Your Partner");

  const tips = [
    useTranslation("Remind her to take her prenatal vitamins today."),
    useTranslation("Offer to attend the next antenatal appointment together."),
    useTranslation("Prepare a healthy meal she can enjoy without effort."),
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#293231", "#3D4F4E"]}
          className="px-6 pt-4 pb-10 rounded-b-3xl"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-white/70 text-sm">{greetingText}</Text>
              <Text className="text-white text-xl font-bold mt-0.5">
                Partner
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              className="w-10 h-10 rounded-full bg-white/15 items-center justify-center"
            >
              <Ionicons name="notifications-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="bg-white/10 rounded-2xl px-4 py-3">
            <Text className="text-white/70 text-xs mb-1">Baby's journey</Text>
            <Text className="text-white text-2xl font-bold">Week 28</Text>
            <Text className="text-white/70 text-xs mt-0.5">
              Size of an eggplant · 3rd Trimester
            </Text>
          </View>
        </LinearGradient>

        <View className="px-5 -mt-5">
          <View className="flex-row mb-4">
            <InfoCard
              icon="calendar"
              label={pregnancyWeekText}
              value="28 / 40"
              color="#6366F1"
              bg="#fff"
            />
            <InfoCard
              icon="time"
              label={daysLeftText}
              value="84 days"
              color="#EC4899"
              bg="#fff"
            />
            <InfoCard
              icon="scale"
              label={babyWeightText}
              value="1.1 kg"
              color="#22C55E"
              bg="#fff"
            />
          </View>

          <TouchableOpacity
            onPress={() => router.push("/(partner-tabs)/messages")}
            className="bg-[#293231] rounded-2xl px-5 py-4 flex-row items-center justify-between mb-5"
            style={{
              shadowColor: "#293231",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="chatbubbles" size={20} color="#fff" />
              <Text className="text-white font-semibold ml-3">
                {messageMomText}
              </Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <Text className="text-sm font-semibold text-[#293231] mb-3">
            {howToHelpText}
          </Text>
          {tips.map((tip, i) => (
            <TipCard key={i} tip={tip} index={i} />
          ))}
          <View className="h-6" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
