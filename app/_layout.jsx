import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "../global.css";
import useAuthStore from "../store/useAuthStore";
import useAuthWorkerStore from "../store/useAuthWorkerStore";
import useTranslatorStore from "../store/useTranslatorStore";

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const initializeWorkerAuth = useAuthWorkerStore(
    (state) => state.initializeAuth,
  );
  const initializeTranslator = useTranslatorStore((state) => state.initialize);

  useEffect(() => {
    // Initialize auth state on app load (for both mothers and workers)
    initializeAuth();
    initializeWorkerAuth();

    // Initialize translator (load cached translations and language preference)
    initializeTranslator();
  }, []);

  return (
    <>
      <StatusBar barStyle="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="account/selection" />
        <Stack.Screen name="account/setup" />
        <Stack.Screen name="auth/currentuser" />
        <Stack.Screen name="auth/mother/login" />
        <Stack.Screen name="auth/mother/signup" />
        <Stack.Screen name="auth/healthworker/login" />
        <Stack.Screen name="auth/healthworker/signup" />
        <Stack.Screen name="auth/partner/login" />
        <Stack.Screen name="auth/partner/signup" />
        {/* Onboarding flows */}
        <Stack.Screen name="onboarding/mother/pregnant" />
        <Stack.Screen name="onboarding/mother/postpartum" />
        <Stack.Screen name="onboarding/partner" />
        <Stack.Screen name="onboarding/healthworker" />
        <Stack.Screen name="info/InfoCarousel" />
        <Stack.Screen name="info/LanguageStep" />
        <Stack.Screen name="info/InformationStep" />
        <Stack.Screen name="info/AntenatalStep" />
        <Stack.Screen name="info/NotificationStep" />
        <Stack.Screen name="healthinfo/info" />
        <Stack.Screen name="healthinfo/HealthInfoStep" />
        <Stack.Screen name="profile/EditProfile" />
        <Stack.Screen name="profile/ChangeLanguage" />
        <Stack.Screen name="profile/Security" />
        <Stack.Screen name="chat/SmartChat" />
        <Stack.Screen name="community/index" />
        <Stack.Screen name="babyDevelopment/development" />
        <Stack.Screen name="updateVitals/update" />
        <Stack.Screen name="visit/visitInput" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="(mother-tabs)" />
        <Stack.Screen name="(partner-tabs)" />
        <Stack.Screen name="(healthworker-tabs)" />
      </Stack>
    </>
  );
}
