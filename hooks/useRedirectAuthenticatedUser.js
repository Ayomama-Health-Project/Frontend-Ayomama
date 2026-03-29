import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useRedirectAuthenticatedUser() {
  const router = useRouter();
  const { account, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!initialized) return;
    if (account) {
      router.replace("/(auth)/auth/currentuser");
    }
  }, [account, initialized, router]);

  return {
    isCheckingAuthScreenAccess: !initialized || Boolean(account),
  };
}
