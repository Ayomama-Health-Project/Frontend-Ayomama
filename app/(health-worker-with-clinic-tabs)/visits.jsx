import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Mock data ────────────────────────────────────────────────────────────────

const VISITS = [
  {
    id: "1",
    patient: "Amara Chukwu",
    date: "Today, 9:00 AM",
    type: "ANC Visit",
    status: "upcoming",
    notes: "32-week checkup",
  },
  {
    id: "2",
    patient: "Fatima Bello",
    date: "Today, 11:30 AM",
    type: "Postnatal",
    status: "upcoming",
    notes: "Postnatal check week 8",
  },
  {
    id: "3",
    patient: "Ngozi Osei",
    date: "Today, 2:00 PM",
    type: "ANC Visit",
    status: "upcoming",
    notes: "20-week anatomy scan follow-up",
  },
  {
    id: "4",
    patient: "Chinwe Adeyemi",
    date: "Jan 10, 10:00 AM",
    type: "Emergency",
    status: "completed",
    notes: "Elevated BP management",
  },
  {
    id: "5",
    patient: "Rukayat Musa",
    date: "Jan 9, 3:30 PM",
    type: "Postnatal",
    status: "completed",
    notes: "Week 2 nursing assessment",
  },
  {
    id: "6",
    patient: "Blessing Eze",
    date: "Jan 8, 9:00 AM",
    type: "ANC Visit",
    status: "completed",
    notes: "First trimester screening",
  },
];

const TYPE_CONFIG = {
  "ANC Visit": { color: "#7C3AED", bg: "rgba(124,58,237,0.10)" },
  Postnatal: { color: "#059669", bg: "rgba(5,150,105,0.10)" },
  Emergency: { color: "#DC2626", bg: "rgba(220,38,38,0.10)" },
};

// ─── Components ───────────────────────────────────────────────────────────────

const TabPill = ({ label, active, onPress, count }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      flex: 1,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: active ? "#293231" : "transparent",
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
    }}
  >
    <Text
      style={{
        fontSize: 14,
        fontWeight: "600",
        color: active ? "#FFFFFF" : "#6B7280",
      }}
    >
      {label}
    </Text>
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: active ? "rgba(255,255,255,0.2)" : "#E5E7EB",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: active ? "#FFFFFF" : "#9CA3AF",
        }}
      >
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

const VisitCard = ({ visit, onPress }) => {
  const typeConfig = TYPE_CONFIG[visit.type] || {
    color: "#293231",
    bg: "rgba(41,50,49,0.08)",
  };
  const isDone = visit.status === "completed";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      {/* Left accent stripe */}
      <View
        style={{
          width: 4,
          borderRadius: 2,
          backgroundColor: isDone ? "#E5E7EB" : typeConfig.color,
          alignSelf: "stretch",
          marginRight: 14,
        }}
      />

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[#293231] font-semibold text-[15px]">
            {visit.patient}
          </Text>
          <View
            style={{
              backgroundColor: isDone ? "#F3F4F6" : typeConfig.bg,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 3,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: isDone ? "#9CA3AF" : typeConfig.color,
              }}
            >
              {visit.type}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Ionicons
            name="time-outline"
            size={13}
            color={isDone ? "#D1D5DB" : "#9CA3AF"}
          />
          <Text
            style={{
              fontSize: 12,
              color: isDone ? "#D1D5DB" : "#6B7280",
            }}
          >
            {visit.date}
          </Text>
        </View>

        {visit.notes ? (
          <Text
            style={{
              marginTop: 6,
              fontSize: 13,
              color: isDone ? "#D1D5DB" : "#6B7280",
              fontStyle: "italic",
            }}
          >
            {visit.notes}
          </Text>
        ) : null}
      </View>

      {isDone && (
        <Ionicons
          name="checkmark-circle"
          size={20}
          color="#D1D5DB"
          style={{ marginLeft: 8, marginTop: 2 }}
        />
      )}
    </TouchableOpacity>
  );
};

// ─── Main ────────────────────────────────────────────────────────────────────

export default function HealthworkerVisits() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcoming = VISITS.filter((v) => v.status === "upcoming");
  const completed = VISITS.filter((v) => v.status === "completed");
  const displayVisits = activeTab === "upcoming" ? upcoming : completed;

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <Text className="text-[#293231] text-[22px] font-bold">Visits</Text>
        <TouchableOpacity
          onPress={() => router.push("/(health-worker-with-clinic-tabs)/logVisit")}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#293231",
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 8,
            gap: 6,
          }}
        >
          <Ionicons name="add" size={18} color="white" />
          <Text className="text-white text-[13px] font-semibold">
            Log Visit
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab selector */}
      <View className="px-6 py-3">
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#F3F4F6",
            borderRadius: 14,
            padding: 4,
          }}
        >
          <TabPill
            label="Upcoming"
            active={activeTab === "upcoming"}
            onPress={() => setActiveTab("upcoming")}
            count={upcoming.length}
          />
          <TabPill
            label="Completed"
            active={activeTab === "completed"}
            onPress={() => setActiveTab("completed")}
            count={completed.length}
          />
        </View>
      </View>

      {/* Visit list */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-gray-400 text-xs mb-3">
          {displayVisits.length} visit{displayVisits.length !== 1 ? "s" : ""}
        </Text>

        {displayVisits.length === 0 ? (
          <View className="items-center py-16">
            <Ionicons name="calendar-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 text-base mt-3">
              No visits found
            </Text>
          </View>
        ) : (
          displayVisits.map((visit) => (
            <VisitCard
              key={visit.id}
              visit={visit}
              onPress={() => router.push("/(health-worker-with-clinic-tabs)/motherInfo")}
            />
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
