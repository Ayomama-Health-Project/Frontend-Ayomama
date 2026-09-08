import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import useAppAuth from "../hooks/useAppAuth";

export default function SplashScreen() {
  const router = useRouter();
  const { initializeAuth } = useAppAuth();

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      const account = await initializeAuth();
      if (!mounted) return;

      setTimeout(() => {
        if (!mounted) return;
        router.replace(account ? "/(auth)/auth/currentuser" : "/Onboarding");
      }, 1200);
    };

    boot();

    return () => {
      mounted = false;
    };
  }, [initializeAuth, router]);

  return (
    <View className="flex-1 justify-center items-center bg-[#FCFCFC]">
      <Image
        source={require("../assets/images/AyomamaLogo.png")}
        className="w-48 h-48"
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#006D5B" className="mt-4" />
    </View>
  );
}
