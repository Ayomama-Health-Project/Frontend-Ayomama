import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import api from "../../api";

const CurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-2 text-gray-600">Loading user...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      {user ? (
        <View className="w-full rounded-2xl bg-blue-100 p-6 shadow-lg">
          <Text className="text-xl font-bold text-blue-700">
            Welcome, {user.name}
          </Text>
          <Text className="text-gray-700 mt-2"> {user.email}</Text>
          <Text className="text-gray-500 mt-1">{user.id}</Text>
        </View>
      ) : (
        <Text className="text-red-500 text-lg">
          No user found. Please login.
        </Text>
      )}
    </View>
  );
};

export default CurrentUser;
