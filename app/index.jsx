import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import useAuthStore from "../store/useAuthStore";

export default function SplashScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          // User is authenticated, go to currentuser page
          router.replace("/auth/currentuser");
        } else {
          // User is not authenticated, go to onboarding
          router.replace("/Onboarding");
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <View className="flex-1 justify-center items-center bg-[#FCFCFC]">
      <Image
        source={require("../assets/images/AyomamaLogo.png")}
        className="w-48 h-48"
        resizeMode="contain"
      />
      {isLoading && (
        <ActivityIndicator size="large" color="#006D5B" className="mt-4" />
      )}
    </View>
  );
}
