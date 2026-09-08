import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function HealthWorkersRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace({ pathname: "/community", params: { tab: "workers" } });
  }, [router]);

  return null;
}
