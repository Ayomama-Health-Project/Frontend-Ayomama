import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#FCFCFC]">
      {/* Header */}
      <View
        className={`flex flex-row justify-between items-center px-6 ${topMargin} pt-16`}
      >
        <Image
          source={require("../../assets/images/Husband and wife.png")}
          style={{ width: 40, height: 40 }}
          className="rounded-full"
        />
        <View className="flex flex-col items-center">
          <Text className="text-[#8F8D8D] text-[16px]">Hello,</Text>
          <Text className="text-[#293231] text-[20px] font-bold">
            Mama Grace
          </Text>
        </View>
        <Icon name="notifications" size={25} color="#000" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: height * 0.05 }}
      >
        <View
          style={{ paddingHorizontal: width * 0.06, paddingTop: height * 0.03 }}
        >
          {/* Baby Development Info */}
          <LinearGradient
            colors={["#FBE9E2", "#A5DFD7"]}
            style={{
              borderRadius: 28,
              height: 233,
              width: 355,
              padding: 15,
            }}
          >
            <View className="border-[0.9px] border-[#FF7F50] h-[203px] rounded-2xl py-[10px] px-[8px]">
              <View className="bg-[#FCFCFC] w-[100px] rounded-2xl flex h-[44px] px-[13px] py-[10px] mb-3 ">
                <Text className="text-[#293231] text-[20px] text-center leading-[100%] font-semibold">
                  Week 18
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-1">
                  <Text className="text-gray-700 text-base leading-6">
                    Your baby is now about the size of a lime 😊{"\n"}
                    {"\n"}
                    Tiny fingers and toes are forming. Remember to rest and eat
                    well mama.
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/Pregnant black woman.png")}
                  style={{ width: 60, height: 60 }}
                  className="ml-4"
                  resizeMode="contain"
                />
              </View>
            </View>
          </LinearGradient>
          {/* Daily Checklist */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Daily Checklist
            </Text>

            <View className="space-y-3">
              {/* Checklist Item 1 */}
              <View
                style={{ minHeight: height * 0.08 }}
                className="flex-row items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <View className="w-6 h-6 border-2 border-[#8A4FFF] rounded-full mr-3" />
                <Text className="text-gray-800 text-base flex-1">
                  Take iron supplement
                </Text>
              </View>

              {/* Checklist Item 2 */}
              <View
                style={{ minHeight: height * 0.08 }}
                className="flex-row items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <View className="w-6 h-6 border-2 border-[#8A4FFF] rounded-full mr-3" />
                <Text className="text-gray-800 text-base flex-1">
                  Drink 8 glasses of water
                </Text>
              </View>

              {/* Checklist Item 3 */}
              <View
                style={{ minHeight: height * 0.08 }}
                className="flex-row items-center bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <View className="w-6 h-6 border-2 border-[#8A4FFF] rounded-full mr-3" />
                <Text className="text-gray-800 text-base flex-1">
                  Walk 5 miles
                </Text>
              </View>
            </View>
          </View>
          {/* Clinic Visit Reminder */}
          <View
            style={{ minHeight: height * 0.1 }}
            className="bg-[#FFE8E8] rounded-2xl p-5 border border-[#FFD1D1] mb-4"
          >
            <Text className="text-[#D93C3C] text-lg font-semibold mb-2">
              ⚠️ Clinic visit tomorrow
            </Text>
            <Text className="text-[#D93C3C] text-sm">
              Don&apos;t forget your scheduled appointment
            </Text>
          </View>
          {/* Quick Actions */}
          <View
            style={{ height: height * 0.08 }}
            className="flex-row justify-between mt-4 mb-4"
          >
            <TouchableOpacity
              style={{ width: width * 0.43 }}
              className="bg-[#8A4FFF] rounded-2xl justify-center items-center"
            >
              <Text className="text-white font-semibold text-base">
                Track Symptoms
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: width * 0.43 }}
              className="bg-[#E8E0FF] rounded-2xl justify-center items-center"
            >
              <Text className="text-[#8A4FFF] font-semibold text-base">
                Ask Doctor
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
