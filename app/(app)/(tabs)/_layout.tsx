import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router/tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "styles";

import { Feather } from "@expo/vector-icons";
import Logo from "components/common/Logo";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { TextProps, TouchableOpacity } from "react-native";
import cn from "utils/cn";

const ICON_SIZE = 40;
export default function RootLayout() {
  const tabs = [
    {
      href: "/",
      name: "index",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Ionicons
          name={focused ? "home" : "home-outline"}
          size={ICON_SIZE}
          color="black"
        />
      )
    },
    {
      href: "/notification",
      name: "notification",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Ionicons
          name={focused ? "notifications" : "notifications-outline"}
          size={ICON_SIZE}
          color="black"
        />
      )
    },
    {
      href: "/profile",
      name: "profile",
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <FontAwesome
          name={focused ? "user" : "user-o"}
          size={ICON_SIZE}
          color="black"
        />
      )
    }
  ];

  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerShown: true,
        tabBarLabel: () => null,
        header: ({ route }) => (
          <Header
            setting={route.name === "profile"}
            style={{ marginTop: insets?.top }}
          />
        ),
        tabBarStyle: {
          backgroundColor: colors.primary
        }
      }}>
      {tabs.map(({ name, href, tabBarIcon }, i) => (
        <Tabs.Screen
          name={name}
          options={{
            href: href as any,
            tabBarIcon
          }}
          key={i}
        />
      ))}
    </Tabs>
  );
}

type HeaderType = TextProps & { setting?: boolean };
function Header({ children, className, setting = false, ...rest }: HeaderType) {
  const onPressSettings = useCallback(() => {
    router.push("/update-profile");
  }, []);
  return (
    <View
      className={cn(
        "flex-row justify-between items-center py-2 px-4 bg-white",
        className
      )}
      {...rest}>
      <Logo size="small" />
      {setting && (
        <TouchableOpacity onPress={onPressSettings}>
          <Feather name="settings" size={40} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}
