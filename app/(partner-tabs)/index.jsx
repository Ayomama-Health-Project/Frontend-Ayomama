import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppAuth from "../../hooks/useAppAuth";
import { useTranslation } from "../../utils/translator";

export default function PartnerHome() {
  const router = useRouter();
  const { account } = useAppAuth();
  const greetingText = useTranslation("Welcome back");
  const deliveryText = useTranslation("Her Expected Delivery Date (EDD)");
  const checklistText = useTranslation("Her Daily Checklist");
  const remindersText = useTranslation("Routine & Vitamins Reminders");
  const remindersSubtext = useTranslation("Stay on track with her daily health routine");
  const viewRemindersText = useTranslation("View Reminders");
  const developmentText = useTranslation("Baby's Development");
  const supportText = useTranslation("How you can support her today");
  const name = account?.profile?.fullName?.split(" ")[0] || "Papa James";

  const checklist = [
    { id: "supplement", image: require("../../assets/images/ironSupplement.png"), label: "Take iron supplement" },
    { id: "water", image: require("../../assets/images/water.png"), label: "Drink 8 glasses of water" },
    { id: "walk", image: require("../../assets/images/shoe.png"), label: "30 mins walk" },
  ];

  const reminderItems = [
    "Folic Acid · 09:30am",
    "Prenatal Vitamins · 12:00pm",
    "Iron · 02:00pm",
  ];

  const supportTips = [
    "Prepare a nourishing meal she can enjoy with ease.",
    "Offer to attend the next clinic appointment together.",
    "Check in on her comfort, rest, and hydration today.",
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#DDF4EE", "#FBEAE3"]}
          className="px-5 pt-5 pb-8 rounded-b-[32px]"
        >
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-[#8F8D8D]">{greetingText}</Text>
              <Text className="mt-0.5 text-xl font-bold text-[#293231]">{name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              className="h-10 w-10 items-center justify-center rounded-full bg-white/80"
            >
              <Ionicons name="notifications" size={20} color="#293231" />
            </TouchableOpacity>
          </View>

          <View className="rounded-[28px] bg-white/70 p-4">
            <View className="rounded-[24px] border border-[#FF8A57] px-4 py-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <View className="self-start rounded-[18px] bg-white/80 px-4 py-2">
                    <Text className="text-[20px] font-semibold text-[#293231]">Week 18</Text>
                  </View>
                  <Text className="mt-4 text-[14px] leading-6 text-[#293231]">
                    Baby Zion is now about the size of a lime. Tiny fingers and toes are forming.
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/infant.png")}
                  className="h-[128px] w-[92px]"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </LinearGradient>

        <View className="px-5 pb-8">
          <View className="-mt-5 mb-5 rounded-[24px] border border-[#63E1CF] bg-white px-5 py-5">
            <Text className="text-center text-[17px] font-semibold text-[#293231]">
              {deliveryText}
            </Text>
            <Text className="mt-4 text-center text-[14px] font-medium text-[#293231]">
              Date:
              <Text className="text-[20px] font-semibold text-[#16AD96]"> 23/12/2025</Text>
            </Text>
          </View>

          <LinearGradient
            colors={["rgba(141,212,201,0.3)", "rgba(255,127,80,0.24)"]}
            className="mb-5 rounded-[30px] p-4"
          >
            <Text className="mb-4 text-[20px] font-semibold text-[#293231]">{checklistText}</Text>
            {checklist.map((item) => (
              <View key={item.id} className="mb-3 flex-row items-center rounded-[26px] bg-white px-3 py-3">
                <Image source={item.image} className="mr-3 h-11 w-11" resizeMode="contain" />
                <Text className="flex-1 text-[14px] text-[#293231]">{item.label}</Text>
                <Ionicons name="checkbox-outline" size={18} color="#293231" />
              </View>
            ))}
          </LinearGradient>

          <View className="mb-5 rounded-[20px] border border-[#FB8C00] bg-white px-4 py-5">
            <Text className="text-center text-[16px] font-medium text-[#293231]">
              {remindersText}
            </Text>
            <Text className="mt-2 text-center text-[12px] text-[#5C6664]">
              {remindersSubtext}
            </Text>
            <View className="mt-5 gap-3">
              {reminderItems.map((item, index) => (
                <View key={item} className="flex-row items-center justify-between rounded-[15px] bg-[#D7EEEA] px-4 py-4">
                  <View className="flex-row items-center">
                    <Ionicons name="notifications" size={18} color="#293231" />
                    <Text className="ml-3 text-[14px] text-[#293231]">{item}</Text>
                  </View>
                  <View className={`h-3 w-6 rounded-full ${index === 0 ? "bg-[#00D2B3]" : "bg-[#B8B8B8]"}`} />
                </View>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(partner-tabs)/visit")}
              activeOpacity={0.84}
              className="mt-5 h-10 items-center justify-center rounded-[10px] bg-[#006D5B]"
            >
              <Text className="text-[15px] font-semibold text-white">{viewRemindersText}</Text>
            </TouchableOpacity>
          </View>

          <View className="rounded-[20px] border border-[#00D2B3] bg-white px-4 py-5">
            <Text className="text-[20px] font-semibold text-[#293231]">
              {developmentText}
            </Text>
            <View className="mt-4 items-center">
              <LinearGradient colors={["rgba(141,212,201,0.3)", "rgba(255,127,80,0.24)"]} className="rounded-[20px] p-3">
                <Image source={require("../../assets/images/infant.png")} className="h-[128px] w-[92px]" resizeMode="contain" />
              </LinearGradient>
            </View>
            <View className="mt-4 rounded-[20px] border border-[#00D2B3] px-4 py-4">
              <Text className="mb-2 text-[14px] text-[#293231]">• Your baby can now hear sounds</Text>
              <Text className="mb-2 text-[14px] text-[#293231]">• Your baby’s fingers and toes are growing</Text>
              <Text className="text-[14px] text-[#293231]">• Your baby can move actively</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/babyDevelopment/development")}
              activeOpacity={0.84}
              className="mt-4 h-10 items-center justify-center rounded-[10px] bg-[#006D5B]"
            >
              <Text className="text-[15px] font-semibold text-white">Learn more about week 18</Text>
            </TouchableOpacity>
          </View>

          <Text className="mb-3 mt-6 text-sm font-semibold text-[#293231]">
            {supportText}
          </Text>
          {supportTips.map((tip, index) => (
            <View
              key={tip}
              className="mb-3 flex-row items-start rounded-2xl bg-white px-4 py-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
              }}
            >
              <View className="mr-3 mt-0.5 h-8 w-8 items-center justify-center rounded-full bg-[#293231]">
                <Text className="text-xs font-bold text-white">{index + 1}</Text>
              </View>
              <Text className="flex-1 text-sm leading-5 text-gray-600">{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
