import { Text } from "components/ui";
import React from "react";
import { TextProps } from "react-native";
import cn from "utils/cn";

type HeaderType = {
  children: string;
} & TextProps;
export default function Header({ children, className, ...rest }: HeaderType) {
  return (
    <Text
      className={cn("text-2xl text-center font-Poppins700", className)}
      {...rest}>
      {children}
    </Text>
  );
}
