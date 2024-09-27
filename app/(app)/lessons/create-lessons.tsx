import {
  templateKagyiPoint,
  templateKhaKwayPoint,
  templateGangePoint,
  templateGagyiPoint,
  templateNgaPoint,
  templateOnePoint,
  templateTwoPoint,
  templateThreePoint
} from "components/data/points";

import { Button } from "components/ui";
import dayjs from "dayjs";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "services/firebaseConfig";

export default function CreateLessionView() {
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    for (const d of numberData) {
      await setDoc(doc(db, "lessons", d?.id), {
        id: d?.id,
        type: "number",
        title: d.title,
        points: JSON.stringify(d.points),
        badgeId: d?.badgeId || "",
        created_at: dayjs().toISOString()
      });
    }
    for (const d of charactersData) {
      await setDoc(doc(db, "lessons", d?.id), {
        id: d?.id,
        type: "character",
        title: d.title,
        badgeId: d?.badgeId || "",
        points: JSON.stringify(d.points),
        created_at: dayjs().toISOString()
      });
    }
    for (const d of badges) {
      await setDoc(doc(db, "badges", d?.id), {
        id: d?.id,
        name: d?.name,
        description: d?.description,
        created_at: dayjs().toISOString()
      });
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-10">
      <Button loading={loading} onPress={onPressCreate}>
        Generate Lessons
      </Button>
    </SafeAreaView>
  );
}

export const charactersData = [
  {
    id: "kagyi",
    title: "Lesson 1",
    points: templateKagyiPoint,
    badgeId: "characters_newbie"
  },
  { id: "khakway", title: "Lesson 2", points: templateKhaKwayPoint },
  { id: "gange", title: "Lesson 3", points: templateGangePoint },
  { id: "gagyi", title: "Lesson 4", points: templateGagyiPoint },
  { id: "nga", title: "Lesson 5", points: templateNgaPoint }
];

export const numberData = [
  {
    id: "one",
    title: "Lesson 1",
    points: templateOnePoint,
    badgeId: "numbers_newbie"
  },
  { id: "two", title: "Lesson 2", points: templateTwoPoint },
  { id: "three", title: "Lesson 3", points: templateThreePoint }
];

export const badges = [
  {
    id: "numbers_newbie",
    name: "Numbers Newbie",
    description: "Awarded for completing the first number lesson."
  },
  {
    id: "characters_newbie",
    name: "Characters Newbie",
    description: "Awarded for completing the first character lesson."
  }
];
