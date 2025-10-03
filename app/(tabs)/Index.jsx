import {
  Tabs,
  TabsTab,
  TabsTabList,
  TabsTabPanel,
  TabsTabPanels,
  Text,
} from "@gluestack-ui/themed";
import { Checkbox } from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
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
    <View className="flex-1 bg-[#FCFCFC] ">
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
            className="rounded-2xl px-[25px] py-[28px] border flex flex-col gap-4 border-[#FFD1D1]"
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
            className="bg-white rounded-2xl px-[15px] py-[28px] border flex flex-col gap-6 "
          >
            <View className="flex flex-row items-center gap-2">
              <View className="bg-black rounded-full">
                <Icon name="phone" size={22} color="#ffff" />
              </View>
              <Text className="text-[#293231] text-[24px] leading-[100%] font-bold">
                Emergency Contact
              </Text>
            </View>

            <View className="flex flex-row justify-center">
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

            <View className="flex flex-col gap-2">
              <View className="flex flex-row justify-center">
                <View className="flex flex-row gap-3 font-semibold items-center text-xl leading-6 h-[42px] w-[146px] bg-[#FCFCFC] shadow-md rounded-[10px] py-[10px] px-[18px]">
                  <Image
                    source={require("../../assets/images/hospital.png")}
                    style={{ height: 26, width: 26 }}
                  />
                  <Text className="font-semibold text-[14px]">
                    Call Hospital
                  </Text>
                </View>
              </View>

              <View className="flex flex-row gap-3 ">
                <View className="flex flex-row gap-3 font-semibold items-center text-xl leading-6 h-[42px] w-[146px] bg-[#FCFCFC] shadow-md rounded-[10px] py-[10px] px-[18px]">
                  <Image
                    source={require("../../assets/images/hospital.png")}
                    style={{ height: 26, width: 26 }}
                  />
                  <Text className="font-semibold text-[14px]">Call Family</Text>
                </View>

                <View className="flex flex-row gap-3 font-semibold items-center text-xl leading-6 h-[42px] w-[146px] bg-[#FCFCFC] shadow-md rounded-[10px] py-[10px] px-[18px]">
                  <Image
                    source={require("../../assets/images/hospital.png")}
                    style={{ height: 26, width: 26 }}
                  />
                  <Text className="font-semibold text-[14px]">Call Friend</Text>
                </View>
              </View>
            </View>
          </View>

          {/**Wellness Activities */}
          <View
            style={{ height: 420, borderRadius: 30, borderColor: "#FF7F50" }}
            className="bg-[#FCFCFC] rounded-2xl px-[15px] py-[28px] border flex flex-col gap-6 "
          >
            <View className="flex flex-row items-center gap-2">
              <Image
                source={require("../../assets/images/wellness.png")}
                className="w-[26px] h-[26px]"
              />
              <Text className="text-[#293231] text-[24px] leading-[100%] font-bold">
                Wellness Activites
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <LinearGradient
                colors={["#FBE9E2", "#A5DFD7"]}
                style={{
                  borderRadius: 30,
                  height: 154,
                  width: 137,
                  // paddingHorizontal: 15,
                  // paddingVertical: 10,
                  padding: 15,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // gap: ,
                }}
              >
                <Image
                  source={require("../../assets/images/yoga.png")}
                  style={{ width: 50, height: 50 }}
                  className="self-center"
                  resizeMode="contain"
                />
                <View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-center  text-[14px] leading-[100%] font-semibold">
                      Presental Yoga
                    </Text>
                  </View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-center text-[12px] leading-[100%]">
                      15 mins session
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ width: 107, height: 25 }}
                  className="border-[#FF7F50] border rounded-[5px] bg-[#FCFCFC] justify-center items-center"
                >
                  <Text className="text-[#293231] font-semibold text-[14px]">
                    Start
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["#FBE9E2", "#A5DFD7"]}
                style={{
                  borderRadius: 30,
                  height: 154,
                  width: 137,
                  // paddingHorizontal: 15,
                  // paddingVertical: 10,
                  padding: 15,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // gap: ,
                }}
              >
                <Image
                  source={require("../../assets/images/breathing.png")}
                  style={{ width: 50, height: 50 }}
                  className="self-center"
                  resizeMode="contain"
                />
                <View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-center text-[14px] leading-[100%] font-semibold">
                      Breathing
                    </Text>
                  </View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-[12px] leading-[100%]">
                      5 mins exercise
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ width: 107, height: 25 }}
                  className="border-[#FF7F50] border rounded-[5px] bg-[#FCFCFC] justify-center items-center"
                >
                  <Text className="text-[#293231] font-semibold text-[14px]">
                    Start
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View className="flex flex-row justify-between">
              <LinearGradient
                colors={["#FBE9E2", "#A5DFD7"]}
                style={{
                  borderRadius: 30,
                  height: 154,
                  width: 137,
                  // paddingHorizontal: 15,
                  // paddingVertical: 10,
                  padding: 15,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // gap: ,
                }}
              >
                <Image
                  source={require("../../assets/images/meditation.png")}
                  style={{ width: 50, height: 50 }}
                  className="self-center"
                  resizeMode="contain"
                />
                <View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-[14px] text-center leading-[100%] font-semibold">
                      Meditation
                    </Text>
                  </View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-[12px] text-center leading-[100%]">
                      10 mins session
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ width: 107, height: 25 }}
                  className="border-[#FF7F50] border rounded-[5px] bg-[#FCFCFC] justify-center items-center"
                >
                  <Text className="text-[#293231] font-semibold text-[14px]">
                    Start
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["#FBE9E2", "#A5DFD7"]}
                style={{
                  borderRadius: 30,
                  height: 154,
                  width: 137,
                  // paddingHorizontal: 15,
                  // paddingVertical: 10,
                  padding: 15,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // gap: ,
                }}
              >
                <Image
                  source={require("../../assets/images/sleep.png")}
                  style={{ width: 50, height: 50 }}
                  className="self-center"
                  resizeMode="contain"
                />
                <View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] text-[14px] text-center leading-[100%] font-semibold">
                      Sleep Stories
                    </Text>
                  </View>
                  <View className="text-center gap-3">
                    <Text className="text-[#293231] tesxt-center text-[12px] leading-[100%]">
                      15 mins session
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={{ width: 107, height: 25 }}
                  className="border-[#FF7F50] border rounded-[5px] bg-[#FCFCFC] justify-center items-center"
                >
                  <Text className="text-[#293231] font-semibold text-[14px]">
                    Start
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          {/**Nutrition Today */}
          <View
            style={{ height: 739, borderRadius: 30, borderColor: "#00D2B3" }}
            className="bg-[#FCFCFC] rounded-2xl px-[15px] py-[28px] border flex flex-col gap-6"
          >
            <View className="flex flex-row items-center gap-2">
              <Image
                source={require("../../assets/images/wellness.png")}
                className="w-[26px] h-[26px]"
              />
              <Text className="text-[#293231] text-[24px] leading-[100%] font-bold">
                Nutrition Today
              </Text>
            </View>

            <Tabs value="breakfast">
              <TabsTabList className="flex flex-row justify-between mb-6">
                <TabsTab
                  value="breakfast"
                  className="flex-1 mx-1 data-[state=active]:bg-yellow-400"
                >
                  <View className="py-2 items-center">
                    <Text className="text-[#293231] font-semibold text-[14px]">
                      Breakfast
                    </Text>
                    <Text className="text-[#6B7280] text-[12px]">
                      12am-12pm
                    </Text>
                  </View>
                </TabsTab>
                <TabsTab value="lunch" className="flex-1 mx-1">
                  <View className="py-2 items-center">
                    <Text className="text-[#293231] font-semibold text-[14px]">
                      Lunch
                    </Text>
                    <Text className="text-[#6B7280] text-[12px]">
                      12pm-05pm
                    </Text>
                  </View>
                </TabsTab>
                <TabsTab value="dinner" className="flex-1 mx-1">
                  <View className="py-2 items-center">
                    <Text className="text-[#293231] font-semibold text-[14px]">
                      Dinner
                    </Text>
                    <Text className="text-[#6B7280] text-[12px]">
                      05pm-09pm
                    </Text>
                  </View>
                </TabsTab>
              </TabsTabList>

              <TabsTabPanels>
                {/* Breakfast Tab */}
                <TabsTabPanel value="breakfast" className="flex flex-col gap-6">
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Fruit Salad and Milk
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Protien</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FFF9C4] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Carbs</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                </TabsTabPanel>

                {/* Lunch Tab */}
                <TabsTabPanel value="lunch" className="flex flex-col gap-6">
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Fruit Salad and Milk
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Protien</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FFF9C4] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Carbs</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TabsTabPanel>

                {/* Dinner Tab */}
                <TabsTabPanel value="dinner" className="flex flex-col gap-6">
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Fruit Salad and Milk
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Protien</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FFF9C4] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Carbs</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[30px] h-[121px] p-1 shadow-sm border flex flex-row gap-4 items-center border-[#00D2B3]">
                    <Image
                      source={require("../../assets/images/pap.png")}
                      style={{ width: 56, height: 60 }}
                    />
                    <View className="flex flex-col h-[121px] py-4 justify-between">
                      <Text className="font-semibold text-[18px]">
                        Pap, milk and eggs{" "}
                      </Text>
                      <View className="flex flex-row gap-14">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/fire.png")}
                            style={{ width: 16, height: 16 }}
                          />
                          <Text>294 Kcal</Text>
                        </View>
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={require("../../assets/images/scale.png")}
                            style={{ width: 24, height: 24 }}
                          />
                          <Text>100g</Text>
                        </View>
                      </View>
                      <View className="flex flex-row gap-6 text-[12px]">
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-2 bg-[#FF7F50] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-2 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>15g Fibres</Text>
                        </View>
                        {/* <View className="flex flex-row gap-2 items-center">
                          <View className="h-[30px] w-1 bg-[#00D2B3] rounded-t-md rounded-b-md">
                            <View className="h-[15px] bg-gray-200 w-1 rounded-t-md rounded-b-md"></View>
                          </View>
                          <Text>40g Vitamin</Text>
                        </View> */}
                      </View>
                    </View>
                  </View>
                </TabsTabPanel>
              </TabsTabPanels>
            </Tabs>
          </View>

          {/**Baby Development */}
          <View
            style={{ height: 443, borderRadius: 30, borderColor: "#00D2B3" }}
            className="bg-[#FCFCFC] rounded-2xl px-[15px] py-[28px] border flex flex-col gap-4"
          >
            <View className="flex flex-row items-center gap-2">
              <Image
                source={require("../../assets/images/emoji.png")}
                className="w-[26px] h-[26px]"
              />
              <Text className="text-[#293231] text-[24px] leading-[100%] font-bold">
                Baby&#39;s Development
              </Text>
            </View>

            <View className="flex flex-col gap-4">
              <Text className="text-[#293231] font-semibold text-[20px] ">
                Week 18 Milestones
              </Text>
              <View className="flex flex-row justify-center">
                <LinearGradient
                  colors={["#FBE9E2", "#A5DFD7"]}
                  style={{
                    borderRadius: 28,
                    height: 154,
                    width: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/images/infant.png")}
                    style={{ width: 100, height: 134 }}
                  />
                </LinearGradient>
              </View>
              <View
                className="h-[104px] border border-[#00D2B3] p-5 flex flex-col justify-between"
                style={{ borderRadius: 30 }}
              >
                <View className="flex flex-row gap-3">
                  <Text className="text-[14px]">&middot;</Text>
                  <Text className="text-[14px]">
                    Your babay can now hear sounds.🎉
                  </Text>
                </View>
                <View className="flex flex-row gap-3">
                  <Text className="text-[14px]">&middot;</Text>
                  <Text className="text-[14px]">
                    Your baby’s finger and toes are growing.🎉
                  </Text>
                </View>
                <View className="flex flex-row gap-3">
                  <Text className="text-[14px]">&middot;</Text>
                  <Text className="text-[14px]">
                    Your baby can move actively.🎉
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={{ height: 37, borderRadius: 15 }}
              className="bg-[#006D5B] rounded-[10px] justify-center items-center"
            >
              <Text className="text-white text-center font-semibold text-[16px]">
                Learn more about week 18
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
