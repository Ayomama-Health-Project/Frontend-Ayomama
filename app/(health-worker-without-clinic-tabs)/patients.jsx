import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ─── Mock data ────────────────────────────────────────────────────────────────

const PATIENTS = [
  {
    id: "1",
    name: "Amara Chukwu",
    age: 27,
    type: "Pregnant",
    weeks: "32 weeks",
    status: "stable",
    lastVisit: "Jan 10",
  },
  {
    id: "2",
    name: "Fatima Bello",
    age: 24,
    type: "Postpartum",
    weeks: "8 weeks PP",
    status: "stable",
    lastVisit: "Jan 8",
  },
  {
    id: "3",
    name: "Ngozi Osei",
    age: 30,
    type: "Pregnant",
    weeks: "20 weeks",
    status: "monitor",
    lastVisit: "Jan 5",
  },
  {
    id: "4",
    name: "Chinwe Adeyemi",
    age: 22,
    type: "Pregnant",
    weeks: "28 weeks",
    status: "high_risk",
    lastVisit: "Dec 28",
  },
  {
    id: "5",
    name: "Rukayat Musa",
    age: 33,
    type: "Postpartum",
    weeks: "3 weeks PP",
    status: "stable",
    lastVisit: "Jan 12",
  },
  {
    id: "6",
    name: "Blessing Eze",
    age: 19,
    type: "Pregnant",
    weeks: "12 weeks",
    status: "stable",
    lastVisit: "Jan 9",
  },
];

const STATUS_CONFIG = {
  stable: { color: "#059669", bg: "rgba(5,150,105,0.10)", label: "Stable" },
  monitor: { color: "#D97706", bg: "rgba(217,119,6,0.10)", label: "Monitor" },
  high_risk: {
    color: "#DC2626",
    bg: "rgba(220,38,38,0.10)",
    label: "High Risk",
  },
};

const TYPE_CONFIG = {
  Pregnant: { color: "#7C3AED", bg: "rgba(124,58,237,0.10)" },
  Postpartum: { color: "#D97706", bg: "rgba(217,119,6,0.10)" },
};

// ─── Filter Chip ──────────────────────────────────────────────────────────────

const FilterChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={{
      paddingHorizontal: 16,
      paddingVertical: 7,
      borderRadius: 20,
      backgroundColor: active ? "#293231" : "#FFFFFF",
      borderWidth: 1,
      borderColor: active ? "#293231" : "#E5E7EB",
      marginRight: 8,
    }}
  >
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: active ? "#FFFFFF" : "#6B7280",
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── Patient Card ─────────────────────────────────────────────────────────────

const PatientCard = ({ patient, onPress }) => {
  const status = STATUS_CONFIG[patient.status];
  const typeConfig = TYPE_CONFIG[patient.type];

  return (
    <TouchableOpacity
      onPress={onPress}
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
      {/* Avatar */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: "rgba(41,50,49,0.08)",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 14,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#293231" }}>
          {patient.name.charAt(0)}
        </Text>
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-[#293231] font-semibold text-[15px]">
          {patient.name}
        </Text>
        <View className="flex-row items-center gap-2 mt-1">
          <View
            style={{
              backgroundColor: typeConfig.bg,
              borderRadius: 6,
              paddingHorizontal: 8,
              paddingVertical: 2,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "600",
                color: typeConfig.color,
              }}
            >
              {patient.type}
            </Text>
          </View>
          <Text className="text-gray-400 text-xs">{patient.weeks}</Text>
        </View>
      </View>

      {/* Status */}
      <View>
        <View
          style={{
            backgroundColor: status.bg,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{ fontSize: 11, fontWeight: "600", color: status.color }}
          >
            {status.label}
          </Text>
        </View>
        <Text className="text-gray-400 text-xs mt-1 text-right">
          {patient.lastVisit}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main ────────────────────────────────────────────────────────────────────

export default function HealthworkerPatients() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const FILTERS = ["All", "Pregnant", "Postpartum", "High Risk"];

  const filtered = PATIENTS.filter((p) => {
    const matchSearch =
      search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" ||
      (filter === "High Risk" && p.status === "high_risk") ||
      p.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <Text className="text-[#293231] text-[22px] font-bold">Patients</Text>
        <TouchableOpacity
          onPress={() => router.push("/(health-worker-without-clinic-tabs)/addPatient")}
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
          <Text className="text-white text-[13px] font-semibold">Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-6 py-3">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 16,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: "#E5E7EB",
          }}
        >
          <Ionicons name="search" size={18} color="#9CA3AF" />
          <TextInput
            placeholder="Search patients..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingLeft: 10,
              fontSize: 14,
              color: "#293231",
            }}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-6 mb-3"
        contentContainerStyle={{ paddingRight: 24 }}
      >
        {FILTERS.map((f) => (
          <FilterChip
            key={f}
            label={f}
            active={filter === f}
            onPress={() => setFilter(f)}
          />
        ))}
      </ScrollView>

      {/* Patient list */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-gray-400 text-xs mb-3">
          {filtered.length} patient{filtered.length !== 1 ? "s" : ""}
        </Text>

        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Ionicons name="people-outline" size={48} color="#D1D5DB" />
            <Text className="text-gray-400 text-base mt-3">
              No patients found
            </Text>
          </View>
        ) : (
          filtered.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onPress={() => router.push("/(health-worker-without-clinic-tabs)/motherInfo")}
            />
          ))
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
