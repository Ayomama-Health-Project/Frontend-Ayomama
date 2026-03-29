import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

export function ProfileTopBar({ title, onBack }) {
  return (
    <View className="relative overflow-hidden px-5 pb-6 pt-3">
      <LinearGradient
        colors={["#DDF4EE", "rgba(221,244,238,0.78)", "rgba(255,255,255,0)"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, height: 132 }}
      />
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.82}
          className="h-11 w-11 items-center justify-center rounded-full bg-white/90"
        >
          <Ionicons name="arrow-back" size={22} color="#293231" />
        </TouchableOpacity>
        <Text className="ml-16 text-[18px] font-bold text-[#293231]">{title}</Text>
      </View>
    </View>
  );
}

export function EditableTextField({ value, onChangeText, placeholder, keyboardType = "default", secureTextEntry = false, editable = true, icon = "create-outline" }) {
  return (
    <View className="flex-row items-center rounded-[16px] border border-[#D8DDDC] bg-white px-4 py-4">
      <TextInputShim
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      <Ionicons name={icon} size={20} color="#293231" />
    </View>
  );
}

function TextInputShim(props) {
  const { TextInput } = require("react-native");
  return (
    <TextInput
      {...props}
      placeholderTextColor="#9CA3AF"
      className="flex-1 text-[16px] text-[#293231]"
    />
  );
}

export function SaveButton({ label = "Save", onPress, disabled = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      className="h-[56px] items-center justify-center rounded-[16px] bg-[#D8F0EB]"
    >
      <Text className="text-[18px] font-semibold text-[#293231]">{label}</Text>
    </TouchableOpacity>
  );
}

export function ProfileMenuRow({ icon, label, onPress, trailing = "chevron-forward", rightContent = null }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      className="mb-5 flex-row items-center justify-between rounded-[18px] bg-[#DDF4EE] px-5 py-5"
    >
      <View className="flex-row items-center">
        <Ionicons name={icon} size={21} color="#293231" />
        <Text className="ml-4 text-[16px] font-semibold text-[#293231]">{label}</Text>
      </View>
      {rightContent || <Ionicons name={trailing} size={20} color="#293231" />}
    </TouchableOpacity>
  );
}
