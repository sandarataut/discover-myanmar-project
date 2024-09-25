import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import userAtom from "stores/userAtom";

export default function AppLayout() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <Redirect href="/(auth)/get-started" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitle: "",
        headerBackVisible: false,
        headerLeft: () => (
          <Ionicons
            onPress={() => router.back()}
            name="chevron-back"
            className="self-center"
            size={24}
          />
        )
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    </Stack>
  );
}
