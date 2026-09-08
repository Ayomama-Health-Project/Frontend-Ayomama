import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const ACCESS_KEY = "ayomama_access_token";
const REFRESH_KEY = "ayomama_refresh_token";

async function setSecureValue(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (_error) {
    await AsyncStorage.setItem(key, value);
  }
}

async function getSecureValue(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (_error) {
    return AsyncStorage.getItem(key);
  }
}

async function deleteSecureValue(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (_error) {
    await AsyncStorage.removeItem(key);
  }
}

export async function persistTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    await setSecureValue(ACCESS_KEY, accessToken);
  }
  if (refreshToken) {
    await setSecureValue(REFRESH_KEY, refreshToken);
  }
}

export async function getStoredTokens() {
  const [accessToken, refreshToken] = await Promise.all([
    getSecureValue(ACCESS_KEY),
    getSecureValue(REFRESH_KEY),
  ]);

  return { accessToken, refreshToken };
}

export async function clearStoredTokens() {
  await Promise.all([deleteSecureValue(ACCESS_KEY), deleteSecureValue(REFRESH_KEY)]);
}
