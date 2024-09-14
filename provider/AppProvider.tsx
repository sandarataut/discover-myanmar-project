import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from "@expo-google-fonts/poppins";
import { SplashScreen } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "services/firebaseConfig";
import { useSetAtom } from "jotai";
import { PropsWithChildren, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import userAtom from "stores/userAtom";

SplashScreen.preventAutoHideAsync();

SystemUI.setBackgroundColorAsync("transparent");

export default function AppProvider({ children }: PropsWithChildren) {
  const setUser = useSetAtom(userAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        setUser(authenticatedUser);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [setUser]);

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_700Bold,
    Poppins_600SemiBold
  });

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  // Prevent rendering until the font has loaded
  if (!fontsLoaded || isLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <StatusBar
          backgroundColor={colors.primary}
          networkActivityIndicatorVisible
        /> */}
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
