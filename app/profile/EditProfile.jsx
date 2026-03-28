import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import useMockAuth from "../../hooks/useMockAuth";
import { uploadImageToCloudinary } from "../../utils/cloudinary";
import { useTranslation } from "../../utils/translator";

export default function EditProfile() {
  const router = useRouter();
  const { user, updateProfileInformation } = useMockAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const editProfileText = useTranslation("Edit Profile");
  const enterNameText = useTranslation("Enter your name");
  const enterEmailText = useTranslation("Enter your email");
  const enterPhoneText = useTranslation("Enter your phone number");
  const saveText = useTranslation("Save");

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
      <SafeAreaView className="flex-1 bg-[#FCFCFC]">
        <LinearGradient
          colors={["#BCF2E9", "#FCFCFC"]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, height: 280 }}
        />

        <View className="flex-1">
          <View className="px-6 flex-row items-center" style={{ paddingTop: 16 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-white items-center justify-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#293231" />
            </TouchableOpacity>
          </View>

          <View className="items-center mt-8 mb-12">
            <View className="relative">
              <Image source={getAvatarSource()} className="w-24 h-28 rounded-3xl" resizeMode="cover" />
              <TouchableOpacity
                onPress={handleChangePhoto}
                className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full items-center justify-center"
              >
                <Ionicons name="pencil" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-6">
            <Text className="text-lg font-bold text-[#293231] mb-6">{editProfileText}</Text>

            <View className="bg-white rounded-2xl mb-4 px-4 py-[14px] flex-row items-center justify-between border border-[#E5E5E5]">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder={enterNameText}
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-[16px] text-[#293231]"
              />
              <Ionicons name="pencil" size={18} color="#293231" />
            </View>

            <View className="bg-white rounded-2xl mb-4 px-4 py-[14px] flex-row items-center justify-between border border-[#E5E5E5]">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={enterEmailText}
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
                className="flex-1 text-[16px] text-[#293231]"
              />
              <Ionicons name="mail-outline" size={18} color="#293231" />
            </View>

            <View className="bg-white rounded-2xl mb-8 px-4 py-[14px] flex-row items-center justify-between border border-[#E5E5E5]">
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder={enterPhoneText}
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                className="flex-1 text-[16px] text-[#293231]"
              />
              <Ionicons name="pencil" size={18} color="#293231" />
            </View>

            <TouchableOpacity
              onPress={handleSave}
              disabled={isSaving}
              className="bg-[#BCF2E9] rounded-2xl h-[56px] items-center justify-center"
            >
              <Text className="text-[#293231] font-semibold text-[16px]">{saveText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
