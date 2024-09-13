import Text from "components/ui/Text";
import React from "react";
import { TextProps, View } from "react-native";

interface Props extends TextProps {
  children: string;
  error?: boolean;
}

const defaultStyles = "text-gray-700 leading-4 text-[12px]";
export default function FormHelperText({
  children,
  className,
  error = false,
  ...rest
}: Props) {
  return (
    children && (
      <View className="flex-row items-center gap-1">
        <Text
          className={`${defaultStyles} ${className} ${
            error ? "!text-red-900" : "!text-default"
          }`}
          {...rest}>
          {children}
        </Text>
      </View>
    )
  );
}
