import { BehaviorType } from "./App";
import React, { useEffect, useState } from "react";
import { Group, Line, Rect, Circle } from "react-konva";
import { CollimatorGraphicObject } from "./App";

export interface JawWidgetProps {
  collimatorGo?: CollimatorGraphicObject;
  behaviorType?: BehaviorType;
}

const JawWidget: React.FC<JawWidgetProps> = (props: JawWidgetProps) => {
  const [element, setElement] = useState<JSX.Element>();
  const { collimatorGo } = props;
  const rectLineWidth = 1;

  useEffect(() => {
    if (
      collimatorGo &&
      collimatorGo.width &&
      collimatorGo.height &&
      collimatorGo.jawPositions
    ) {
      let temp: JSX.Element;
      let jawX1: number | undefined = undefined;
      let jawX2: number | undefined = undefined;
      let jawY1: number | undefined = undefined;
      let jawY2: number | undefined = undefined;

      if (collimatorGo.jawPositions[0] != null) {
        jawX1 = -collimatorGo.width / 2 + collimatorGo.jawPositions[0];
      }
      if (collimatorGo.jawPositions[1] != null) {
        jawX2 = collimatorGo.width / 2 + collimatorGo.jawPositions[1];
      }
      if (collimatorGo.jawPositions[2] != null) {
        jawY1 = collimatorGo.height / 2 - collimatorGo.jawPositions[2];
      }
      if (collimatorGo.jawPositions[3] != null) {
        jawY2 = -collimatorGo.height / 2 - collimatorGo.jawPositions[3];
      }
      console.log("[jawWidget]: collimatorGo.left", collimatorGo.left);
      console.log("[jawWidget]: collimatorGo.top", collimatorGo.top);
      temp = (
        <>
          <Group
            x={collimatorGo.left}
            y={collimatorGo.top}
            clip={{
              x: 0,
              y: 0,
              width: collimatorGo.width,
              height: collimatorGo.height
            }}
            listening={props.behaviorType == BehaviorType.bevMoveJaw}
          >
            {jawY1 && (
              <>
                <Rect
                  x={0}
                  y={jawY1}
                  width={collimatorGo.width}
                  height={collimatorGo.height}
                  strokeWidth={rectLineWidth}
                  strokeScaleEnabled={false}
                  stroke={"#0073EE"}
                  listening={false}
                  fill={
                    collimatorGo.jawHotArea == "JawY1"
                      ? "#BB2499"
                      : "rgb(8,211,242)"
                  }
                  opacity={collimatorGo.jawHotArea == "JawY1" ? 0.3 : 0.6}
                />

                <Line
                  id="lineY1"
                  name="JawY1"
                  x={0}
                  y={jawY1}
                  strokeWidth={3}
                  points={[0, 0, collimatorGo.width, 0]}
                  stroke={
                    collimatorGo.jawHotArea == "JawY1" ? "#00FFE8" : "#0073EE"
                  }
                  strokeScaleEnabled={false}
                />

                <Circle
                  x={0}
                  y={jawY1 + collimatorGo.height}
                  radius={4.5} // 圆的半径
                  fill="orange" // 填充颜色
                  opacity={0.4}
                />
              </>
            )}
            {jawY2 && (
              <>
                <Rect
                  x={0}
                  y={jawY2}
                  width={collimatorGo.width}
                  height={collimatorGo.height}
                  strokeWidth={rectLineWidth}
                  strokeScaleEnabled={false}
                  stroke={"#0073EE"}
                  listening={false}
                  fill={
                    collimatorGo.jawHotArea == "JawY2"
                      ? "#BB2499"
                      : "rgb(8,211,242)"
                  }
                  opacity={collimatorGo.jawHotArea == "JawY2" ? 0.3 : 0.6}
                />
                <Line
                  id="lineY2"
                  name="JawY2"
                  x={0}
                  y={jawY2 + collimatorGo.height}
                  strokeWidth={3}
                  points={[0, 0, collimatorGo.width, 0]}
                  stroke={
                    collimatorGo.jawHotArea == "JawY2" ? "#00FFE8" : "#0073EE"
                  }
                  strokeScaleEnabled={false}
                />
              </>
            )}
          </Group>
          <Circle
            x={collimatorGo.left}
            y={collimatorGo.top}
            radius={4.5} // 圆的半径
            fill="red" // 填充颜色
            opacity={0.4}
          />
        </>
      );
      setElement(temp);
    } else {
      setElement(<></>);
    }
    return () => {};
  }, [
    props.collimatorGo,
    props.collimatorGo?.height,
    props.collimatorGo?.width,
    props.collimatorGo?.jawHotArea,
    props.collimatorGo?.jawPositions,
    props.behaviorType
  ]);

  return <>{element}</>;
};

export default JawWidget;
