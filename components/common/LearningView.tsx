import { Button, Text } from "components/ui";
import FormHelperText from "components/ui/form/FormHelperText";
import React, { useCallback, useEffect, useRef } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Point, SketchCanvas, SketchCanvasRef } from "rn-perfect-sketch-canvas";
import useLearningViewModel from "viewmodel/LearningViewModel";
import useNotificationViewModel from "viewmodel/NotificationViewModel";
import Loading from "./Loading";

interface ILeaningView {
  templatePoint: Point[][];
  id: string;
  title: string;
  type: string;
}
export default function LearningView({
  templatePoint,
  id,
  title,
  type
}: ILeaningView) {
  const canvasRef = useRef<SketchCanvasRef>(null);

  const {
    saveUserScore,
    score,
    loading,
    errorMessage,
    checkIfLessonCompleted,
    userLoading
  } = useLearningViewModel();

  const { addNotification } = useNotificationViewModel();

  useEffect(() => {
    !userLoading &&
      canvasRef.current?.addPoints(templatePoint, {
        strokeColor: "gray",
        strokeStyle: "fill",
        strokeWidth: 5
      });
  }, [templatePoint, userLoading]);

  const onPressSubmit = useCallback(async () => {
    try {
      await saveUserScore(
        templatePoint,
        canvasRef.current?.toPoints() as Point[][],
        id
      );
      addNotification(
        title,
        `You finished ${title} in ${type === "number" ? "Myanmar Numbers" : "Myanmar Characters"}.`
      );
    } catch (e) {
      console.log(e);
    }
  }, [addNotification, id, saveUserScore, templatePoint, title, type]);

  const isCompleted = checkIfLessonCompleted(id);

  const disabled = isCompleted || userLoading || loading;

  if (userLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 justify-center bg-white">
      <View className="flex-1">
        <View
          pointerEvents={isCompleted || loading ? "none" : "auto"}
          className="h-[400px] relative w-full bg-gray-200">
          <Text className="text-xs top-1 left-1 absolute text-gray-700 font-Poppins700"></Text>
          <SketchCanvas
            ref={canvasRef}
            strokeColor="black"
            strokeWidth={10}
            containerStyle={{
              flex: 1
            }}
          />
        </View>

        <View className="min-h-4">
          {score > 0 && (
            <Text className="text-center font-Poppins700 text-base mt-5">
              {score}
            </Text>
          )}
        </View>

        {isCompleted && (
          <FormHelperText className="mt-5 !text-green-900 !text-base text-center flex-1">
            This lesson is completed.
          </FormHelperText>
        )}
        <FormHelperText error className="mt-5">
          {errorMessage}
        </FormHelperText>

        <View className="gap-3 px-4 mt-5 flex-row">
          <Button
            disabled={disabled}
            className="flex-1"
            onPress={() => {
              canvasRef.current?.addPoints(templatePoint, {
                strokeColor: "gray",
                strokeStyle: "fill",
                strokeWidth: 5
              });
            }}>
            Reset
          </Button>
          <Button
            disabled={disabled}
            className="flex-1"
            loading={loading}
            onPress={onPressSubmit}>
            Submit
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
