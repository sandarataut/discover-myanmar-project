import { FontAwesome6 } from "@expo/vector-icons";
import Loading from "components/common/Loading";
import { Text } from "components/ui";
import dayjs from "dayjs";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "services/firebaseConfig";
import useProfileViewModel from "viewmodel/ProfileViewModel";
export default function ProfileView() {
  const { user, loading } = useProfileViewModel();

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white px-4">
      <View className="py-5 gap-6">
        {/* <View className="rounded-md h-16 bg-secondary items-center justify-center">
          <Text>image</Text>
        </View> */}
        <Text className="text-center">
          Welcome, {user?.name}! You joined{" "}
          {dayjs(user?.created_at || dayjs()).format("MMMM YYYY")}.
        </Text>
        <TouchableOpacity onPress={logout}>
          <Text className="text-red-800 text-right font-Poppins700 text-base">
            Logout?
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="text-lg text-primary">Badges</Text>
          <View className="flex-row gap-2 mt-2">
            <FontAwesome6 name="face-grin-squint" size={50} color="black" />
            <FontAwesome6 name="face-grin-beam" size={50} color="black" />
            <FontAwesome6 name="face-laugh-wink" size={50} color="black" />
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/leaderboard")}>
          <Text className="text-primary font-Poppins700 text-base">
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
