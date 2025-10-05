import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "../global.css";
import useAuthStore from "../store/useAuthStore";

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Initialize auth state on app load
    initializeAuth();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="auth/currentuser" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="info/InfoCarousel" />
        <Stack.Screen name="info/LanguageStep" />
        <Stack.Screen name="info/InformationStep" />
        <Stack.Screen name="info/NotificationStep" />
        <Stack.Screen name="profile/EditProfile" />
        <Stack.Screen name="profile/ChangeLanguage" />
        <Stack.Screen name="profile/Security" />
        <Stack.Screen name="chat/SmartChat" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
