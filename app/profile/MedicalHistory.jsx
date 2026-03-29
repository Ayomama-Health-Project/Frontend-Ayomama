import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { EditableTextField, ProfileTopBar, SaveButton } from "../../components/shared/profile/shared";

export default function MedicalHistory() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [genotype, setGenotype] = useState("AA");
  const [hivScreening, setHivScreening] = useState("HIV-");
  const [hepatitis, setHepatitis] = useState("B-");

  const handleSave = () => {
    Toast.show({
      type: "success",
      text1: "Medical history updated",
      text2: "Your medical history has been saved locally for now.",
      position: "top",
    });
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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
            <ProfileTopBar title="Edit Medical History" onBack={() => router.back()} />
            <View className="flex-1 px-5 pt-10">
              <View className="mb-6">
                <Text className="mb-3 text-[15px] font-semibold text-[#293231]">Blood group</Text>
                <EditableTextField value={bloodGroup} onChangeText={setBloodGroup} placeholder="Blood group" />
              </View>
              <View className="mb-6">
                <Text className="mb-3 text-[15px] font-semibold text-[#293231]">Genotype</Text>
                <EditableTextField value={genotype} onChangeText={setGenotype} placeholder="Genotype" />
              </View>
              <View className="mb-6">
                <Text className="mb-3 text-[15px] font-semibold text-[#293231]">HIV Screening</Text>
                <EditableTextField value={hivScreening} onChangeText={setHivScreening} placeholder="HIV Screening" />
              </View>
              <View className="mb-10">
                <Text className="mb-3 text-[15px] font-semibold text-[#293231]">Hepatitis</Text>
                <EditableTextField value={hepatitis} onChangeText={setHepatitis} placeholder="Hepatitis" />
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
