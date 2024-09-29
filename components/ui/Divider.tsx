import React from "react";
import { View, ViewProps } from "react-native";
import cn from "utils/cn";

export default function Divider({ className, ...rest }: ViewProps) {
  return <View className={cn("h-[1px] bg-gray-100", className)} {...rest} />;
}
