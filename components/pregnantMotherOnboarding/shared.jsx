import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";

export function ProgressDots({ step }) {
  return (
    <View className="items-center pt-4 pb-8">
      <View className="flex-row items-center gap-2">
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            className={`h-[9px] rounded-full ${
              index === Math.min(step, 3) ? "w-7 bg-white" : "w-[9px] bg-[#8E9291]"
            }`}
          />
        ))}
      </View>
    </View>
  );
}

export function StepHeading({ title, subtitle }) {
  return (
    <View className="px-5">
      <Text className="text-[20px] font-medium text-[#293231]">{title}</Text>
      {subtitle ? (
        <Text className="mt-4 text-[16px] font-medium leading-6 text-[#293231]/50">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export function PrimaryButton({ label, onPress, disabled, loading, loadingLabel }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-[46px] items-center justify-center rounded-[15px] ${
        disabled || loading ? "bg-[#80B7AE]" : "bg-[#006D5B]"
      }`}
    >
      {loading ? (
        <View className="flex-row items-center">
          <ActivityIndicator size="small" color="#FCFCFC" />
          <Text className="ml-2 text-[14px] font-semibold text-[#FCFCFC]">
            {loadingLabel || label}
          </Text>
        </View>
      ) : (
        <Text className="text-[14px] font-semibold text-[#FCFCFC]">{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export function SecondaryButton({ label, onPress, disabled, loading, loadingLabel }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled || loading}
      className="h-[46px] items-center justify-center rounded-[15px] bg-white"
    >
      {loading ? (
        <View className="flex-row items-center">
          <ActivityIndicator size="small" color="#293231" />
          <Text className="ml-2 text-[14px] font-semibold text-[#293231]">
            {loadingLabel || label}
          </Text>
        </View>
      ) : (
        <Text className="text-[14px] font-semibold text-[#293231]">{label}</Text>
      )}
    </TouchableOpacity>
  );
}

export function Label({ children, dark }) {
  return (
    <Text
      className={`text-[16px] font-medium ${
        dark ? "text-[#293231]" : "text-[#293231]/50"
      }`}
    >
      {children}
    </Text>
  );
}

export function InputField(props) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="rgba(41,50,49,0.33)"
      className="h-[46px] rounded-[10px] border border-white bg-white px-4 text-[16px] text-[#293231]"
    />
  );
}

export function PickerField({ value, placeholder, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      onPress={onPress}
      className="h-[46px] w-full flex-row items-center justify-between rounded-[10px] border border-white bg-white px-4"
    >
      <Text className={`text-[16px] ${value ? "text-[#293231]" : "text-[#293231]/35"}`}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={18} color="#293231" />
    </TouchableOpacity>
  );
}

export function TinyButton({ label, onPress, filled, disabled, loading, loadingLabel }) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-[34px] min-w-[92px] items-center justify-center rounded-[10px] px-5 ${
        filled
          ? disabled || loading
            ? "bg-[#80B7AE]"
            : "bg-[#006D5B]"
          : "bg-[#E9E9E9]"
      }`}
    >
      {loading ? (
        <View className="flex-row items-center">
          <ActivityIndicator size="small" color={filled ? "#FFFFFF" : "#293231"} />
          <Text
            className={`ml-2 text-[14px] font-semibold ${filled ? "text-white" : "text-[#293231]"}`}
          >
            {loadingLabel || label}
          </Text>
        </View>
      ) : (
        <Text className={`text-[14px] font-semibold ${filled ? "text-white" : "text-[#293231]"}`}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
