import Stepper from "components/onboarding/Stepper";
import { Button } from "components/ui";
import React from "react";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import cn from "utils/cn";
import useOnBoardingViewModel from "viewmodel/OnBoardingViewModel";

export default function OnboardingView() {
  const {
    selectedValue,
    questionLength,
    question,
    updateAnswer,
    currentPosition,
    setCurrentPosition,
    onPressContinue,
    loading
  } = useOnBoardingViewModel();

  const onPressAnswer = (value: string) => {
    return () => {
      updateAnswer(question?.id, value);
    };
  };

  return (
    <SafeAreaView className="bg-white flex-1 justify-between p-4">
      <Stepper
        num={questionLength}
        pos={currentPosition}
        updatePos={setCurrentPosition}
      />
      <Animated.View
        key={currentPosition}
        entering={SlideInRight}
        exiting={SlideOutLeft}
        className="gap-5 items-center">
        <Animated.Text
          entering={SlideInRight}
          exiting={SlideOutLeft}
          className="text-xl text-center">
          {question?.title}
        </Animated.Text>
        <View className="gap-5 mt-8 w-full">
          {question?.options?.map((option, index) => (
            <Button
              onPress={onPressAnswer(option)}
              className={cn(
                "bg-secondary",
                selectedValue === option && "!bg-primary"
              )}
              key={index}>
              {option}
            </Button>
          ))}
        </View>
      </Animated.View>
      <Button
        loading={loading}
        onPress={onPressContinue}
        disabled={!selectedValue}
        className="mb-10">
        CONTINUE
      </Button>
    </SafeAreaView>
  );
}
