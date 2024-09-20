import { Button, Text } from "components/ui";
import * as Notifications from "expo-notifications";
import { Link, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Device from "expo-device";

export default function RequestNotificationPermissionPage() {
  const onPressAllow = async () => {
    // if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // handleRegistrationError(
      //   "Permission not granted to get push token for push notification!"
      // );
      return;
    } else {
      router.replace("/");
    }

    // }
  };
  return (
    <SafeAreaView className="bg-white flex-1 justify-between px-4">
      <View />
      <View className="gap-5 items-center">
        <Text className="text-xl text-center font-Poppins500">
          We would like to send you Notifications
        </Text>
        <Text className="text-base text-center">
          {`Notifications may include reminders and icon badges.\nThese can be configured in\nSettings.`}
        </Text>
        <View className="w-full">
          <Button
            onPress={onPressAllow}
            titleClassName="text-white"
            className="mb-4">
            Alow
          </Button>
          <Button className="bg-secondary">Don't Allow</Button>
        </View>
      </View>
      <Link asChild href="/">
        <Button className="mb-10">CONTINUE</Button>
      </Link>
    </SafeAreaView>
  );
}
