import { Button } from "components/ui";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white px-4">
      <View className="gap-5 my-6 flex-1 justify-center">
        <Button
          onPress={() => router.push("/myanmar-facts")}
          className="!h-20 bg-secondary">
          Myanmar Facts
        </Button>
        <Button
          onPress={() => router.push("/lessons/myanmar-characters")}
          className="!h-20 bg-secondary">
          Myanmar Characters
        </Button>
        <Button
          onPress={() => router.push("/lessons/myanmar-numbers")}
          className="!h-20 bg-secondary">
          Myanmar Numbers
        </Button>
      </View>
    </SafeAreaView>
  );
}
