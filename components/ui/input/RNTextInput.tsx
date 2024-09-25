import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { colors, fonts } from "styles";

type Props = object & TextInputProps;
export default function RNTextInput({ className, ...props }: Props) {
  return (
    <TextInput
      cursorColor={colors.primary}
      className="bg-[#dfe3e7] py-3 px-2.5 rounded-lg"
      style={{
        includeFontPadding: false,
        fontSize: 14,
        fontFamily: fonts.Poppins400
      }}
      {...props}
    />
  );
}
