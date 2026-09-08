import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function WellnessGrid({ items, onStart }) {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeSessionId) || null,
    [activeSessionId, items],
  );

  useEffect(() => {
    if (!activeSessionId || isPaused) return undefined;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveSessionId(null);
          setIsPaused(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSessionId, isPaused]);

  const getMinutesFromMeta = (meta) => {
    const match = String(meta || "").match(/(\d+)/);
    return match ? Number(match[1]) : 10;
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStart = (item) => {
    const nextSeconds = getMinutesFromMeta(item.meta) * 60;
    setActiveSessionId(item.id);
    setRemainingSeconds(nextSeconds);
    setIsPaused(false);
    onStart?.(item.title);
  };

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);
  const handleStop = () => {
    setActiveSessionId(null);
    setRemainingSeconds(0);
    setIsPaused(false);
  };

  return (
    <Card>
      <SectionTitle icon="leaf-outline" title="Wellness Activities" />
      <View className="flex-row flex-wrap justify-between gap-y-3">
        {items.map((item) => (
          <View key={item.id} className="w-[48%] rounded-[24px] border border-[#E7EFEC] bg-[#FBFCFC] px-3 py-4">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F7F3]">
              <Ionicons name={item.icon} size={22} color="#006D5B" />
            </View>
            <Text className="mt-4 text-[14px] font-bold text-[#223130]">{item.title}</Text>
            <Text className="mt-1 text-[11px] text-[#6F7B78]">{item.meta}</Text>
            {activeSessionId === item.id ? (
              <View className="mt-4">
                <View className="rounded-[16px] bg-[#EAF7F3] px-3 py-2">
                  <Text className="text-center text-[15px] font-bold text-[#006D5B]">
                    {formatDuration(remainingSeconds)}
                  </Text>
                  <Text className="mt-1 text-center text-[11px] text-[#5F6C69]">
                    {isPaused ? "Paused" : "In progress"}
                  </Text>
                </View>
                <View className="mt-3 flex-row gap-2">
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={isPaused ? handleResume : handlePause}
                    className="flex-1 h-9 items-center justify-center rounded-full bg-[#0B7A66]"
                  >
                    <Text className="text-[12px] font-semibold text-white">
                      {isPaused ? "Resume" : "Pause"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleStop}
                    className="flex-1 h-9 items-center justify-center rounded-full border border-[#0B7A66] bg-white"
                  >
                    <Text className="text-[12px] font-semibold text-[#21413B]">Stop</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleStart(item)}
                className="mt-4 h-9 items-center justify-center rounded-full bg-[#006D5B]"
              >
                <Text className="text-[12px] font-semibold text-white">Start</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </Card>
  );
}
