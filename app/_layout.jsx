import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import AppProviders from "../components/AppProviders";
import "../global.css";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar barStyle="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="account/selection" />
        <Stack.Screen name="account/type-selection" />
        <Stack.Screen name="account/setup" />
        <Stack.Screen
          name="language-picker"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="(auth)/auth/currentuser" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/mother/login" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/mother/signup" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/healthworker/login" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/healthworker/signup" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/partner/login" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/partner/signup" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/forgot-password" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(auth)/auth/reset-password" options={{ gestureEnabled: false }} />
        {/* Onboarding flows */}
        <Stack.Screen name="onboarding/mother/pregnant" options={{ gestureEnabled: false }} />
        <Stack.Screen name="onboarding/mother/postpartum" options={{ gestureEnabled: false }} />
        <Stack.Screen name="onboarding/partner/index" options={{ gestureEnabled: false }} />
        <Stack.Screen name="onboarding/healthworker/index" options={{ gestureEnabled: false }} />
        <Stack.Screen name="info/InfoCarousel" />
        <Stack.Screen name="info/LanguageStep" />
        <Stack.Screen name="info/InformationStep" />
        <Stack.Screen name="info/AntenatalStep" />
        <Stack.Screen name="info/NotificationStep" />
        <Stack.Screen name="healthinfo/info" />
        <Stack.Screen name="healthinfo/HealthInfoStep" />
        <Stack.Screen name="profile/EditProfile" />
        <Stack.Screen name="profile/Security" />
        <Stack.Screen name="chat/SmartChat" />
        <Stack.Screen name="community/index" />
        <Stack.Screen name="babyDevelopment/development" />
        <Stack.Screen name="updateVitals/update" />
        <Stack.Screen name="visit/visitInput" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="(pregnant-women-tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(post-partum-women-tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(health-worker-with-clinic-tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(health-worker-without-clinic-tabs)" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(partner-tabs)" options={{ gestureEnabled: false }} />
      </Stack>
    </AppProviders>
  );
}
