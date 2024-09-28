import { Point } from "rn-perfect-sketch-canvas";

function arePointsEqual(point1: Point, point2: Point) {
  return point1[0] === point2[0] && point1[1] === point2[1];
}

const diff = (guidePoints: Point[][], userPoints: Point[][]) => {
  const _guidePoints = guidePoints.flat();
  const _userPoints = userPoints.flat();
  return _userPoints.filter((userPoint) => {
    return !_guidePoints.some((guidePoint) => {
      return arePointsEqual(userPoint, guidePoint);
    });
  });
};

export default diff;
