import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function UpdateVitalsStep() {
  const router = useRouter();
  const isIOS = Platform.OS === "ios";

  const handleProceed = () => {
    // Navigate to home or wherever needed after updating vitals
    router.push("/(tabs)");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#B5FFFC", "#FFDEE9"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Fixed Header */}
      <View
        style={{
          paddingTop: isIOS ? 50 : StatusBar.currentHeight || 24,
          paddingBottom: 16,
          paddingHorizontal: 24,
        }}
      >
        <View className="flex-row items-center justify-center">
          <TouchableOpacity onPress={handleBack} className="absolute left-0">
            <Ionicons name="arrow-back" size={24} color="#293231" />
          </TouchableOpacity>
          <Text className="text-[#293231] text-xl font-bold">
            Antenatal Update
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="justify-start pt-6">
          {/* Blood Pressure Input */}
          <View className="mb-4">
            <Text className="text-sm mb-2">Blood pressure</Text>
            <TextInput
              placeholder="Enter blood pressure (e.g., 120/80)"
              placeholderTextColor="#D1D5DB"
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            />
          </View>

          {/* Temperature Input */}
          <View className="mb-4">
            <Text className="text-sm mb-2">Temperature</Text>
            <TextInput
              placeholder="Enter temperature (e.g., 36.8°C)"
              placeholderTextColor="#D1D5DB"
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            />
          </View>

          {/* Weight Input */}
          <View className="mb-4">
            <Text className="text-sm mb-2">Weight</Text>
            <TextInput
              placeholder="Enter weight (e.g., 65kg)"
              placeholderTextColor="#D1D5DB"
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            />
          </View>

          {/* Blood Level Input */}
          <View className="mb-8">
            <Text className="text-sm mb-2">Blood level</Text>
            <TextInput
              placeholder="Enter blood level (e.g., 12.5g/dl)"
              placeholderTextColor="#D1D5DB"
              className="bg-white rounded-2xl px-4 py-4 text-[#293231] text-base"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1,
              }}
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Proceed Button at Bottom */}
      <View className="px-6 pb-6 pt-4 bg-transparent">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleProceed}
          className="bg-[#006D5B] rounded-2xl py-4 items-center justify-center"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text className="text-white font-semibold text-base">Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
