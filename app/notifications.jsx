import SharedNotificationsScreen from "../components/shared/notifications/SharedNotificationsScreen";
import useAppAuth from "../hooks/useAppAuth";

export default function Notifications() {
  const { account } = useAppAuth();

  return (
    <SharedNotificationsScreen
      role={account?.role === "partner" ? "partner" : "default"}
    />
  );
}
