import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { getAppLanguage, useAppLanguage } from "./appLanguage";

const TRANSLATION_CACHE_KEY = "ayomama_translation_cache_v1";
const pendingTranslations = new Map();
let translationCache = {};
let hasLoadedCache = false;

async function loadTranslationCache() {
  if (hasLoadedCache) {
    return translationCache;
  }

  try {
    const storedCache = await AsyncStorage.getItem(TRANSLATION_CACHE_KEY);
    translationCache = storedCache ? JSON.parse(storedCache) : {};
  } catch (_error) {
    translationCache = {};
  } finally {
    hasLoadedCache = true;
  }

  return translationCache;
}

async function persistTranslationCache() {
  try {
    await AsyncStorage.setItem(
      TRANSLATION_CACHE_KEY,
      JSON.stringify(translationCache),
    );
  } catch (_error) {
    // Ignore cache persistence errors and keep the in-memory cache alive.
  }
}

function buildCacheKey(language, text) {
  return `${language}::${text}`;
}

function getCachedTranslation(text, language) {
  if (!text || !language || language === "en") {
    return text;
  }

  return translationCache[buildCacheKey(language, text)] || null;
}

function setCachedTranslation(text, language, translatedText) {
  if (!text || !language || language === "en") {
    return;
  }

  translationCache[buildCacheKey(language, text)] = translatedText;
}

function mapLanguage(language) {
  switch (language) {
    case "ha":
      return "ha";
    case "yo":
      return "yo";
    case "ig":
      return "ig";
    default:
      return "en";
  }
}

async function requestAzureTranslation(texts, language) {
  const endpoint = process.env.EXPO_PUBLIC_TRANSLATOR_ENDPOINT;
  const apiKey = process.env.EXPO_PUBLIC_TRANSLATOR_API_KEY;
  const region = process.env.EXPO_PUBLIC_TRANSLATOR_REGION;

  if (!endpoint || !apiKey || !region || language === "en") {
    return texts;
  }

  const response = await fetch(
    `${endpoint.replace(/\/$/, "")}/translate?api-version=3.0&to=${mapLanguage(language)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey,
        "Ocp-Apim-Subscription-Region": region,
      },
      body: JSON.stringify(texts.map((text) => ({ text }))),
    },
  );

  if (!response.ok) {
    throw new Error(`Translator request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return payload.map((item, index) => item?.translations?.[0]?.text || texts[index]);
}

async function translateBatch(texts, language) {
  await loadTranslationCache();

  if (!language || language === "en") {
    return texts;
  }

  const normalizedTexts = texts.filter((text) => Boolean(text?.trim()));
  if (normalizedTexts.length === 0) {
    return texts;
  }

  const uncachedTexts = normalizedTexts.filter(
    (text) => !getCachedTranslation(text, language),
  );

  if (uncachedTexts.length > 0) {
    const requestKey = `${language}::${uncachedTexts.join("|")}`;
    if (!pendingTranslations.has(requestKey)) {
      pendingTranslations.set(
        requestKey,
        requestAzureTranslation(uncachedTexts, language)
          .then(async (translatedTexts) => {
            uncachedTexts.forEach((text, index) => {
              setCachedTranslation(text, language, translatedTexts[index] || text);
            });
            await persistTranslationCache();
            return translatedTexts;
          })
          .finally(() => {
            pendingTranslations.delete(requestKey);
          }),
      );
    }

    await pendingTranslations.get(requestKey);
  }

  return texts.map((text) => getCachedTranslation(text, language) || text);
}

export const useTranslation = (text, targetLang = null) => {
  const { language } = useAppLanguage();
  const resolvedLanguage = targetLang || language;
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    let mounted = true;

    const translate = async () => {
      if (!text || !text.trim()) {
        if (mounted) {
          setTranslatedText("");
        }
        return;
      }

      if (!resolvedLanguage || resolvedLanguage === "en") {
        if (mounted) {
          setTranslatedText(text);
        }
        return;
      }

      const cachedValue = getCachedTranslation(text, resolvedLanguage);
      if (cachedValue) {
        if (mounted) {
          setTranslatedText(cachedValue);
        }
        return;
      }

      if (mounted) {
        setTranslatedText(text);
      }

      try {
        const [translated] = await translateBatch([text], resolvedLanguage);
        if (mounted) {
          setTranslatedText(translated || text);
        }
      } catch (_error) {
        if (mounted) {
          setTranslatedText(text);
        }
      }
    };

    translate();

    return () => {
      mounted = false;
    };
  }, [resolvedLanguage, text]);

  return translatedText;
};

export const useTranslations = (texts, targetLang = null) => {
  const { language } = useAppLanguage();
  const resolvedLanguage = targetLang || language;
  const stableTexts = useMemo(() => texts, [texts]);
  const [translatedTexts, setTranslatedTexts] = useState(stableTexts);

  useEffect(() => {
    let mounted = true;

    const translate = async () => {
      if (!resolvedLanguage || resolvedLanguage === "en") {
        if (mounted) {
          setTranslatedTexts(stableTexts);
        }
        return;
      }

      try {
        const values = await translateBatch(stableTexts, resolvedLanguage);
        if (mounted) {
          setTranslatedTexts(values);
        }
      } catch (_error) {
        if (mounted) {
          setTranslatedTexts(stableTexts);
        }
      }
    };

    translate();

    return () => {
      mounted = false;
    };
  }, [resolvedLanguage, stableTexts]);

  return translatedTexts;
};

export const withTranslation = (Component) => {
  return (props) => {
    const { language } = useAppLanguage();

    return (
      <Component
        {...props}
        t={async (value) => {
          const [translated] = await translateBatch([value], language);
          return translated || value;
        }}
        language={language}
        isTranslating={false}
      />
    );
  };
};

export const translateSync = (text, targetLang) => {
  const language = targetLang || getAppLanguage();
  return getCachedTranslation(text, language) || text;
};
