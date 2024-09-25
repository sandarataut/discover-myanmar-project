import { FC, forwardRef, ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import Text from "./Text";
import AnimatedDots from "./loading/AnimatedDots";
import cn from "utils/cn";

type variantType = "contained" | "outlined";

interface IButton extends TouchableOpacityProps {
  children: ReactNode;
  loading?: boolean;
  variant?: variantType;
  className?: string;
  titleClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseStyles =
  "px-4 h-11 rounded-md border border-transparent justify-center items-center";

const getButtonVariantStyles = (variant: variantType, disabled: boolean) => {
  const styles = {
    contained: disabled ? "!bg-[#21212108]" : "bg-primary",
    outlined: "border-primary border-[2px]"
  };
  return styles?.[variant] || "";
};

const getTextVariantStyles = (variant: variantType) => {
  const textVariantStyles = {
    contained: "text-default",
    outlined: "text-default"
  };
  return textVariantStyles?.[variant] || "";
};

const Button: FC<IButton> = forwardRef<TouchableOpacity, IButton>(
  (
    {
      children,
      titleClassName = "",
      loading = false,
      className = "",
      variant = "contained",
      leftIcon,
      rightIcon,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const buttonStyles = cn(
      baseStyles,
      getButtonVariantStyles(variant, disabled),
      className
    );

    const textStyles = cn(
      "text-center text-white text-base font-Poppins500",
      getTextVariantStyles(variant),
      titleClassName,
      {
        "text-gray-500": disabled
      }
    );

    return (
      <TouchableOpacity
        {...props}
        ref={ref}
        activeOpacity={0.5}
        className={buttonStyles}
        disabled={loading || disabled}>
        <View className="flex-row justify-center gap-2 items-center">
          {loading ? <AnimatedDots /> : leftIcon}
          {!loading && <Text className={textStyles}>{children}</Text>}
          {!loading && rightIcon}
        </View>
      </TouchableOpacity>
    );
  }
);

Button.displayName = "Button";

export default Button;
