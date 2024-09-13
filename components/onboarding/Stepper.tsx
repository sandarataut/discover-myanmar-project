import React, { useMemo } from "react";
import { Dimensions, ScrollView, View, ViewProps } from "react-native";
import cn from "utils/cn";

import { TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming
} from "react-native-reanimated";

interface IStepper extends ViewProps {
  num?: number;
  pos?: number;
  updatePos?: (pos: number) => void;
}

const width = Dimensions.get("screen").width;
export default function Stepper({
  num = 10,
  pos = 0,
  className,
  updatePos,
  ...rest
}: IStepper) {
  const data = useMemo(() => Array(num).fill(0), [num]);

  return (
    <View className={cn(className)} {...rest}>
      <ScrollView
        horizontal
        contentContainerStyle={{ width, justifyContent: "center" }}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName={cn("gap-2")}>
        {data.map((_, i) => (
          <Step
            key={i}
            isActive={pos === i}
            onPress={() => updatePos && updatePos(i)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface IStep {
  isActive: boolean;
  onPress: () => void;
}

const Step: React.FC<IStep> = ({ isActive, onPress }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(isActive ? 1.1 : 1, { duration: 300 }) }],
      backgroundColor: withTiming(isActive ? "#ffd214" : "#fffca3", {
        duration: 300
      })
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={[
          { height: 12, width: 48, borderRadius: 8, borderWidth: 2 },
          animatedStyle
        ]}
      />
    </TouchableOpacity>
  );
};
