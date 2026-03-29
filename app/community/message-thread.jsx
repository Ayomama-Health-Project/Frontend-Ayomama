import { useRouter } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessageThreadScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <View className="flex-row items-center justify-between px-5 pb-5 pt-3">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.82}>
          <Text className="text-[28px] text-[#293231]">×</Text>
        </TouchableOpacity>
        <Text className="text-[18px] font-bold text-[#293231]">Dr Lala</Text>
        <View className="w-6" />
      </View>
      <View className="border-b border-[#E6ECE9]" />
      <View className="flex-1 px-5 pt-8">
        <View className="mb-5 flex-row items-end">
          <Image
            source={require("../../assets/images/profilepic.png")}
            className="mr-3 h-10 w-10 rounded-full"
          />
          <View className="max-w-[80%] rounded-[18px] bg-[#E9F7F4] px-4 py-4 shadow-sm">
            <Text className="text-[16px] leading-7 text-[#111]">
              That could be contributing. Before we proceed, do you have any
              medical conditionslike hypertension, allergies, or migraine
              history?
            </Text>
          </View>
        </View>
        <View className="mb-5 items-end">
          <View className="max-w-[78%] rounded-[18px] border border-[#E4E4E4] bg-white px-4 py-4 shadow-sm">
            <Text className="text-[16px] leading-7 text-[#111]">
              No chronic conditions. I’ve had headaches but nothing this
              serious.
            </Text>
          </View>
        </View>
        <View className="flex-row items-end">
          <Image
            source={require("../../assets/images/profilepic.png")}
            className="mr-3 h-10 w-10 rounded-full"
          />
          <View className="max-w-[80%] rounded-[18px] bg-[#E9F7F4] px-4 py-4 shadow-sm">
            <Text className="text-[16px] leading-7 text-[#111]">
              Okay. For now, please drink some water, reduce screen time, and
              take a mild pain reliever like paracetamol if you haven’t
              already.I’ll also recommend you rest in a dark, quiet room for at
              least 20-30 minutes.
            </Text>
          </View>
        </View>
      </View>
      <View className="px-4 pb-7">
        <View className="flex-row items-center rounded-[18px] border border-[#E4E4E4] bg-white px-4 py-3">
          <TouchableOpacity activeOpacity={0.82}>
            <Text className="mr-4 text-[32px] text-[#293231]">+</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Type here..."
            placeholderTextColor="#9EA5A3"
            className="flex-1 text-[16px]"
          />
          <TouchableOpacity
            activeOpacity={0.82}
            className="h-10 w-10 items-center justify-center rounded-full bg-[#14D1BF]"
          >
            <Text className="text-[22px] text-[#111]">↑</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
