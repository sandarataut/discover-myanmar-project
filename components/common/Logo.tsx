import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import cn from "utils/cn";

interface ILogo {
  size?: "small" | "large";
  className?: string;
}
export default function Logo({ size = "large", className }: ILogo) {
  return (
    <View
      className={cn(
        "items-center justify-center rounded-full",
        size === "small" ? "w-12 h-12" : "w-32 h-32",
        className
      )}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={require("../../assets/logo.png")}
      />
    </View>
  );
}
