import Logo from "components/common/Logo";
import { Button, Text } from "components/ui";
import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GetStartdPage() {
  return (
    <SafeAreaView className="justify-between flex-1 px-4">
      <Stack.Screen options={{ headerShown: false }} />
      <View />
      <View className="gap-5 items-center">
        <Logo />
        <Text className="text-xl text-center">
          "Discover Myanmar" is {`\n`} designed to be fun like a {`\n`}game
        </Text>
      </View>
      <View className="gap-2 mb-10">
        <Link asChild href="/(auth)/register">
          <Button>GET STARTED</Button>
        </Link>
        <Link asChild href="/(auth)/login">
          <Button variant="outlined">I ALREADY HAVE AN ACCOUNT</Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
