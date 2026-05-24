import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { EditableTextField, ProfileTopBar, SaveButton } from "../../components/shared/profile/shared";
import useAppAuth from "../../hooks/useAppAuth";
import { uploadImageToCloudinary } from "../../utils/cloudinary";

function formatDisplayDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
}

export default function EditProfile() {
  const router = useRouter();
  const { account, updateProfileInformation, refreshUser } = useAppAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [babyName, setBabyName] = useState("");
  const [dueDate, setDueDate] = useState(null); // Date object or null
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTemp, setPickerTemp] = useState(new Date());
  const [avatar, setAvatar] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (account) {
      setName(account?.profile?.fullName || "");
      setEmail(account?.email || "");
      setPhone(account?.profile?.phoneNumber || "");
      setAvatar(account?.profilePicture || "");
      setBabyName(account?.profile?.babyName || account?.profile?.babyNickname || "");
      if (account?.profile?.dueDate) {
        const d = new Date(account.profile.dueDate);
        if (!isNaN(d.getTime())) {
          setDueDate(d);
          setPickerTemp(d);
        }
      }
    }
  }, [account]);

  const getAvatarSource = () => {
    if (avatar && typeof avatar === "string" && avatar.trim() !== "") {
      return { uri: avatar };
    }
    return require("../../assets/images/profilepic.png");
  };

  const openPicker = () => {
    setPickerTemp(dueDate || new Date());
    setShowPicker(true);
  };

  const handlePickerChange = (event, selected) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
      if (event.type === "set" && selected) setDueDate(selected);
    } else {
      if (selected) setPickerTemp(selected);
    }
  };

  const confirmIOSDate = () => {
    setDueDate(pickerTemp);
    setShowPicker(false);
  };

  const cancelIOSDate = () => {
    setShowPicker(false);
  };

  const clearDueDate = () => {
    setDueDate(null);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = {
        fullName: name,
        phoneNumber: phone,
        profilePicture: avatar || undefined,
      };

      if (account?.role === "mother") {
        payload.babyName = babyName;
        payload.babyNickname = babyName;
        // Only include dueDate if user actually has one — omit entirely when null
        if (dueDate) {
          payload.dueDate = dueDate.toISOString();
        }
      }

      await updateProfileInformation(payload);
      await refreshUser();
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile information has been saved.",
      });
      router.back();
    } catch (error) {
      const errData = error?.response?.data;
      const fieldErrors = errData?.errors?.map((e) => e.message).join(", ");
      Toast.show({
        type: "error",
        text1: "Save failed",
        text2: fieldErrors || errData?.detail || "We could not update your profile.",
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

              {account?.role === "mother" ? (
                <View className="mb-10">
                  <View className="mb-5">
                    <EditableTextField value={babyName} onChangeText={setBabyName} placeholder="Enter baby name or nickname" />
                  </View>

                  {/* Due Date Picker */}
                  <View className="mb-5">
                    <Text className="text-xs text-gray-500 mb-1 ml-1">Due Date</Text>
                    <TouchableOpacity
                      onPress={openPicker}
                      activeOpacity={0.7}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        borderRadius: 12,
                        paddingHorizontal: 14,
                        paddingVertical: 14,
                        backgroundColor: "#F9FAFB",
                      }}
                    >
                      <Ionicons name="calendar-outline" size={18} color="#6B7280" style={{ marginRight: 8 }} />
                      <Text style={{ flex: 1, color: dueDate ? "#293231" : "#9CA3AF", fontSize: 15 }}>
                        {dueDate ? formatDisplayDate(dueDate) : "Select due date"}
                      </Text>
                      {dueDate ? (
                        <TouchableOpacity
                          onPress={(e) => { e.stopPropagation?.(); clearDueDate(); }}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
                        </TouchableOpacity>
                      ) : (
                        <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <View className="mb-10">
                <EditableTextField value={phone} onChangeText={setPhone} placeholder="Enter your phone number" keyboardType="phone-pad" />
              </View>

              <View className="mt-auto pt-2">
                <SaveButton label={isSaving ? "Saving..." : "Save"} onPress={handleSave} disabled={isSaving} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* iOS Date Picker Modal */}
        {Platform.OS === "ios" && (
          <Modal visible={showPicker} transparent animationType="slide">
            <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" }}>
              <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 34 }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: "#F3F4F6",
                }}>
                  <TouchableOpacity onPress={cancelIOSDate}>
                    <Text style={{ fontSize: 16, color: "#6B7280" }}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: "#293231" }}>Due Date</Text>
                  <TouchableOpacity onPress={confirmIOSDate}>
                    <Text style={{ fontSize: 16, color: "#16A34A", fontWeight: "600" }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={pickerTemp}
                  mode="date"
                  display="spinner"
                  onChange={handlePickerChange}
                  minimumDate={new Date()}
                  style={{ height: 200 }}
                  textColor="#293231"
                />
              </View>
            </View>
          </Modal>
        )}

        {/* Android Date Picker */}
        {Platform.OS === "android" && showPicker && (
          <DateTimePicker
            value={pickerTemp}
            mode="date"
            display="default"
            onChange={handlePickerChange}
            minimumDate={new Date()}
          />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
