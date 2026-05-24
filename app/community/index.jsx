import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BackHeader,
  CommunitySectionSkeleton,
  CommunityTabs,
  EmptyStateCard,
} from "../../components/shared/hub/shared";
import { motherApi } from "../../services/motherApi";

function formatRelativeDate(value) {
  if (!value) return "";
  const date = new Date(value);
  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function getProfileImage(profilePicture) {
  if (profilePicture) {
    return { uri: profilePicture };
  }
  return require("../../assets/images/profilepic.png");
}

function PostCard({ item, onToggleLike, onComment, onReply }) {
  return (
    <View
      className="mb-5 rounded-[18px] bg-[#F3F6F4] px-4 py-4"
      style={{ borderLeftWidth: 3, borderLeftColor: "#FF8A57" }}
    >
      <View className="flex-row">
        <Image source={getProfileImage(item.author?.profilePicture)} className="mr-3 h-12 w-12 rounded-full" />
        <View className="flex-1">
          <View className="flex-row items-start justify-between">
            <Text className="text-[16px] font-bold text-[#293231]">{item.author?.fullName || "AYOMAMA User"}</Text>
            <Text className="text-[14px] font-semibold text-[#0B7A66]">{formatRelativeDate(item.createdAt)}</Text>
          </View>
          <Text className="mt-2 text-[16px] leading-7 text-[#293231]">{item.content}</Text>
          {!!item.comments?.length && (
            <View className="mt-3 gap-2 rounded-[14px] bg-white px-3 py-3">
              {item.comments.slice(0, 2).map((comment) => (
                <View key={comment.id} className="border-b border-[#EEF2F0] pb-2">
                  <Text className="text-[13px] font-semibold text-[#293231]">{comment.authorName}</Text>
                  <Text className="mt-1 text-[13px] leading-6 text-[#56615E]">{comment.content}</Text>
                  <View className="mt-2 flex-row items-center gap-3">
                    <Text className="text-[11px] text-[#81908B]">{formatRelativeDate(comment.createdAt)}</Text>
                    <TouchableOpacity onPress={() => onReply(item.id, comment.id)} activeOpacity={0.82}>
                      <Text className="text-[12px] font-semibold text-[#0B7A66]">Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
          <View className="mt-3 flex-row items-center justify-end gap-4">
            <TouchableOpacity onPress={() => onToggleLike(item.id)} activeOpacity={0.82}>
              <Text className="text-[14px] text-[#0B7A66]">{item.liked ? "♥" : "♡"} {item.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onComment(item.id)} activeOpacity={0.82}>
              <Text className="text-[14px] text-[#0B7A66]">◧ {item.commentsCount || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onComment(item.id)} activeOpacity={0.82}>
              <Text className="text-[14px] font-semibold text-[#0B7A66]">Comment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function ThreadRow({ item, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      className="mb-4 flex-row items-center border-b border-[#D8E0DD] pb-4"
    >
      <Image source={getProfileImage(item.participant?.profilePicture)} className="mr-4 h-11 w-11 rounded-full" />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-[16px] font-bold text-[#293231]">{item.title}</Text>
          <Text className="text-[14px] font-semibold text-[#0B7A66]">
            {formatRelativeDate(item.latestMessageAt)}
          </Text>
        </View>
        <Text className="mt-1 text-[15px] text-[#3D4644]">{item.preview}</Text>
      </View>
    </TouchableOpacity>
  );
}

function WorkerCard({ item, onPress, onToggleFollow }) {
  return (
    <View className="mb-5 rounded-[18px] bg-white px-3 py-3">
      <TouchableOpacity onPress={onPress} activeOpacity={0.82} className="flex-row items-center">
        <Image source={getProfileImage(item.profilePicture)} className="mr-4 h-16 w-16 rounded-full border-2 border-[#0B7A66]" />
        <View className="flex-1">
          <Text className="text-[16px] font-bold text-[#293231]">{item.fullName}</Text>
          <Text className="mt-1 text-[15px] text-[#3D4644]">{item.role}</Text>
          <Text className="mt-2 text-[15px] font-bold text-[#00D2B3]">
            {item.following ? "Following" : "Not following"}
          </Text>
        </View>
      </TouchableOpacity>
      <View className="mt-4 flex-row gap-3">
        <TouchableOpacity
          onPress={() => onToggleFollow(item.id)}
          activeOpacity={0.82}
          className={`flex-1 items-center justify-center rounded-[14px] px-4 py-3 ${item.following ? "border border-[#00D2B3] bg-white" : "bg-[#0B7A66]"}`}
        >
          <Text className={`text-[14px] font-medium ${item.following ? "text-[#293231]" : "text-white"}`}>
            {item.following ? "Unfollow" : "Follow"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.82}
          className="rounded-[14px] bg-[#F8ECE5] px-4 py-3"
        >
          <Text className="text-[14px] font-medium text-[#293231]">Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function BlogCard({ item }) {
  return (
    <View className="mb-6 overflow-hidden rounded-[20px] border border-[#E6ECE9] bg-white">
      <Image
        source={item.coverImage ? { uri: item.coverImage } : require("../../assets/images/profilepic.png")}
        style={{ width: "100%", height: 160 }}
        resizeMode="cover"
      />
      <View className="px-4 py-4">
        <View className="self-start rounded-full bg-[#F7EDE8] px-3 py-1">
          <Text className="text-[12px] text-[#8A817D]">{item.category}</Text>
        </View>
        <Text className="mt-3 text-[17px] font-medium text-[#293231]">{item.title}</Text>
        <Text className="mt-2 text-[15px] text-[#697270]">{item.excerpt}</Text>
        <View className="mt-4 border-t border-[#E8E8E8] pt-4">
          <Text className="text-[14px] text-[#8C8C8C]">
            {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function CommunityScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [active, setActive] = useState("community");
  const [search, setSearch] = useState("");
  const [composerText, setComposerText] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);
  const [posts, setPosts] = useState([]);
  const [threads, setThreads] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState({
    posts: true,
    threads: true,
    workers: true,
    blogs: true,
  });
  const [refreshing, setRefreshing] = useState(false);

  const requestedTab = String(params.tab || "community");

  useEffect(() => {
    if (["community", "messages", "workers", "blogs"].includes(requestedTab)) {
      setActive(requestedTab);
    }
  }, [requestedTab]);

  const loadCommunity = async () => {
    const results = await Promise.allSettled([
      motherApi.fetchCommunityPosts(),
      motherApi.fetchCommunityThreads(),
      motherApi.fetchCommunityHealthWorkers(),
      motherApi.fetchBlogs(),
    ]);

    if (results[0].status === "fulfilled") {
      setPosts(results[0].value);
    }
    if (results[1].status === "fulfilled") {
      setThreads(results[1].value);
    }
    if (results[2].status === "fulfilled") {
      setWorkers(results[2].value);
    }
    if (results[3].status === "fulfilled") {
      setBlogs(results[3].value);
    }

    setLoading({
      posts: false,
      threads: false,
      workers: false,
      blogs: false,
    });
  };

  useEffect(() => {
    loadCommunity().catch(() => {
      setLoading({
        posts: false,
        threads: false,
        workers: false,
        blogs: false,
      });
      Toast.show({
        type: "error",
        text1: "Community unavailable",
        text2: "We could not load the community right now.",
        position: "top",
      });
    });
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadCommunity();
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Refresh failed",
        text2: "Please try again in a moment.",
        position: "top",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const filteredPosts = useMemo(
    () =>
      posts.filter((item) =>
        [item.author?.fullName, item.content].join(" ").toLowerCase().includes(search.toLowerCase()),
      ),
    [posts, search],
  );
  const filteredThreads = useMemo(
    () =>
      threads.filter((item) =>
        [item.title, item.preview].join(" ").toLowerCase().includes(search.toLowerCase()),
      ),
    [threads, search],
  );
  const filteredWorkers = useMemo(
    () =>
      workers.filter((item) =>
        [item.fullName, item.role].join(" ").toLowerCase().includes(search.toLowerCase()),
      ),
    [workers, search],
  );
  const filteredBlogs = useMemo(
    () =>
      blogs.filter((item) =>
        [item.title, item.excerpt, item.category].join(" ").toLowerCase().includes(search.toLowerCase()),
      ),
    [blogs, search],
  );

  const handleCreate = async () => {
    const trimmed = composerText.trim();
    if (!trimmed) return;

    try {
      if (active === "community") {
        const created = await motherApi.createCommunityPost({ content: trimmed });
        setPosts((prev) => [created, ...prev]);
      } else if (active === "messages") {
        const created = await motherApi.createCommunityThread({ title: trimmed });
        setThreads((prev) => [created, ...prev]);
      } else if (replyTarget?.postId) {
        const updated = await motherApi.addCommunityComment(replyTarget.postId, {
          content: trimmed,
          ...(replyTarget.commentId ? { parentCommentId: replyTarget.commentId } : {}),
        });
        setPosts((prev) => prev.map((post) => (post.id === updated.id ? updated : post)));
        setReplyTarget(null);
      }
      setComposerText("");
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Action failed",
        text2: "We could not save that right now.",
        position: "top",
      });
    }
  };

  const handleToggleLike = async (postId) => {
    try {
      const updated = await motherApi.toggleCommunityPostLike(postId);
      setPosts((prev) => prev.map((post) => (post.id === updated.id ? updated : post)));
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Like failed",
        text2: "We could not update that reaction right now.",
        position: "top",
      });
    }
  };

  const handleToggleFollow = async (workerId) => {
    try {
      const updated = await motherApi.toggleHealthWorkerFollow(workerId);
      setWorkers((prev) =>
        prev.map((worker) =>
          worker.id === updated.workerId ? { ...worker, following: updated.following } : worker,
        ),
      );
    } catch (_error) {
      Toast.show({
        type: "error",
        text1: "Follow failed",
        text2: "We could not update this health worker right now.",
        position: "top",
      });
    }
  };

  const renderSection = () => {
    if (active === "community") {
      if (loading.posts) return <CommunitySectionSkeleton variant="posts" />;
      if (!filteredPosts.length) {
        return (
          <EmptyStateCard
            title="No community posts yet"
            description="When posts are available, they will show up here for you to read and engage with."
          />
        );
      }
      return filteredPosts.map((item) => (
        <PostCard
          key={item.id}
          item={item}
          onToggleLike={handleToggleLike}
          onComment={(postId) => setReplyTarget({ postId })}
          onReply={(postId, commentId) => setReplyTarget({ postId, commentId })}
        />
      ));
    }

    if (active === "messages") {
      if (loading.threads) return <CommunitySectionSkeleton variant="messages" />;
      if (!filteredThreads.length) {
        return (
          <EmptyStateCard
            title="No message threads yet"
            description="Start a conversation with a health worker or support thread here."
          />
        );
      }
      return filteredThreads.map((item) => (
        <ThreadRow
          key={item.id}
          item={item}
          onPress={() =>
            router.push({
              pathname: "/community/message-thread",
              params: {
                threadId: item.id,
                threadName: item.title,
              },
            })
          }
        />
      ));
    }

    if (active === "workers") {
      if (loading.workers) return <CommunitySectionSkeleton variant="workers" />;
      if (!filteredWorkers.length) {
        return (
          <EmptyStateCard
            title="No health workers found"
            description="Try another search to find health workers in this community."
          />
        );
      }
      return filteredWorkers.map((item) => (
        <WorkerCard
          key={item.id}
          item={item}
          onToggleFollow={handleToggleFollow}
          onPress={() =>
            router.push({
              pathname: "/community/health-worker-detail",
              params: {
                workerId: item.id,
                name: item.fullName,
                role: item.role,
                phone: item.phone,
                email: item.email,
                address: item.address,
                following: item.following ? "true" : "false",
              },
            })
          }
        />
      ));
    }

    if (loading.blogs) return <CommunitySectionSkeleton variant="blogs" />;
    if (!filteredBlogs.length) {
      return (
        <EmptyStateCard
          title="No blog stories yet"
          description="Fresh maternal health stories and practical guidance will appear here as soon as they are published."
        />
      );
    }
    return filteredBlogs.map((item) => <BlogCard key={item.id} item={item} />);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F5F0]" edges={["top", "bottom"]}>
      <BackHeader title="Community" onBack={() => router.back()} />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#0B7A66"
            colors={["#0B7A66"]}
          />
        }
      >
        {active === "community" ? null : (
          <View className="mb-4 flex-row items-center rounded-[14px] bg-white px-4 py-3">
            <Ionicons name="search-outline" size={18} color="#293231" />
            <TextInput
              placeholder={
                active === "messages"
                  ? "Search messages..."
                  : active === "workers"
                    ? "Search health workers..."
                    : "Search blogs..."
              }
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#697270"
              className="ml-3 flex-1 text-[16px]"
            />
          </View>
        )}

        <CommunityTabs active={active} onChange={setActive} />

        <View className="mt-6">{renderSection()}</View>
      </ScrollView>

      {active === "community" || active === "messages" || replyTarget ? (
        <View className="border-t border-[#E4ECE8] bg-white px-5 pb-6 pt-4">
          <View className="flex-row items-center rounded-[16px] bg-[#F6F8F7] px-4 py-3">
            <TextInput
              placeholder={
                replyTarget
                  ? "Write a reply..."
                  : active === "community"
                    ? "Share something with the community..."
                    : "Enter a thread title..."
              }
              value={composerText}
              onChangeText={setComposerText}
              placeholderTextColor="#697270"
              className="flex-1 text-[15px]"
            />
            <TouchableOpacity
              onPress={handleCreate}
              activeOpacity={0.82}
              className={`ml-3 rounded-full px-4 py-2 ${composerText.trim() ? "bg-[#0B7A66]" : "bg-[#DDE5E2]"}`}
            >
              <Text className={`text-[13px] font-semibold ${composerText.trim() ? "text-white" : "text-[#7F8986]"}`}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
