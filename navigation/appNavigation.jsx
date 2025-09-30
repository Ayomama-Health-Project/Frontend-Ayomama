import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../app/(tabs)/Index";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Index}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
