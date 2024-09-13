import { Text as RNText, TextProps } from "react-native";
interface Props extends TextProps {}
export default function Text({ children, className, style, ...rest }: Props) {
  return (
    <RNText
      style={[style]}
      className={`font-Poppins400 text-default ${className}`}
      {...rest}>
      {children}
    </RNText>
  );
}
