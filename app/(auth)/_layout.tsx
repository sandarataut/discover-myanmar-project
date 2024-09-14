import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "fade",
        headerShadowVisible: false,
        // headerStyle: { backgroundColor: "green" },
        headerTitleAlign: "center",
        headerTitle: "",
        headerBackVisible: false,
        headerLeft: () => (
          <Ionicons
            onPress={() => router.back()}
            name="chevron-back"
            className="self-center"
            size={24}
            // color={colors.subtle}
          />
        )
      }}>
      <Stack.Screen name="get-started" options={{ headerShown: false }} />
    </Stack>
  );
}
