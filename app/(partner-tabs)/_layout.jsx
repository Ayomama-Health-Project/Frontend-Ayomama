import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Toast from "react-native-toast-message";
import { useTranslation } from "../../utils/translator";

export default function PartnerTabLayout() {
  const homeText = useTranslation("Home");
  const messagesText = useTranslation("Messages");
  const profileText = useTranslation("Profile");

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#293231",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarItemStyle: {
            height: 50,
            alignItems: "center",
            justifyContent: "center",
          },
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopColor: "#E5E5E5",
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 12,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
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
      <Toast />
    </>
  );
}
