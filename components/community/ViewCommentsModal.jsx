import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ViewCommentsModal({ visible, selectedPost, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View
          className="bg-white rounded-t-3xl"
          style={{
            maxHeight: "80%",
            paddingBottom: Platform.OS === "ios" ? 40 : 20,
          }}
        >
          {/* Modal Header */}
          <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200">
            <Text className="text-[#293231] text-lg font-bold">
              Comments ({selectedPost?.commentsCount || 0})
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#293231" />
            </TouchableOpacity>
          </View>

          {/* Original Post Preview */}
          {selectedPost && (
            <View className="px-6 py-4 bg-[#F9FAFB] border-b border-gray-200">
              <View className="flex-row items-start">
                <Image
                  source={selectedPost.avatar}
                  className="w-10 h-10 rounded-full mr-3"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-[#293231] font-bold text-sm">
                    {selectedPost.author}
                  </Text>
                  <Text className="text-[#293231] text-sm mt-1">
                    {selectedPost.content}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Comments List */}
          <ScrollView className="flex-1 px-6 py-4">
            {selectedPost?.comments && selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((comment) => (
                <View
                  key={comment.id}
                  className="mb-4 pb-4 border-b border-gray-100"
                >
                  <View className="flex-row items-start">
                    <Image
                      source={comment.avatar}
                      className="w-8 h-8 rounded-full mr-3"
                      resizeMode="cover"
                    />
                    <View className="flex-1">
                      <View className="bg-[#F3F4F6] rounded-2xl p-3">
                        <Text className="text-[#293231] font-semibold text-sm mb-1">
                          {comment.author}
                        </Text>
                        <Text className="text-[#293231] text-sm">
                          {comment.content}
                        </Text>
                      </View>
                      <Text className="text-[#9CA3AF] text-xs mt-2 ml-1">
                        {comment.timestamp}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View className="flex-1 items-center justify-center py-8">
                <Ionicons
                  name="chatbubbles-outline"
                  size={48}
                  color="#D1D5DB"
                />
                <Text className="text-[#9CA3AF] text-sm mt-3">
                  No comments yet. Be the first to comment!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
