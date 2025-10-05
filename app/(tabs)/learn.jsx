import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function Learn() {
  const router = useRouter();

  const handleSmartChat = () => {
    router.push("/chat/SmartChat");
  };

  const handleVoiceChat = () => {
    console.log("Voice Chat clicked");
    // TODO: Navigate to Voice Chat
  };

  const handleImageRecognition = () => {
    console.log("Image Recognition clicked");
    // TODO: Navigate to Image Recognition
  };

  const handleCommunity = () => {
    console.log("Community clicked");
    // TODO: Navigate to Community
  };

  const handleHealthWorkers = () => {
    console.log("Health Workers clicked");
    // TODO: Navigate to Health Workers
  };

  const handleListen = () => {
    console.log("Listen clicked");
    // TODO: Navigate to Listen
  };

  const handleBabyDevelopment = () => {
    console.log("Baby Development clicked");
    // TODO: Navigate to Baby Development
  };

  return (
    <View className="flex-1 bg-[#FCFCFC]">
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

      <View className="flex-1">
        <View
          className={`px-6 ${topMargin}`}
          style={{ paddingTop: ios ? 64 : 76 }}
        >
          {/* Header Text */}
          <Text className="text-2xl font-bold text-[#293231] mb-2">
            For every question and every worry,
          </Text>
          <Text className="text-2xl font-bold text-[#293231] mb-8">
            i will be your{" "}
            <Text className="text-[#FF7F50]">gentle AI companion</Text>
          </Text>

          {/* Top Action Buttons Row */}
          <View className="flex-row items-center justify-between mb-4">
            {/* Smart Chat Button */}
            <TouchableOpacity
              onPress={handleSmartChat}
              className="bg-white/70 rounded-3xl px-6 py-4 flex-1 mr-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text className="text-[#293231] font-semibold text-base text-center">
                Smart Chat
              </Text>
            </TouchableOpacity>

            {/* Voice Button */}
            <TouchableOpacity
              onPress={handleVoiceChat}
              className="bg-white/70 rounded-full w-14 h-14 items-center justify-center mx-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name="mic" size={24} color="#293231" />
            </TouchableOpacity>

            {/* Image Button */}
            <TouchableOpacity
              onPress={handleImageRecognition}
              className="bg-white/70 rounded-full w-14 h-14 items-center justify-center ml-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name="image" size={24} color="#293231" />
            </TouchableOpacity>
          </View>

          {/* Main Cards Grid */}
          <View className="flex-row mb-4">
            {/* Community Card */}
            <TouchableOpacity
              onPress={handleCommunity}
              className="bg-white/80 rounded-3xl p-5 flex-1 mr-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                minHeight: 160,
              }}
            >
              <View className="w-12 h-12  items-center justify-center mb-3">
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text className="text-xl font-bold text-[#293231] mb-2">
                Community
              </Text>
              <Text className="text-sm text-[#6B7280]">
                share and learn new things.
              </Text>
            </TouchableOpacity>

            {/* Health Workers Card */}
            <TouchableOpacity
              onPress={handleHealthWorkers}
              className="bg-white/80 rounded-3xl p-5 flex-1 ml-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                minHeight: 160,
              }}
            >
              <View className="w-12 h-12  items-center justify-center mb-3">
                <Ionicons name="medical" size={24} color="black" />
              </View>
              <Text className="text-xl font-bold text-[#293231] mb-2">
                Health workers
              </Text>
              <Text className="text-sm text-[#6B7280]">
                Ask and learn new things from professionals
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Cards Row */}
          <View className="flex-row mb-4">
            {/* Listen Card */}
            <TouchableOpacity
              onPress={handleListen}
              className="bg-white/80 rounded-3xl p-5 flex-1 mr-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                minHeight: 160,
              }}
            >
              <View className="w-12 h-12  items-center justify-center mb-3">
                <Ionicons name="headset" size={24} color="black" />
              </View>
              <Text className="text-xl font-bold text-[#293231] mb-2">
                Listen
              </Text>
              <Text className="text-sm text-[#6B7280]">
                Learn more about your baby in your local language
              </Text>
            </TouchableOpacity>

            {/* Baby Development Card */}
            <TouchableOpacity
              onPress={handleBabyDevelopment}
              className="bg-white/80 rounded-3xl p-5 flex-1 ml-2"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                minHeight: 160,
              }}
            >
              <View className="w-12 h-12  items-center justify-center mb-3">
                <Ionicons name="happy" size={24} color="black" />
              </View>
              <Text className="text-xl font-bold text-[#293231] mb-2">
                Baby Development
              </Text>
              <Text className="text-sm text-[#6B7280]">
                Learn more about the development of your child
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
