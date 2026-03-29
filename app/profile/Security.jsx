import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { EditableTextField, ProfileTopBar, SaveButton } from "../../components/shared/profile/shared";
import useAppAuth from "../../hooks/useAppAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Security() {
  const router = useRouter();
  const { changePassword } = useAppAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
        text2: "Please confirm the new password correctly.",
      });
      return;
    }
    try {
      await changePassword({ oldPassword, newPassword });
      Toast.show({
        type: "success",
        text1: "Password updated",
        text2: "Please use the new password next time you log in.",
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: error?.response?.data?.detail || "We could not update your password.",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <LinearGradient
          colors={["#DDF4EE", "#FFFFFF"]}
          style={{ position: "absolute", left: 0, right: 0, top: 0, height: 220 }}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === "ios" ? 24 : 0}
        >
          <ScrollView
            className="flex-1"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          >
            <ProfileTopBar title="Change Password" onBack={() => router.back()} />

            <View className="mt-10 flex-1 px-5">
              <Text className="mb-3 text-[15px] font-semibold text-[#293231]">Old Password</Text>
              <View className="mb-6">
                <EditableTextField
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  placeholder="**********"
                  secureTextEntry={!showOldPassword}
                />
              </View>

              <Text className="mb-3 text-[15px] font-semibold text-[#293231]">New Password</Text>
              <View className="mb-6">
                <EditableTextField
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="**********"
                  secureTextEntry={!showNewPassword}
                />
              </View>

              <Text className="mb-3 text-[15px] font-semibold text-[#293231]">Confirm Password</Text>
              <View className="mb-10">
                <EditableTextField
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="**********"
                  secureTextEntry={!showConfirmPassword}
                />
              </View>

              <View className="mt-auto pt-2">
                <SaveButton onPress={handleSave} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
