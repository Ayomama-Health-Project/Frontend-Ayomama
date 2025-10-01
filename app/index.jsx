import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Onboarding");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("../assets/images/AyomamaLogo.png")}
        className="w-48 h-48"
        resizeMode="contain"
      />
    </View>
  );
}
