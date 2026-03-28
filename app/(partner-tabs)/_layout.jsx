import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import AnimatedTabBar from "../../components/navigation/AnimatedTabBar";
import { useTranslation } from "../../utils/translator";

export default function PartnerTabLayout() {
  const homeText = useTranslation("Home");
  const messagesText = useTranslation("Messages");
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
        name="messages"
        options={{
          title: messagesText,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubbles" size={24} color={color} />
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
