import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
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
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
