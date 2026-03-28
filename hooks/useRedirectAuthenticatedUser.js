import { useRouter } from "expo-router";
import { useEffect } from "react";
import useAppAuth from "./useAppAuth";

export default function useRedirectAuthenticatedUser() {
  const router = useRouter();
  const { account, isLoading } = useAppAuth();

  useEffect(() => {
    if (isLoading) return;
    if (account) {
      router.replace("/(auth)/auth/currentuser");
    }
  }, [account, isLoading, router]);

  return {
    isCheckingAuthScreenAccess: isLoading || Boolean(account),
  };
}
