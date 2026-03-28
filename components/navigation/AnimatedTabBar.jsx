import { Pressable, Text, View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnimatedTabBar({ state, descriptors, navigation }) {
  const { width } = useWindowDimensions();
  const tabWidth = width / Math.max(state.routes.length, 1);
  const indicatorX = useSharedValue(state.index * tabWidth);

  indicatorX.value = withSpring(state.index * tabWidth, {
    damping: 18,
    stiffness: 190,
    mass: 0.55,
  });

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <SafeAreaView edges={["bottom"]} className="bg-white">
      <View
        className="border-t border-[#E6EFEC] px-2 pt-2"
        style={{
          shadowColor: "#042F40",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.06,
          shadowRadius: 14,
        }}
      >
        <Animated.View
          className="absolute top-0 rounded-full bg-[#006D5B]"
          style={[
            {
              height: 4,
              width: tabWidth * 0.34,
              marginLeft: tabWidth * 0.33,
            },
            indicatorStyle,
          ]}
        />

        <View className="flex-row items-center justify-around pb-1">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const color = isFocused ? "#006D5B" : "#9CA3AF";

            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                  ? options.title
                  : route.name;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className="flex-1 items-center justify-center py-1.5"
              >
                <View
                  className={`items-center justify-center rounded-2xl px-3 py-1.5 ${
                    isFocused ? "bg-[#006D5B]/8" : ""
                  }`}
                >
                  <View className="mb-0.5">
                    {typeof options.tabBarIcon === "function"
                      ? options.tabBarIcon({
                          focused: isFocused,
                          color,
                          size: 22,
                        })
                      : null}
                  </View>
                  <Text
                    className={`text-[10px] font-semibold ${
                      isFocused ? "text-[#006D5B]" : "text-[#9CA3AF]"
                    }`}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
