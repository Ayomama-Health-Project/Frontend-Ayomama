import { useEffect, useMemo, useRef } from "react";
import { TextInput, View } from "react-native";

export default function OtpInputRow({ value, onChange, length = 4 }) {
  const inputRefs = useRef([]);

  const digits = useMemo(() => {
    const next = Array.from({ length }, (_, index) => value[index] || "");
    return next;
  }, [length, value]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const updateAtIndex = (index, rawValue) => {
    const sanitized = rawValue.replace(/\D/g, "");

    if (!sanitized) {
      const nextDigits = [...digits];
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }

    const nextDigits = [...digits];
    const chars = sanitized.slice(0, length - index).split("");

    chars.forEach((char, offset) => {
      nextDigits[index + offset] = char;
    });

    onChange(nextDigits.join("").slice(0, length));

    const nextIndex = Math.min(index + chars.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <View className="mb-4 flex-row items-center justify-between">
      {digits.map((digit, index) => (
        <TextInput
          key={`otp-${index}`}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          value={digit}
          onChangeText={(text) => updateAtIndex(index, text)}
          onKeyPress={({ nativeEvent }) => {
            if (
              nativeEvent.key === "Backspace" &&
              !digits[index] &&
              index > 0
            ) {
              inputRefs.current[index - 1]?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          className="h-16 w-[22%] rounded-2xl border border-[#D8E4E1] bg-white text-center text-2xl font-bold text-[#293231]"
          style={{
            shadowColor: "#0B1B18",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
          }}
        />
      ))}
    </View>
  );
}
