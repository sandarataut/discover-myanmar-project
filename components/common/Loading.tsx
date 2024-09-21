import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "styles";

export default function Loading() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
