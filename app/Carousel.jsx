import { useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

import PersonalInfo from "./Information";
import Language from "./Language";
import Notifications from "./Notification";

const { width } = Dimensions.get("window");

const screens = [
  { key: "1", component: <Language /> },
  { key: "2", component: <PersonalInfo /> },
  { key: "3", component: <Notifications /> },
];

const Carousel = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View className="flex-1 bg-['#FFDEE9'] bg-cover">
      {/* Pagination Dots at Top */}
      <View className="flex-row justify-center mt-5 mb-3 ">
        {screens.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full mx-1 ${
              currentIndex === index ? "w-5 bg-blue-500" : "w-2 bg-gray-400"
            }`}
          />
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        data={screens}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1">
            {item.component}
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Prev / Next buttons at bottom */}
      {/* <View className="flex-row justify-between p-5 bg-['#B5FFFC'] bg-cover">
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 rounded-lg ${
            currentIndex === 0 ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-bold">Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === screens.length - 1}
          className={`px-4 py-2 rounded-lg ${
            currentIndex === screens.length - 1 ? "bg-gray-400" : "bg-blue-500"
          }`}
        >
          <Text className="text-white font-bold">
            {currentIndex === screens.length - 1 ? "Done" : "Next"}
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Carousel;
