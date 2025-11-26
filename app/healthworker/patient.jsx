import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTranslation } from "../../utils/translator";

const isIOS = Platform.OS === "ios";

export default function Patient() {
  const router = useRouter();
  const mothersUnderCareText = useTranslation("Mothers Under Your Care");
  const viewAllText = useTranslation("View All");
  const viewText = useTranslation("View");
  const nextVisitText = useTranslation("Next Visit");
  const lastVisitText = useTranslation("Last Visit");
  const searchPlaceholderText = useTranslation("Search Mothers");
  const noResultsText = useTranslation("No mothers found");
  const safeText = useTranslation("Safe");
  const monitorText = useTranslation("Monitor");
  const urgentText = useTranslation("Urgent");
  const resultsFoundText = useTranslation("result(s) found");
  const loadingText = useTranslation("Loading...");
  const tryAdjustingText = useTranslation("Try adjusting your search terms");

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in production, this would come from an API or database
  const mothersUnderCare = [
    {
      id: 1,
      name: "Amara Okafor",
      weeks: "24 weeks pregnant",
      nextVisit: "Oct 8, 2025",
      lastVisit: "Oct 8, 2025",
      status: "safe",
    },
    {
      id: 2,
      name: "Chioma Eze",
      weeks: "18 weeks pregnant",
      nextVisit: "Oct 15, 2025",
      lastVisit: "Oct 1, 2025",
      status: "monitor",
    },
    {
      id: 3,
      name: "Ngozi Adebayo",
      weeks: "32 weeks pregnant",
      nextVisit: "Oct 5, 2025",
      lastVisit: "Sep 28, 2025",
      status: "urgent",
    },
    {
      id: 4,
      name: "Fatima Ibrahim",
      weeks: "12 weeks pregnant",
      nextVisit: "Oct 22, 2025",
      lastVisit: "Oct 8, 2025",
      status: "safe",
    },
    {
      id: 5,
      name: "Blessing Okonkwo",
      weeks: "28 weeks pregnant",
      nextVisit: "Oct 12, 2025",
      lastVisit: "Oct 5, 2025",
      status: "monitor",
    },
  ];

  // Filter mothers based on search query
  const filteredMothers = useMemo(() => {
    if (!searchQuery.trim()) {
      return mothersUnderCare;
    }

    const query = searchQuery.toLowerCase();
    return mothersUnderCare.filter(
      (mother) =>
        mother.name.toLowerCase().includes(query) ||
        mother.weeks.toLowerCase().includes(query) ||
        mother.status.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getStatusColor = (status) => {
    switch (status) {
      case "safe":
        return "#06D6A0";
      case "monitor":
        return "#FFD166";
      case "urgent":
        return "#EF476F";
      default:
        return "#06D6A0";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "safe":
        return "health-and-safety";
      case "monitor":
        return "eye-outline";
      case "urgent":
        return "alert";
      default:
        return "checkmark-circle";
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="bg-white border-b border-gray-200"
        style={{
          paddingTop: isIOS ? 50 : StatusBar.currentHeight || 24,
          paddingBottom: 16,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="w-10">
            <Ionicons name="arrow-back" size={24} color="#293231" />
          </TouchableOpacity>
          <Text className="text-[#293231] text-xl font-bold">
            {mothersUnderCareText}
          </Text>
          <View className="w-10" />
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center  bg-gray-100 rounded-xl px-4 py-3">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-base text-[#293231]"
            placeholder={searchPlaceholderText}
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="words"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Results count */}
        {searchQuery.trim() && (
          <Text className="text-gray-500 text-sm mt-2">
            {filteredMothers.length} {resultsFoundText}
          </Text>
        )}
      </View>

      {/* Mother List */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#06D6A0" />
            <Text className="text-gray-500 mt-4">{loadingText}</Text>
          </View>
        ) : filteredMothers.length > 0 ? (
          <>
            {filteredMothers.map((mother) => (
              <View
                key={mother.id}
                className="bg-white rounded-2xl p-4 mb-3 border-2"
                style={{ borderColor: getStatusColor(mother.status) }}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center flex-1 gap-1">
                    <Image
                      source={require("../../assets/images/profilepic.png")}
                      className="w-10 h-10 rounded-full"
                      resizeMode="cover"
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                    <View className="flex-1">
                      <View className="flex-row items-center">
                        <Text className="text-[#293231] font-semibold text-base mr-2">
                          {mother.name}
                        </Text>
                        {mother.status === "safe" ? (
                          <MaterialIcons
                            name="health-and-safety"
                            size={18}
                            color={getStatusColor(mother.status)}
                          />
                        ) : mother.status === "urgent" ? (
                          <AntDesign
                            name="alert"
                            size={18}
                            color={getStatusColor(mother.status)}
                          />
                        ) : (
                          <Ionicons
                            name={getStatusIcon(mother.status)}
                            size={18}
                            color={getStatusColor(mother.status)}
                          />
                        )}
                      </View>
                      <Text className="text-gray-500 text-sm">
                        {mother.weeks}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="border border-[#06D6A0] rounded-xl px-4 py-2"
                    activeOpacity={0.7}
                    style={{ minHeight: 40 }}
                    onPress={() =>
                      router.push(
                        `/healthworkerComponents/motherInfo?id=${mother.id}`
                      )
                    }
                  >
                    <Text className="text-[#06D6A0] font-semibold">
                      {viewText}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row justify-between">
                  <View>
                    <Text className="text-gray-400 text-xs">
                      {nextVisitText}
                    </Text>
                    <Text className="text-[#293231] text-sm">
                      {mother.nextVisit}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-gray-400 text-xs">
                      {lastVisitText}
                    </Text>
                    <Text className="text-[#293231] text-sm">
                      {mother.lastVisit}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            {/* 
            {!searchQuery.trim() && (
              <TouchableOpacity
                className="border border-gray-300 rounded-xl py-3 mt-2"
                activeOpacity={0.7}
                style={{ minHeight: 48 }}
                onPress={() =>
                  router.push("/healthworkerComponents/allMothers")
                }
              >
                <Text className="text-center text-[#293231] font-semibold">
                  {viewAllText}
                </Text>
              </TouchableOpacity>
            )} */}
          </>
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text className="text-gray-500 text-base mt-4">
              {noResultsText}
            </Text>
            <Text className="text-gray-400 text-sm mt-2 text-center px-8">
              {tryAdjustingText}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
