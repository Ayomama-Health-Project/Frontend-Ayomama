import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
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
  const [isChecked, setChecked] = useState({
    supplement: false,
    water: false,
    walk: false,
    clinic: false,
  });
  return (
    <View className="flex-1 bg-[#FCFCFC]">
      {/* Header */}
      <View
        className={`flex flex-row justify-between items-center px-6 ${topMargin} pt-16`}
      >
        <Image
          source={require("../../assets/images/Husbandandwife.png")}
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
          className="flex flex-col gap-10"
        >
          {/* Baby Development Info */}
          <LinearGradient
            colors={["#FBE9E2", "#A5DFD7"]}
            style={{
              borderRadius: 28,
              height: 233,
              // width: 355,
              padding: 15,
            }}
          >
            <View className="border-[0.9px] border-[#FF7F50] h-[203px] rounded-2xl py-[10px] px-[8px]">
              <View className="bg-[#FCFCFC] w-[108px] rounded-2xl flex  px-[13px] py-[10px] mb-3 ">
                <Text className="text-[#293231] text-[20px] text-center leading-[100%] font-semibold">
                  Week 18
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="flex-1">
                  <Text className="text-[#293231] text-base text-[14px] leading-6">
                    Your baby is now about the size of a lime 🍋‍🟩{"\n"}
                    {"\n"}
                    Tiny fingers and toes are forming. Remember to rest and eat
                    well mama.
                  </Text>
                </View>
                <Image
                  source={require("../../assets/images/infant.png")}
                  style={{ width: 100, height: 134 }}
                  className="ml-4"
                  resizeMode="contain"
                />
              </View>
            </View>
          </LinearGradient>

          {/* Daily Checklist */}
          <LinearGradient
            colors={["#FBE9E2", "#A5DFD7"]}
            style={{
              borderRadius: 20,
              height: 384,
              // width: 355,
              padding: 20,
            }}
            className="shadow-lg shadow-black/25"
          >
            <Text className="text-xl font-bold text-gray-900 mb-4">
              ✔️Daily Checklist
            </Text>

            <View className="flex flex-col gap-6">
              {/* Checklist Item 1 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-[10px] py-[5px] border-[#FCFCFC]"
              >
                <View className="flex flex-row gap-3 items-center">
                  <Image
                    source={require("../../assets/images/ironSupplement.png")}
                    style={{ width: 45, height: 50 }}
                  />
                  <Text className="text-[#293231] text-base flex-1">
                    Take iron supplement
                  </Text>
                </View>
                <Checkbox
                  value={isChecked.supplement}
                  onValueChange={() =>
                    setChecked({
                      ...isChecked,
                      supplement: !isChecked.supplement,
                    })
                  }
                  style={{ width: 17, height: 17, marginLeft: -20 }}
                />
              </View>

              {/* Checklist Item 2 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-[10px] py-[5px] border-[#FCFCFC]"
              >
                <View className="flex flex-row gap-3 items-center">
                  <Image
                    source={require("../../assets/images/water.png")}
                    style={{ width: 45, height: 50 }}
                  />
                  <Text className="text-[#293231] text-base flex-1">
                    Drink 8 glasses of water
                  </Text>
                </View>
                <Checkbox
                  value={isChecked.water}
                  onValueChange={() =>
                    setChecked({ ...isChecked, water: !isChecked.water })
                  }
                  style={{ width: 17, height: 17, marginLeft: -20 }}
                />
              </View>

              {/* Checklist Item 3 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-[10px] py-[5px] border-[#FCFCFC]"
              >
                <View className="flex flex-row gap-3 items-center">
                  <Image
                    source={require("../../assets/images/shoe.png")}
                    style={{ width: 45, height: 50 }}
                  />
                  <Text className="text-[#293231] text-base flex-1">
                    Walk 5 miles
                  </Text>
                </View>
                <Checkbox
                  value={isChecked.walk}
                  onValueChange={() =>
                    setChecked({ ...isChecked, walk: !isChecked.walk })
                  }
                  style={{ width: 17, height: 17, marginLeft: -20 }}
                />
              </View>

              {/* Checklist Item 4 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-[10px] py-[5px] border-[#FCFCFC]"
              >
                <View className="flex flex-row gap-3 items-center">
                  <Image
                    source={require("../../assets/images/clinic.png")}
                    style={{ width: 45, height: 50 }}
                  />
                  <Text className="text-[#293231] text-base flex-1">
                    Clinic visit tomorrow
                  </Text>
                </View>
                <Checkbox
                  value={isChecked.clinic}
                  onValueChange={() =>
                    setChecked({ ...isChecked, clinic: !isChecked.clinic })
                  }
                  style={{ width: 17, height: 17, marginLeft: -20 }}
                />
              </View>
            </View>
          </LinearGradient>

          {/* Clinic Visit Reminder */}
          <View
            style={{ height: 388, borderRadius: 30, borderColor: "#FF7F5080" }}
            className="bg-[#FFE8E8] rounded-2xl px-[25px] py-[28px] border flex flex-col gap-4 border-[#FFD1D1]"
          >
            <View className="flex flex-row items-center gap-3">
              <Icon name="calendar-month" size={24} />
              <Text className="text-[#293231] text-[24px] leading-[100%] font-bold mb-2">
                Upcoming Visit
              </Text>
            </View>

            <LinearGradient
              colors={["#FBE9E2", "#A5DFD7"]}
              style={{
                borderRadius: 28,
                height: 221,
                padding: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View className="text-center gap-3">
                <Text className="text-[#293231] text-[19px] leading-[100%] font-semibold">
                  Tomorrow Antenatal CheckUp!
                </Text>
                <Text className="text-center text-[#293231] font-medium text-[16px]">
                  10:30 am July 20th
                </Text>
              </View>
              <Image
                source={require("../../assets/images/clinicVisit.png")}
                style={{ width: 202, height: 142 }}
                className="self-center mt-4"
                resizeMode="contain"
              />
            </LinearGradient>

            <View style={{}} className="flex-row justify-between mt-4 mb-4">
              <TouchableOpacity
                style={{ width: 130, height: 37 }}
                className="bg-[#006D5B] rounded-[10px] justify-center items-center"
              >
                <Text className="text-white font-semibold text-base">
                  View Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: 130, height: 37 }}
                className="border border-[#026B5E] rounded-[10px] justify-center items-center"
              >
                <Text className="text-[#293231] font-semibold text-base">
                  Add to Calendar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Emergency Contact */}
          <View
            style={{ height: 354, borderRadius: 30, borderColor: "#00D2B3" }}
            className="bg-[#FCFCFC] rounded-2xl px-[25px] py-[28px] border flex flex-col gap-6 "
          >
            <View className="flex flex-row items-center gap-2">
              <View className="bg-black rounded-full p-2 h-7 w-7 flex ">
                <Icon name="phone" size={22} color="#ffff" />
              </View>
              <Text className="text-[#293231] text-[24px] leading-[100%] font-bold mb-2">
                Emergency Contact
              </Text>
            </View>

            <LinearGradient
              colors={["#FBE9E2", "#A5DFD7"]}
              style={{
                borderRadius: 28,
                height: 132,
                width: 208,
                padding: 15,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View className="text-center gap-3">
                <Text className="text-[#293231] text-[19px] leading-[100%] font-semibold">
                  Need Urgent Help?
                </Text>
              </View>
              <Image
                source={require("../../assets/images/emergency.png")}
                style={{ width: 108, height: 74 }}
                className="self-center mt-4"
                resizeMode="contain"
              />
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
