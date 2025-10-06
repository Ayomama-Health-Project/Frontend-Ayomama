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
        <Stack.Screen name="AccountSelection" />
        <Stack.Screen name="auth/currentuser" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="auth/healthcare/login" />
        <Stack.Screen name="auth/healthcare/signup" />
        <Stack.Screen name="info/InfoCarousel" />
        <Stack.Screen name="info/LanguageStep" />
        <Stack.Screen name="info/InformationStep" />
        <Stack.Screen name="info/NotificationStep" />
        <Stack.Screen name="healthinfo/info" />
        <Stack.Screen name="healthinfo/HealthInfoStep" />
        <Stack.Screen name="healthworker/dashboard" />
        <Stack.Screen name="healthworker/addPatient" />
        <Stack.Screen name="healthworker/logVisit" />
        <Stack.Screen name="healthworker/profile" />
        <Stack.Screen name="profile/EditProfile" />
        <Stack.Screen name="profile/ChangeLanguage" />
        <Stack.Screen name="profile/Security" />
        <Stack.Screen name="chat/SmartChat" />
        <Stack.Screen name="community" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
