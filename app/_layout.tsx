import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import AppProvider from "provider/AppProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Svg } from "react-native-svg";
import "../global.css";

cssInterop(SafeAreaView, { className: "style" });
cssInterop(Svg, { className: "style" });

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar backgroundColor="white" />
      <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="(app)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </AppProvider>
  );
}
