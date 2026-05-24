import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function CommunityBlogsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace({ pathname: "/community", params: { tab: "blogs" } });
  }, [router]);

  return null;
}
