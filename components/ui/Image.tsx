import React from "react";
import { Image as ExpoImage, ImageProps } from "expo-image";
import cn from "utils/cn";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function Image({ className, ...reset }: ImageProps) {
  return (
    <ExpoImage
      className={cn(className)}
      {...reset}
      placeholder={{ blurhash }}
    />
  );
}
