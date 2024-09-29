import { Button, Image, Text } from "components/ui";
import Divider from "components/ui/Divider";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "services/firebaseConfig";
import userAtom from "stores/userAtom";
import { colors } from "styles";
import cn from "utils/cn";
import useBadgeViewModel from "viewmodel/BadgeViewModel";
import useProfileViewModel from "viewmodel/ProfileViewModel";
export default function ProfileView() {
  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-white">
      <ScrollView contentContainerClassName="py-4 gap-4">
        <UserView />
        <Divider />
        <BadgeView />
        <Divider />
        <LeaderboardView />
        <Divider />
        <LogoutView />
      </ScrollView>
    </SafeAreaView>
  );
}

function UserView() {
  const { user, loading } = useProfileViewModel();

  const currentUser = useAtomValue(userAtom);
  if (loading) {
    return (
      <ActivityIndicator className="mt-2" size="small" color={colors.primary} />
    );
  }
  return (
    <View className="px-4">
      <View className="w-32 relative items-center justify-center self-center overflow-hidden h-32 rounded-full bg-gray-100">
        {currentUser?.photoURL ? (
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: currentUser?.photoURL as string }}
          />
        ) : (
          <Pressable
            onPress={() => router.push("/update-profile")}
            className="w-full h-full items-center justify-center flex-1">
            <Text>Upload Photo</Text>
          </Pressable>
        )}
      </View>
      <Text className="text-center px-4 mt-2 text-base">
        Welcome, {user?.name}! You joined{" "}
        {dayjs(user?.created_at || dayjs()).format("MMMM YYYY")}.
      </Text>
    </View>
  );
}

function BadgeView() {
  const { fetchBadges, fetchUserBadges, userBadgeIds, loading, badges } =
    useBadgeViewModel();

  useEffect(() => {
    fetchBadges();
    fetchUserBadges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="px-4">
      <Text className="text-lg font-Poppins600">Badges</Text>
      {loading ? (
        <ActivityIndicator
          className="mt-2"
          size="small"
          color={colors.primary}
        />
      ) : (
        <>
          <ScrollView horizontal contentContainerClassName="gap-4 py-2">
            {badges?.map((b, i) => {
              const isRewared = userBadgeIds?.some((id) => id === b?.id);
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={i}
                  className={cn(
                    "py-2 w-60 items-center justify-center shadow-sm px-4 rounded-md bg-gray-100",
                    isRewared && "bg-primary text-white"
                  )}>
                  <Text
                    numberOfLines={1}
                    className={cn(
                      "text-xl text-center font-Poppins700",
                      isRewared && "text-white"
                    )}>
                    {b.name}
                  </Text>
                  <Text
                    className={cn(
                      "text-xs mt-2 text-center font-Poppins500 text-wrap",
                      isRewared && "text-white"
                    )}>
                    {b.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
}

function LeaderboardView() {
  const { user, loading } = useProfileViewModel();

  return (
    <View className="px-4">
      <Text className="text-lg font-Poppins600">Leaderboard</Text>
      {loading ? (
        <ActivityIndicator
          className="mt-2"
          size="small"
          color={colors.primary}
        />
      ) : (
        <>
          <View className="my-2 items-center">
            <Text className="text-lg">Your Score</Text>
            <Text className="my-2 text-xl">
              {user?.totalScore?.toFixed(0) || 0}
            </Text>
          </View>
          <Button
            onPress={() => router.push("/leaderboard")}
            className="w-full">
            View all
          </Button>
        </>
      )}
    </View>
  );
}

function LogoutView() {
  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <TouchableOpacity onPress={logout} className="px-4 self-center">
      <Text className="text-red-800 text-right font-Poppins700 text-base">
        Logout?
      </Text>
    </TouchableOpacity>
  );
}
