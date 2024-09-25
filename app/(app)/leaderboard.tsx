import Header from "components/common/Header";
import { Text } from "components/ui";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "styles";
import useLeaderboardViewModel from "viewmodel/LeaderboardViewModel";

export default function LeaderboardView() {
  const { loading, leadboard } = useLeaderboardViewModel();
  return (
    <SafeAreaView
      edges={["bottom", "right", "left"]}
      className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-4">
        <Header className="my-6">Leaderboard</Header>
        <View className="flex-row border bg-secondary">
          <View className="w-20 border-r p-1">
            <Text className="text-center">RANK</Text>
          </View>
          <View className="flex-1 border-r p-1">
            <Text className="text-center">NAME</Text>
          </View>
          <View className="flex-1 p-1">
            <Text className="text-center">SCORE</Text>
          </View>
        </View>
        {leadboard?.map((l, i) => (
          <View key={i} className="flex-row border-b border-l border-r">
            <View className="w-20 border-r p-1">
              <Text className="text-center">{i + 1}</Text>
            </View>
            <View className="flex-1 border-r p-1">
              <Text className="text-center">{l?.name}</Text>
            </View>
            <View className="flex-1 p-1">
              <Text className="text-center">{l?.totalScore?.toFixed(0)}</Text>
            </View>
          </View>
        ))}

        {loading && (
          <ActivityIndicator
            size="large"
            className="mt-4"
            color={colors.primary}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
