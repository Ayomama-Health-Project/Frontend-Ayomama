import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export async function requestPushNotificationToken() {
  const permission = await Notifications.requestPermissionsAsync();
  if (!permission.granted) {
    return null;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId;

  try {
    const token = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined,
    );
    return token.data;
  } catch (_error) {
    return null;
  }
}
