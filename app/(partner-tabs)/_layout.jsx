import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import AnimatedTabBar from "../../components/navigation/AnimatedTabBar";
import { useTranslation } from "../../utils/translator";

export default function PartnerTabLayout() {
  const homeText = useTranslation("Home");
  const visitText = useTranslation("Visit");
  const emergencyText = useTranslation("Emergency");
  const hubText = useTranslation("Hub");
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
        name="visit"
        options={{
          title: visitText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: emergencyText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="medkit" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="hub"
        options={{
          title: hubText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="sparkles" size={24} color={color} />
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
    </Tabs>
  );
}
