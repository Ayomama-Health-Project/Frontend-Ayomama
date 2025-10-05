import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";

const Emergency = () => {
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 2) {
      Toast.show({
        type: "success",
        text1: "Emergency Alert",
        text2: "Message sent to your contacts!",
      });
      setTapCount(0);
    }
  };

  const handleEmergencyCall = (type) => {
    const phoneNumbers = {
      hospital: "+2348145760560",
      family: "+2348145760560",
      friend: "+2348145760560",
    };

    Alert.alert(
      `Call ${type.charAt(0).toUpperCase() + type.slice(1)}?`,
      `Are you sure you want to call ${type}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Call",
          onPress: () => {
            Linking.openURL(`tel:${phoneNumbers[type]}`).catch(() => {
              Toast.show({
                type: "error",
                text1: "Call Failed 📞",
                text2: "Unable to make call. Please try again.",
                position: "top",
              });
            });
          },
        },
      ]
    );
  };

  // Returns color shades (outer, middle, inner) depending on tap count
  const getCircleColors = () => {
    switch (tapCount) {
      case 1: // 🔴 Red tones
        return {
          outer: "#FF000020",
          middle: "#FF000040",
          inner: "#FF0000",
        };
      case 2: // 🔵 Blue tones
        return {
          outer: "#0000FF20",
          middle: "#0000FF40",
          inner: "#0000FF",
        };
      case 3: // 🟡 Yellow tones
        return {
          outer: "#FFD70020", //
          middle: "#FFD70040",
          inner: "#FFD700",
        };
      default:
        return {
          outer: "#FF000020",
          middle: "#FF000040",
          inner: "#FF0000",
        };
    }
  };

  const colors = getCircleColors();

  return (
    <SafeAreaView className="flex-1 bg-[#FCFCFC]">
      <View className="flex-1 items-center justify-between py-10">
        {/* Top Section */}
        <View className="w-full px-5 justify-center flex flex-row">
          <TouchableOpacity className="border border-[#00D2B3] w-[200px] justify-center px-3 py-1.5 rounded-full flex-row items-center space-x-1">
            <Text className="text-[14px]">View hospitals near you</Text>
            <Icon name="directions" size={16} color="#00D2B3" />
          </TouchableOpacity>
        </View>

        {/* Center Section */}
        <View className="items-center w-[300px] flex flex-col justify-between h-[50vh]">
          <View>
            <Text className="text-[32px] font-bold text-[#333] text-center mb-2">
              Emergency Help Needed?
            </Text>
            <Text className="text-[15px] text-[#666] mb-8 text-center">
              We are here to help with everything
            </Text>
          </View>

          {/* Triple Circle Button */}
          <TouchableOpacity onPress={handleTap} activeOpacity={0.8}>
            <View className="relative justify-center items-center">
              {/* Outer Circle */}
              <View
                className="absolute rounded-full"
                style={{
                  width: 180,
                  height: 180,
                  backgroundColor: colors.outer,
                }}
              />
              {/* Middle Circle */}
              <View
                className="absolute rounded-full"
                style={{
                  width: 130,
                  height: 130,
                  backgroundColor: colors.middle,
                }}
              />
              {/* Inner Circle */}
              <View
                className="flex justify-center items-center rounded-full"
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: colors.inner,
                }}
              >
                <Icon name="touch-app" size={30} color="#000" />
              </View>
            </View>
          </TouchableOpacity>

          <Text className="text-[#666] text-center mt-8 px-8">
            Tap 3 times to send message to all your emergency contact.
          </Text>
        </View>

        {/* Bottom Buttons */}
        <View className="flex flex-col gap-2">
          {/* Call Hospital Button */}
          <View className="flex flex-row justify-center">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex flex-row gap-3 font-semibold items-center text-xl leading-6 h-[42px] w-[146px] bg-[#FCFCFC] shadow-md rounded-[10px] py-[10px] px-[18px]"
              onPress={() => handleEmergencyCall("hospital")}
            >
              <Image
                source={require("../../assets/images/hospital.png")}
                style={{ height: 26, width: 26 }}
              />
              <Text className="font-semibold text-[14px]">Call Hospital</Text>
            </TouchableOpacity>
          </View>

          {/* Call Family + Call Friend */}
          <View className="flex flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex flex-row gap-3 font-semibold items-center text-xl leading-6 h-[42px] w-[146px] bg-[#FCFCFC] shadow-md rounded-[10px] py-[10px] px-[18px]"
              onPress={() => handleEmergencyCall("family")}
            >
              <Image
                source={require("../../assets/images/hospital.png")}
                style={{ height: 26, width: 26 }}
              />
              <Text className="font-semibold text-[14px]">Call Family</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="flex flex-row gap-3 font-semibold items-center text-xl leading-6 h-[42px] w-[146px] bg-[#FCFCFC] shadow-md rounded-[10px] py-[10px] px-[18px]"
              onPress={() => handleEmergencyCall("friend")}
            >
              <Image
                source={require("../../assets/images/hospital.png")}
                style={{ height: 26, width: 26 }}
              />
              <Text className="font-semibold text-[14px]">Call Friend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Emergency;
