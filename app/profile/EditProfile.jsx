import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { EditableTextField, ProfileTopBar, SaveButton } from "../../components/shared/profile/shared";
import useAppAuth from "../../hooks/useAppAuth";
import { uploadImageToCloudinary } from "../../utils/cloudinary";

export default function EditProfile() {
  const router = useRouter();
  const { user, updateProfileInformation } = useAppAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const getAvatarSource = () => {
    if (avatar && typeof avatar === "string" && avatar.trim() !== "") {
      return { uri: avatar };
    }
    return require("../../assets/images/profilepic.png");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateProfileInformation({
        fullName: name,
        phoneNumber: phone,
        profilePicture: avatar || undefined,
      });
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile information has been saved.",
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Save failed",
        text2: error?.response?.data?.detail || "We could not update your profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePhoto = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Toast.show({
          type: "info",
          text1: "Permission needed",
          text2: "Allow photo access to upload a profile image.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 5],
      });

      if (result.canceled) return;
      const imageUri = result.assets?.[0]?.uri;
      if (!imageUri) return;

      setIsSaving(true);
      const uploadedUrl = await uploadImageToCloudinary(imageUri);
      setAvatar(uploadedUrl);
      Toast.show({
        type: "success",
        text1: "Photo uploaded",
        text2: "Your new profile photo is ready to save.",
      });
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Upload failed",
        text2: "We could not upload your image just now.",
      });
    } finally {
      setIsSaving(false);
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
            <ProfileTopBar title="Edit Profile" onBack={() => router.back()} />

            <View className="items-center mb-12 mt-2">
              <View className="relative">
                <Image source={getAvatarSource()} className="w-24 h-28 rounded-3xl" resizeMode="cover" />
                <TouchableOpacity
                  onPress={handleChangePhoto}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-transparent items-center justify-center"
                >
                  <Text className="text-[28px] text-[#293231]">✎</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-1 px-6">
              <Text className="mb-6 text-lg font-bold text-[#293231]">Edit Profile</Text>

              <View className="mb-5">
                <EditableTextField value={name} onChangeText={setName} placeholder="Enter your name" />
              </View>
              <View className="mb-5">
                <EditableTextField value={email} onChangeText={setEmail} placeholder="Enter your email" editable={false} icon="mail-outline" />
              </View>
              <View className="mb-10">
                <EditableTextField value={phone} onChangeText={setPhone} placeholder="Enter your phone number" keyboardType="phone-pad" />
              </View>

              <View className="mt-auto pt-2">
                <SaveButton label={isSaving ? "Saving..." : "Save"} onPress={handleSave} disabled={isSaving} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
