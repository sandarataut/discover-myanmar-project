import { SafeAreaView } from "react-native-safe-area-context";
import { Point, SketchCanvas, SketchCanvasRef } from "rn-perfect-sketch-canvas";
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
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 justify-center bg-white"></SafeAreaView>
  );
}
