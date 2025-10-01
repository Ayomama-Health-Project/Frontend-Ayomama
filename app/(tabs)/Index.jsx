import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, View } from "react-native";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // navigate to onboarding screen after 4 seconds
      router.replace("/Onboarding");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);


  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("../../assets/images/Ayomama Logo.png")}
        className="w-52 h-52"
        resizeMode="contain"
      />
    </View>
  );
};

export default Home;
