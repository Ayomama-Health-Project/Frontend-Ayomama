import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";

const ELLIPSE_1 =
  "https://www.figma.com/api/mcp/asset/c250cf78-105c-46c0-b7c7-a75cd97a76a5";
const ELLIPSE_2 =
  "https://www.figma.com/api/mcp/asset/caa7d652-c2e7-438b-9c93-adc5ccad9e14";

export default function BackgroundDecor() {
  return (
    <View className="absolute inset-0">
      <LinearGradient
        colors={["#B5FFFC", "#FFDEE9"]}
        style={{
          height: "120%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <Image
        source={{ uri: ELLIPSE_1 }}
        className="absolute left-[-111px] top-[-111px] h-[520px] w-[520px]"
        resizeMode="stretch"
      />
      <Image
        source={{ uri: ELLIPSE_2 }}
        className="absolute left-[-204px] top-[520px] h-[520px] w-[520px]"
        resizeMode="stretch"
      />
      <View className="absolute left-9 top-[103px] h-2.5 w-2.5 rounded-full bg-[#D8643E]" />
      <View className="absolute left-[170px] top-[125px] h-[5px] w-[5px] rounded-full bg-[#D8643E]" />
      <View className="absolute left-[244px] top-[136px] h-[5px] w-[5px] rounded-full bg-[#D8643E]" />
      <View className="absolute left-[306px] top-[59px] h-[5px] w-[5px] rounded-full bg-[#D8643E]" />
      <View className="absolute left-[313px] top-[141px] h-[5px] w-[5px] rounded-full bg-[#D8643E]" />
      <View className="absolute left-[328px] top-[540px] h-[5px] w-[5px] rounded-full bg-[#D8643E]" />
      <View className="absolute left-0 top-[654px] h-[5px] w-[5px] rounded-full bg-[#D8643E]" />
    </View>
  );
}
