import { FontAwesome6 } from "@expo/vector-icons";
import Loading from "components/common/Loading";
import { Text } from "components/ui";
import dayjs from "dayjs";
import { router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "services/firebaseConfig";
import { colors } from "styles";
import useBadgeViewModel from "viewmodel/BadgeViewModel";
import useProfileViewModel from "viewmodel/ProfileViewModel";

export default function ProfileView() {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white px-4">
      <View className="py-5 gap-6">
        <UserView />

        <TouchableOpacity onPress={logout}>
          <Text className="text-red-800 text-right font-Poppins700 text-base">
            Logout?
          </Text>
        </TouchableOpacity>
        <BadgeView />
        <TouchableOpacity onPress={() => router.push("/leaderboard")}>
          <Text className="text-primary font-Poppins700 text-base">
            Leaderboard
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function UserView() {
  const { user, loading } = useProfileViewModel();

  if (loading) {
    return (
      <ActivityIndicator className="mt-2" size="small" color={colors.primary} />
    );
  }

  return (
    <Text className="text-center">
      Welcome, {user?.name}! You joined{" "}
      {dayjs(user?.created_at || dayjs()).format("MMMM YYYY")}.
    </Text>
  );
}

function BadgeView() {
  const { displayUserBadges, loading, badges } = useBadgeViewModel();

  useEffect(() => {
    displayUserBadges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <ActivityIndicator className="mt-2" size="small" color={colors.primary} />
    );
  }
  return (
    <View>
      <Text className="text-lg text-primary">Badges</Text>
      <View className="flex-row gap-2 mt-2">
        {badges?.map((b: any, i) => {
          return b?.id === "numbers_newbie" ? (
            <FontAwesome6
              key={i}
              name="face-grin-squint"
              size={50}
              color="black"
            />
          ) : b?.id === "characters_newbie" ? (
            <FontAwesome6
              key={i}
              name="face-grin-beam"
              size={50}
              color="black"
            />
          ) : (
            <Text key={i}>-</Text>
          );
        })}
      </View>
    </View>
  );
}
