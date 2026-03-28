import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AppToast() {
  const insets = useSafeAreaInsets();

  return (
    <Toast
      topOffset={Math.max(insets.top + 12, 56)}
      bottomOffset={Math.max(insets.bottom + 12, 24)}
    />
  );
}
