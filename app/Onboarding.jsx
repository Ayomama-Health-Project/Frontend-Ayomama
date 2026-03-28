import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "../utils/translator";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const isTransitioning = useRef(false);
  const router = useRouter();

  // Translate all text
  const slide1Text = useTranslation(
    "Your pregnancy journey guided with care and love",
  );
  const slide2Text = useTranslation(
    "A circle of mothers, bound by love and care",
  );
  const slide3Text = useTranslation(
    "A circle of mothers, bound by love and care",
  );
  const slide4Text = useTranslation("A soft way to move through motherhood");
  const slide5Text = useTranslation("Help is always near just one tap away");
  const slide6Text = useTranslation(
    "We're here with you from pregnancy to postpartum",
  );
  const slide7Text = useTranslation("Keep track of all your patients");

  const signInText = useTranslation("Sign in");
  const signUpText = useTranslation("Sign up");
  const skipText = useTranslation("Skip");

  const slides = useMemo(
    () => [
      {
        title: slide1Text,
        image: require("../assets/images/Pregnantblackwoman.png"),
      },
      {
        title: slide2Text,
        image: require("../assets/images/Husbandandwife.png"),
      },
      {
        title: slide3Text,
        image: require("../assets/images/women.png"),
      },
      {
        title: slide4Text,
        image: require("../assets/images/motherandbaby.png"),
      },
      {
        title: slide5Text,
        image: require("../assets/images/healthworker.png"),
      },
      {
        title: slide6Text,
        image: require("../assets/images/healthworkerandmother.png"),
      },
      {
        title: slide7Text,
        image: require("../assets/images/nurse.png"),
      },
    ],
    [
      slide1Text,
      slide2Text,
      slide3Text,
      slide4Text,
      slide5Text,
      slide6Text,
      slide7Text,
    ],
  );

  // Extended data: append a clone of the first slide for seamless looping
  const extendedData = useMemo(
    () => [...slides, { ...slides[0], _clone: true }],
    [slides],
  );

  const getItemLayout = useCallback(
    (_, index) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [],
  );

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index < slides.length) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width }} className="flex-1 items-center justify-center px-5">
      <Image
        source={item.image}
        className="w-[400px] h-[400px] mb-5"
        resizeMode="contain"
      />
      <Text className="text-[24px] font-bold text-center text-[#293231] w-[90%] leading-8">
        {item.title}
      </Text>
    </View>
  );

  // Infinite auto-scroll: animate to clone, then silently reset
  useEffect(() => {
    const interval = setInterval(() => {
      if (isTransitioning.current) return;

      setCurrentIndex((prev) => {
        const next = prev + 1;

        if (next >= slides.length) {
          // Animate to the clone (last item in extendedData)
          isTransitioning.current = true;
          flatListRef.current?.scrollToIndex({
            index: slides.length,
            animated: true,
          });

          // After animation completes, silently jump back to real first slide
          setTimeout(() => {
            flatListRef.current?.scrollToOffset({
              offset: 0,
              animated: false,
            });
            isTransitioning.current = false;
          }, 600);

          return 0;
        }

        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <SafeAreaView className="flex-1 bg-white">
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

      {/* Logo */}
      <View className="px-5 items-start">
        <Image
          source={require("../assets/images/AyomamaLogo.png")}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={extendedData}
        renderItem={renderItem}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={3}
      />

      {/* Bottom Section */}
      <View className="px-5 pb-3">
        {/* Action Buttons */}
        <View className="flex-row justify-center gap-4 mb-2">
          {/* Sign In Button */}
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center border-2 border-[#293231] py-3.5 rounded-2xl"
            onPress={() => router.push("/account/selection?action=login")}
          >
            <Text className="text-[#293231] text-[15px] font-bold mr-2">
              {signInText}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#293231" />
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            className="flex-1 flex-row items-center justify-center bg-[#006D5B] py-3.5 rounded-2xl"
            onPress={() => router.push("/account/selection?action=signup")}
          >
            <Text className="text-white text-[15px] font-bold mr-2">
              {signUpText}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
