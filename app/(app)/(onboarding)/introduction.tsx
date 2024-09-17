import Logo from "components/common/Logo";
import { Button, Text } from "components/ui";
import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function IntroductionPage() {
  return (
    <SafeAreaView className="bg-white flex-1 justify-between p-4">
      <Stack.Screen options={{ headerShown: false }} />
      <View />
      <View className="gap-5 items-center">
        <Text className="text-xl text-center">
          Just 3 quick questions {`\n`}before we start your {"\n"}journey!
        </Text>
        <Logo />
      </View>
      <Link asChild href="/(onboarding)/onbording-questions">
        <Button className="mb-10">CONTINUE</Button>
      </Link>
    </SafeAreaView>
  );
}
