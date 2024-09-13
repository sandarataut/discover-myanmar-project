import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  withDelay
} from "react-native-reanimated";
import { colors } from "styles";

const Dot = ({ delay }: { delay: number }) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(10, {
          duration: 500,
          easing: Easing.inOut(Easing.ease)
        }),
        -1,
        true,
        () => {
          translateX.value = withTiming(-10, {
            duration: 500,
            easing: Easing.inOut(Easing.ease)
          });
        }
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0.3, {
          duration: 500,
          easing: Easing.inOut(Easing.ease)
        }),
        -1,
        true,
        () => {
          opacity.value = withTiming(1, {
            duration: 500,
            easing: Easing.inOut(Easing.ease)
          });
        }
      )
    );
  }, [delay, opacity, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value
  }));

  return (
    <Animated.View
      style={[
        {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: colors.default,
          marginHorizontal: 4
        },
        animatedStyle
      ]}
    />
  );
};

const AnimatedDots = () => {
  const dots = [0, 100, 200, 300]; // delays for each dot to create bounce effect

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {dots.map((delay, index) => (
        <Dot key={index} delay={delay} />
      ))}
    </View>
  );
};

export default AnimatedDots;
