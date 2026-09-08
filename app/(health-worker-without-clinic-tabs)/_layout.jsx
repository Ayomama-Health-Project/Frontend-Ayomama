import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import AnimatedTabBar from "../../components/navigation/AnimatedTabBar";
import { useTranslation } from "../../utils/translator";

export default function HealthworkerTabLayout() {
  const homeText = useTranslation("Home");
  const patientsText = useTranslation("Patients");
  const visitsText = useTranslation("Visits");
  const profileText = useTranslation("Profile");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: homeText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: patientsText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="visits"
        options={{
          title: visitsText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: profileText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="dashboard" options={{ href: null }} />
      <Tabs.Screen name="addPatient" options={{ href: null }} />
      <Tabs.Screen name="logVisit" options={{ href: null }} />
      <Tabs.Screen name="motherInfo" options={{ href: null }} />
    </Tabs>
  );
}
