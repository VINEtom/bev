import { BehaviorType } from "./App";
import { MlcLayerType } from "./App";
import React, { useEffect, useState } from "react";
import { Group, Rect, Circle } from "react-konva";
import { CollimatorGraphicObject } from "./App";

export interface MlcWidgetProps {
  collimatorGo?: CollimatorGraphicObject;
  mlcLayer: MlcLayerType;
  behaviorType?: BehaviorType;
  defaultColor: string;
  hittedColor: string;
  canEdit: boolean;
  renderComplete?: () => void;
}

const MlcWidget: React.FC<MlcWidgetProps> = (props: MlcWidgetProps) => {
  const [element, setElement] = useState<JSX.Element>();
  const { collimatorGo, mlcLayer } = props;
  const rectLineWidth = 1;

  useEffect(() => {
    let leafPositions = undefined;
    let leafBounds = undefined;
    if (mlcLayer == MlcLayerType.Bottom) {
      if (collimatorGo?.bottomMlcGo) {
        leafPositions = collimatorGo.bottomMlcGo.leafPositions;
        leafBounds = collimatorGo.bottomMlcGo.leafBounds;
      }
    } else if (mlcLayer == MlcLayerType.Upper) {
      if (collimatorGo?.upperMlcGo) {
        leafPositions = collimatorGo.upperMlcGo.leafPositions;
        leafBounds = collimatorGo.upperMlcGo.leafBounds;
      }
    }
    if (
      collimatorGo &&
      collimatorGo.width &&
      collimatorGo.height &&
      leafBounds &&
      leafPositions
    ) {
      let temp: JSX.Element;
      let mlcLeafs = [];
      console.log("length of leafBounds: ", leafBounds.length);
      collimatorGo.leafPairCount =
        collimatorGo.bottomMlcGo?.leafBounds?.length - 1;
      console.log("collimatorGo.leafPairCount", collimatorGo.leafPairCount);
      for (let i = 0; i < collimatorGo.leafPairCount; i++) {
        let currentMlcHeight = Math.abs(
          leafBounds[collimatorGo.leafPairCount - 1 - i] -
            leafBounds[collimatorGo.leafPairCount - i]
        );
        let leafIndex = i;
        let [x, y] = [
          -collimatorGo.width / 2 + leafPositions[0][i],
          leafBounds[collimatorGo.leafPairCount - 1 - i] - leafBounds[0]
        ];
        console.log(
          `y: ${y}, leafBounds[${
            collimatorGo.leafPairCount - 1 - i
          }] - leafBounds[0], ${
            leafBounds[collimatorGo.leafPairCount - 1 - i] - leafBounds[0]
          }`
        );
        mlcLeafs.push(
          <Rect
            key={leafIndex}
            id={leafIndex.toString()}
            name={"leaf"}
            x={x}
            y={y}
            width={collimatorGo.width}
            height={currentMlcHeight}
            strokeWidth={rectLineWidth}
            strokeScaleEnabled={false}
            stroke={"black"}
            fill={
              collimatorGo.leafHittedIndex == leafIndex && props.canEdit
                ? props.hittedColor
                : props.defaultColor
            }
            opacity={0.7}
          />
        );

        mlcLeafs.push(
          <Circle
            x={-collimatorGo.width / 2 + leafPositions[0][i] + 200}
            y={leafBounds[collimatorGo.leafPairCount - 1 - i] - leafBounds[0]}
            radius={4.5} // 圆的半径
            fill="red" // 填充颜色
            opacity={0.4}
          />
        );

        // leafIndex += collimatorGo.leafPairCount;
        // mlcLeafs.push(
        //   <Rect
        //     key={leafIndex}
        //     id={leafIndex}
        //     name={"leaf"}
        //     x={collimatorGo.width / 2 + leafPositions[1][i]}
        //     y={leafBounds[collimatorGo.leafPairCount - 1 - i] - leafBounds[0]}
        //     width={collimatorGo.width}
        //     height={currentMlcHeight}
        //     strokeWidth={rectLineWidth}
        //     stroke={"black"}
        //     strokeScaleEnabled={false}
        //     fill={
        //       collimatorGo.leafHittedIndex == leafIndex && props.canEdit
        //         ? props.hittedColor
        //         : props.defaultColor
        //     }
        //     opacity={0.7}
        //   />
        // );
      }
      console.log("[mlcWidget]: collimatorGo.left", collimatorGo.left);
      console.log("[mlcWidget]: collimatorGo.top", collimatorGo.top);
      console.log(
        "[mlcWidget]: mlcGoTop",
        MlcLayerType.Bottom
          ? collimatorGo.bottomMlcGo?.top
          : collimatorGo.upperMlcGo?.top
      );
      temp = (
        <Group
          name={mlcLayer == MlcLayerType.Bottom ? "bottomMlc" : "upperMlc"}
          x={collimatorGo.left}
          y={
            mlcLayer == MlcLayerType.Bottom
              ? collimatorGo.bottomMlcGo?.top
              : collimatorGo.upperMlcGo?.top
          }
          // clip={{
          //   x: 0,
          //   y: 0,
          //   width: collimatorGo.width,
          //   height: collimatorGo.height
          // }}
          listening={props.canEdit}
        >
          {mlcLeafs}
        </Group>
      );
      setElement(temp);
    } else {
      setElement(<></>);
    }
    console.log("leafPositions", leafPositions);
    console.log("leafBounds", leafBounds);
    return () => {
      if (props.renderComplete) {
        props.renderComplete();
      }
    };
  }, [
    props.collimatorGo,
    props.collimatorGo?.bottomMlcGo?.leafPositions,
    props.collimatorGo?.upperMlcGo?.leafPositions,
    props.collimatorGo?.height,
    props.collimatorGo?.width,
    props.collimatorGo?.leafHittedIndex,
    props.canEdit,
    props.behaviorType
  ]);

  return <>{element}</>;
};

export default MlcWidget;
