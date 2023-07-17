import Konva from "konva";
import React from "react";

export default function ({ children }: any) {
  const { props } = children;
  return React.cloneElement(children, {
    offsetX: props.width ? props.width / 2 : 0,
    offsetY: props.height ? props.height / 2 : 0,
    x: props.x ? props.x + props.width / 2 : 0,
    y: props.y ? props.y + props.height / 2 : 0,
    onCenteredDragMove: () => {},
    onDragMove: (e: any) => {
      console.log(e.target.x() - e.target.offsetX());
      props.onDragMove(e);
    }
  });
}
