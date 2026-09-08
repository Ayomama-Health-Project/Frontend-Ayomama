import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

let currentLanguage = "en";
const listeners = new Set();
const LANGUAGE_STORAGE_KEY = "ayomama_app_language";
let hasHydratedLanguage = false;

function notifyLanguageListeners() {
  listeners.forEach((listener) => listener(currentLanguage));
}

async function hydrateStoredLanguage() {
  if (hasHydratedLanguage) {
    return currentLanguage;
  }

  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage) {
      currentLanguage = storedLanguage;
    }
  } catch (_error) {
    // Ignore storage failures and continue with the default language.
  } finally {
    hasHydratedLanguage = true;
  }

  notifyLanguageListeners();
  return currentLanguage;
}

export function getAppLanguage() {
  return currentLanguage;
}

export async function setAppLanguage(language) {
  currentLanguage = language || "en";
  hasHydratedLanguage = true;
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  } catch (_error) {
    // Ignore storage failures and continue updating in-memory state.
  }
  notifyLanguageListeners();
  return currentLanguage;
}

export function useAppLanguage() {
  const [language, setLanguageState] = useState(currentLanguage);

  useEffect(() => {
    listeners.add(setLanguageState);
    hydrateStoredLanguage();
    return () => listeners.delete(setLanguageState);
  }, []);

  return {
    language,
    setLanguage: setAppLanguage,
  };
}
