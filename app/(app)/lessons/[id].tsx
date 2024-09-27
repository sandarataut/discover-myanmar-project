import LearningView from "components/common/LearningView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function LessonDetail() {
  const params = useLocalSearchParams();
  const id = params?.id as string;
  const title = params?.title as string;
  const type = params?.type as string;
  const points = JSON.parse((params?.points as string) || "");

  return (
    <>
      <Stack.Screen options={{ headerTitle: title }} />
      <LearningView templatePoint={points} id={id} title={title} type={type} />
    </>
  );
}
