import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
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

export default function Visit() {
  const [isChecked, setChecked] = useState({
    antenatal: false,
    supplement: false,
    water: false,
  });

  return (
    <View className="flex-1 ">
      {/* Header */}
      <View
        className={`flex flex-row justify-between items-center px-4 ${topMargin}  bg-[#FBE9E2] pt-16 pb-4`}
      >
        <View className="w-[54px] h-[42px] flex flex-row items-center justify-center rounded-md shadow-md">
          <Ionicons name="arrow-back" size={25} />
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-[#8F8D8D] text-[16px]">Hello,</Text>
          <Text className="text-[#293231] text-[20px] font-bold">
            Mama Grace
          </Text>
        </View>
        <Icon name="notifications" size={25} color="#000" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#FBE9E2", "#A5DFD7"]}
          style={{
            borderBottomEndRadius: 50,
            borderBottomStartRadius: 50,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
          className="shadow-lg shadow-black/25 "
        >
          {/* Calendar Section */}
          <View className="">
            <Text className="text-[#293231] text-[20px] font-bold mb-4">
              Next Appointment
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              <View className="flex-row space-x-4 gap-3">
                {/* Day 19 */}
                <View className="items-center w-14 h-[86px] bg-[#FCFCFC] rounded-full items-center justify-center">
                  <View>
                    <Text className="text-[#293231] text-[16px] font-bold">
                      19
                    </Text>
                  </View>
                  <Text className="text-[#8F8D8D] text-[12px] mt-1">Sept</Text>
                </View>

                {/* Day 20 */}
                <View className="items-center w-14 h-[86px] bg-[#00D2B3] rounded-full items-center justify-center">
                  <View>
                    <Text className="text-white text-[19px] font-bold">20</Text>
                  </View>
                  <Text className="text-[#FCFCFC] text-[12px] mt-1">Sept</Text>
                </View>

                {/* Day 21 */}
                <View className="items-center w-14 h-[86px] bg-[#FCFCFC] rounded-full items-center justify-center">
                  <View>
                    <Text className="text-[#293231] text-[16px] font-bold">
                      21
                    </Text>
                  </View>
                  <Text className="text-[#8F8D8D] text-[12px] mt-1">Sept</Text>
                </View>

                {/* Day 22 */}
                <View className="items-center w-14 h-[86px] bg-[#FCFCFC] rounded-full items-center justify-center">
                  <View>
                    <Text className="text-[#293231] text-[16px] font-bold">
                      22
                    </Text>
                  </View>
                  <Text className="text-[#8F8D8D] text-[12px] mt-1">Sept</Text>
                </View>

                {/* Day 23 */}
                <View className="items-center w-14 h-[86px] bg-[#00D2B3] rounded-full items-center justify-center">
                  <View>
                    <Text className="text-white text-[19px] font-bold">20</Text>
                  </View>
                  <Text className="text-[#FCFCFC] text-[12px] mt-1">Sept</Text>
                </View>

                {/* Day 24 */}
                <View className="items-center w-14 h-[86px] bg-[#FCFCFC] rounded-full items-center justify-center">
                  <View>
                    <Text className="text-[#293231] text-[16px] font-bold">
                      24
                    </Text>
                  </View>
                  <Text className="text-[#8F8D8D] text-[12px] mt-1">Sept</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Upcoming Appointment Card */}
          <View className="flex flex-col gap-2">
            <Text className="text-[#293231] text-[22px] font-bold leading-wide">
              Antenatal Checkup
            </Text>
            <View className="rounded-2xl p-5 shadow-lg shadow-black/25 flex flex-col h-[140px] justify-between border border-[#FF7F50]">
              <View className="flex-row justify-between items-start">
                <View className="flex-1 flex-col gap-3">
                  <Text className="text-[#293231] text-center text-[25px] font-medium">
                    Tomorrow, Sept 20 -{" "}
                    <Text className="text-[#D78722]"> 10:00am</Text>
                  </Text>
                  <Text className="text-[#8F8D8D] text-[17px] text-center">
                    Yaba Government hospital. Yaba Lagos
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row space-x-3 gap-3 justify-center">
                <TouchableOpacity className="flex bg-[#FCFCFC] h-[37px] rounded-xl py-3 w-[120px] items-center">
                  <Text className="text-[#293231] text-[14px] font-semibold">
                    Set Reminder
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex bg-[#FCFCFC] h-[37px] w-[120px]  rounded-xl py-3 items-center">
                  <Text className="text-[#293231] text-[14px] font-semibold">
                    See Directions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-[#293231] text-[22px] font-bold">
              ✔️Preparation Checklist
            </Text>
            <View className="flex flex-col gap-4">
              {/* Checklist Item 1 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-4 py-2 border-[#FCFCFC]"
              >
                <View className="flex flex-row gap-3 items-center">
                  <Image
                    source={require("../../assets/images/infant.png")}
                    style={{ width: 45, height: 50 }}
                  />
                  <Text className="text-[#293231] text-base flex-1">
                    Bring antenatal card
                  </Text>
                </View>
                <Checkbox
                  value={isChecked.antenatal}
                  onValueChange={() =>
                    setChecked({
                      ...isChecked,
                      antenatal: !isChecked.atenatal,
                    })
                  }
                  style={{ width: 17, height: 17, marginLeft: -20 }}
                />
              </View>

              {/* Checklist Item 2 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-4 py-2 border-[#FCFCFC]"
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

              {/* Checklist Item 3 */}
              <View
                style={{ height: 60, borderRadius: 28 }}
                className="flex-row items-center bg-[#FCFCFC] rounded-2xl shadow-sm border px-4 py-2 border-[#FCFCFC]"
              >
                <View className="flex flex-row gap-3 items-center">
                  <Image
                    source={require("../../assets/images/water.png")}
                    style={{ width: 45, height: 50 }}
                  />
                  <Text className="text-[#293231] text-base flex-1">
                    Drink enough water
                  </Text>
                </View>
                <Checkbox
                  value={isChecked.water}
                  onValueChange={() =>
                    setChecked({
                      ...isChecked,
                      water: !isChecked.water,
                    })
                  }
                  style={{ width: 17, height: 17, marginLeft: -20 }}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
