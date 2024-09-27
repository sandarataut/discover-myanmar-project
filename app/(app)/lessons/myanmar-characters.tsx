import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "components/ui";
import { Stack, router } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "styles";
import { Lesson } from "types";
import cn from "utils/cn";
import useCharacterViewModel from "viewmodel/CharacterViewModel";

export default function MyanmarCharacterView() {
  const { lessons, loading, checkIfLessonCompleted } = useCharacterViewModel();

  const onPressLesson = useCallback(
    (id: string, title: string, points: string) => {
      return () => {
        // router.push({
        //   pathname: "/(app)/lessons/[id]",
        //   params: { id, title, points, type: "character" }
        // });
      };
    },
    []
  );

  const renderItem: ListRenderItem<Lesson> = ({ item, index }) => {
    const isCompleted = checkIfLessonCompleted(item?.id);
    const isDisabled =
      index > 0 && !checkIfLessonCompleted(lessons[index - 1]?.id); // Disable if the previous lesson is not completed
    return (
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onPressLesson(item?.id, item?.title, item?.points)}
        className={cn(
          "rounded-lg p-4 bg-secondary flex-row justify-center items-center gap-2",
          isCompleted && "!bg-green-600",
          isDisabled && "bg-disabled"
        )}>
        {isDisabled && (
          <MaterialIcons name="lock-outline" size={24} color={colors.default} />
        )}
        <Text
          className={cn("text-base text-center", isCompleted && "text-white")}>
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white">
      <Stack.Screen options={{ headerTitle: "Myanmar Characters" }} />
      <FlatList
        contentContainerClassName="py-5 gap-5 px-4"
        data={lessons}
        renderItem={renderItem}
        ListFooterComponent={
          <>
            {loading && (
              <ActivityIndicator size="large" color={colors.primary} />
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}
