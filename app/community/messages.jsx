import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function CommunityMessagesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace({ pathname: "/community", params: { tab: "messages" } });
  }, [router]);

  return null;
}
