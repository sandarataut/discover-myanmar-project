import Logo from "components/common/Logo";
import { Button, Text } from "components/ui";
import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateProfileSuccessView() {
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="bg-white flex-1 justify-between px-6">
      <Stack.Screen options={{ headerShown: false }} />
      <View />
      <View className="gap-5 items-center">
        <Logo />
        <Text className="text-lg mt-6 text-center">
          Your profile has been successfully updated.
        </Text>
      </View>
      <Link replace asChild href="/(app)/profile">
        <Button className="mb-10">Back</Button>
      </Link>
    </SafeAreaView>
  );
}
