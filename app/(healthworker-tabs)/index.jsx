import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STATS = [
  { icon: "people", label: "Total Patients", value: "24", color: "#006D5B" },
  { icon: "calendar", label: "This Week", value: "8", color: "#7C3AED" },
  {
    icon: "checkmark-circle",
    label: "Completed",
    value: "16",
    color: "#059669",
  },
  { icon: "alert-circle", label: "High Risk", value: "3", color: "#DC2626" },
];

const UPCOMING_VISITS = [
  {
    id: 1,
    patient: "Amara Chukwu",
    time: "9:00 AM",
    type: "ANC Visit",
    trimester: "3rd",
  },
  {
    id: 2,
    patient: "Fatima Bello",
    time: "11:30 AM",
    type: "Postnatal",
    trimester: "–",
  },
  {
    id: 3,
    patient: "Ngozi Osei",
    time: "2:00 PM",
    type: "ANC Visit",
    trimester: "2nd",
  },
];

export default function HealthworkerHome() {
  const router = useRouter();
  const now = new Date();
  const hours = now.getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 17
        ? "Good afternoon"
        : "Good evening";

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <View className="flex-row items-center justify-between mb-1">
            <View>
              <Text className="text-gray-500 text-[14px]">{greeting} 👋</Text>
              <Text className="text-[#293231] text-[22px] font-bold mt-1">
                Your Dashboard
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/(healthworker-tabs)/profile")}
              activeOpacity={0.7}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#293231",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="person" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-6 py-4">
          <View className="flex-row flex-wrap gap-3">
            {STATS.map((stat) => (
              <View
                key={stat.label}
                style={{
                  width: "47%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: stat.color + "15",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "700",
                    color: "#293231",
                    lineHeight: 30,
                  }}
                >
                  {stat.value}
                </Text>
                <Text className="text-gray-500 text-xs mt-1">{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-4">
          <Text className="text-[#293231] font-bold text-[16px] mb-3">
            Quick Actions
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => router.push("/(healthworker-tabs)/addPatient")}
              activeOpacity={0.8}
              className="flex-1 bg-[#293231] rounded-2xl py-4 items-center"
            >
              <Ionicons name="person-add" size={22} color="white" />
              <Text className="text-white text-xs font-semibold mt-1.5">
                Add Patient
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(healthworker-tabs)/logVisit")}
              activeOpacity={0.8}
              className="flex-1 bg-[#006D5B] rounded-2xl py-4 items-center"
            >
              <Ionicons name="clipboard" size={22} color="white" />
              <Text className="text-white text-xs font-semibold mt-1.5">
                Log Visit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(healthworker-tabs)/patients")}
              activeOpacity={0.8}
              style={{
                flex: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: "center",
                borderWidth: 1.5,
                borderColor: "#E5E7EB",
              }}
            >
              <Ionicons name="list" size={22} color="#293231" />
              <Text className="text-[#293231] text-xs font-semibold mt-1.5">
                All Patients
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Visits */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[#293231] font-bold text-[16px]">
              Today's Visits
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(healthworker-tabs)/visits")}
              activeOpacity={0.7}
            >
              <Text className="text-[#006D5B] text-[13px] font-semibold">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {UPCOMING_VISITS.map((visit) => (
            <TouchableOpacity
              key={visit.id}
              onPress={() => router.push("/(healthworker-tabs)/motherInfo")}
              activeOpacity={0.8}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#F0F0F0",
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "rgba(0,109,91,0.10)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Ionicons name="person" size={20} color="#006D5B" />
              </View>
              <View className="flex-1">
                <Text className="text-[#293231] font-semibold text-[15px]">
                  {visit.patient}
                </Text>
                <Text className="text-gray-500 text-xs mt-0.5">
                  {visit.time} · {visit.type}
                </Text>
              </View>
              {visit.trimester !== "–" && (
                <View
                  style={{
                    backgroundColor: "rgba(41,50,49,0.07)",
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text className="text-[#293231] text-xs font-semibold">
                    {visit.trimester} Tri.
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
