import { Tabs, TabsTab, TabsTabList, TabsTabPanel, TabsTabPanels, Text } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, TouchableOpacity, View } from "react-native";
import PageHeader from "../../../components/pregnant-mother/forms/PageHeader";
import { INITIAL_MEALS } from "../../../components/shared/dashboard/constants";

function Macro({ color, label }) {
  return (
    <View className="flex-row items-center">
      <View className="mr-2 h-6 w-1 rounded-full bg-[#DADADA]">
        <View className="w-1 rounded-full" style={{ height: 18, backgroundColor: color }} />
      </View>
      <Text className="text-[11px] text-[#384341]">{label}</Text>
    </View>
  );
}

function MealCard({ item }) {
  return (
    <View className="mb-4 rounded-[26px] border border-[#00D2B3] bg-white px-3 py-3">
      <View className="mb-2 flex-row items-start justify-between">
        <Text className="flex-1 text-center text-[17px] font-semibold text-[#2B3432]">{item.meal}</Text>
        <Ionicons name="trash-outline" size={16} color="#111" />
      </View>
      <View className="flex-row items-center">
        <Image source={require("../../../assets/images/pap.png")} className="h-14 w-14 rounded-xl" />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Text className="mr-1 text-[14px]">🔥</Text>
              <Text className="text-[14px] text-[#384341]">294 kcal</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="barbell-outline" size={14} color="#384341" />
              <Text className="ml-1 text-[14px] text-[#384341]">{item.weight}</Text>
            </View>
          </View>
          <View className="mt-3 flex-row flex-wrap justify-between">
            <Macro color="#1CC9B7" label={item.macroA} />
            <Macro color="#FF8A57" label={item.macroB} />
            <Macro color="#F4E38C" label={item.macroC} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function NutritionPlanPage() {
  const router = useRouter();
  const grouped = {
    Breakfast: INITIAL_MEALS.filter((item) => item.category === "Breakfast"),
    Lunch: INITIAL_MEALS.filter((item) => item.category === "Lunch"),
    Dinner: INITIAL_MEALS.filter((item) => item.category === "Dinner"),
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <PageHeader title="Edit Nutrition plan" onBack={() => router.back()} rightIcon="restaurant" />
      <View className="mx-4 flex-1 rounded-[28px] border border-[#00D2B3] px-2 py-4">
        <Tabs defaultValue="Breakfast">
          <TabsTabList className="mb-5 flex-row justify-between">
            {["Breakfast", "Lunch", "Dinner"].map((tab) => (
              <TabsTab
                key={tab}
                value={tab}
                className="mx-1 flex-1 rounded-full border border-[#00AFA0] data-[state=active]:bg-[#0C7A67]"
              >
                <View className="py-2 items-center">
                  <Text className="text-[15px] font-bold text-[#384341] data-[state=active]:text-white">{tab}</Text>
                  <Text className="text-[10px] text-[#384341] data-[state=active]:text-white">
                    {tab === "Breakfast" ? "12am-12pm" : tab === "Lunch" ? "12pm-05pm" : "05pm-09pm"}
                  </Text>
                </View>
              </TabsTab>
            ))}
          </TabsTabList>

          <TabsTabPanels>
            {Object.entries(grouped).map(([category, items]) => (
              <TabsTabPanel key={category} value={category} className="px-0">
                {items.map((item) => (
                  <MealCard key={item.id} item={item} />
                ))}
              </TabsTabPanel>
            ))}
          </TabsTabPanels>
        </Tabs>

        <TouchableOpacity
          onPress={() => router.push("/pregnant-mother/forms/add-meal")}
          activeOpacity={0.85}
          className="mx-3 mt-2 h-12 items-center justify-center rounded-[12px] bg-[#0C7A67]"
        >
          <Text className="text-[16px] font-semibold text-white">Add New meal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
