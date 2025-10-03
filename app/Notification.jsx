import { View, Text, Image, TouchableOpacity } from "react-native";

export default function NotificationSetup() {
  return (
    <View className="flex-1 bg-white p-6 justify-between">
      {/* Header */}
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Notification
      </Text>

      {/* Mockup Illustration */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={{ uri: "" }} 
          className="w-52 h-96 rounded-xl"
        />
      </View>

      {/* Info Section */}
      <View className="mt-6">
        <Text className="text-xl font-semibold text-center text-gray-800 mb-2">
          Never miss out on your daily routine
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          When turned on, we’ll remind you about your checklist and updates
          every day.
        </Text>
      </View>

      {/* Enable Button */}
      <TouchableOpacity className="bg-green-500 rounded-full py-4 mb-8">
        <Text className="text-center text-white font-semibold text-lg">
          Turn on notification
        </Text>
      </TouchableOpacity>
    </View>
  );
}