import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function useRedirectAuthenticatedUser(resolveRoute) {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { account, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isFocused) return;
    if (!initialized) return;
    if (account) {
      router.replace(
        typeof resolveRoute === "function"
          ? resolveRoute(account)
          : "/(auth)/auth/currentuser",
      );
    }
  }, [account, initialized, isFocused, resolveRoute, router]);

  return {
    isCheckingAuthScreenAccess: isFocused && (!initialized || Boolean(account)),
  };
}
