import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Toast from "react-native-toast-message";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarItemStyle: {
            borderRadius: 200,
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
          // tabBarActiveBackgroundColor: "#B4EFE680",
          // tabBarInactiveBackgroundColor: "transparent",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="visit"
          options={{
            title: "Visit",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "calendar" : "calendar"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="emergency"
          options={{
            title: "Emergency",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "medkit" : "medkit"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Learn",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "headset" : "headset"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}
