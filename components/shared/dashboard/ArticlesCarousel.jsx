import { Image, ScrollView, Text, View } from "react-native";
import { Card, SectionTitle } from "./shared";

export default function ArticlesCarousel({ articles }) {
  return (
    <View>
      <SectionTitle title="Must read" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
        {articles.map((article) => (
          <Card key={article.id} className="mr-4 w-[220px] p-0 overflow-hidden">
            <Image source={{ uri: article.image || article.coverImage }} className="h-32 w-full" />
            <View className="p-3">
              <View className="self-start rounded-full bg-[#E9F7F3] px-3 py-1">
                <Text className="text-[11px] font-semibold text-[#006D5B]">{article.category}</Text>
              </View>
              <Text className="mt-3 text-[15px] font-bold leading-5 text-[#223130]">
                {article.title}
              </Text>
              <Text className="mt-2 text-[12px] leading-5 text-[#697572]">{article.excerpt}</Text>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
