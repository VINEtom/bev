import Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import JawWidget from "./jawWidget";
import MlcWidget from "./mlcWidget";
import collimatorGo from "./collimatorGo";
import props from "./props";

export class CollimatorGraphicObject {
  public left: number = 0;
  public right: number = 0;
  public top: number = 0;
  public bottom: number = 0;
  public width: number = 0;
  public height: number = 0;
  public leafPairCount: number = 0;
  public jawPositions?: (number | undefined)[];
  public angle: number = 0;
  public bottomMlcGo?: MlcGraphicObject;
  public upperMlcGo?: MlcGraphicObject;
  public gantryAngle: number = 0;
  public leafHittedIndex?: number = -1;
  public jawHotArea?: string = undefined;
  public collimatorAngle?: number = 0;
}

export class MlcGraphicObject {
  public bottom?: number;
  public top?: number;
  public leafBounds?: number[];
  public leafPositions?: number[][];
}

export enum BehaviorType {
  //contouring
  nudge,
  circle,
  rect,
  rectErase,
  combo,
  translate2D,
  rectangleEraser,
  circleEraser,
  comboEraser,
  selectZoneEraser,
  separateLineEraser,
  drag,
  smartContour,
  roiSliceRange,
  huDivisionRange,
  bolusDivisionRange,

  //foreground
  default = 100,
  pan,
  zoom,
  windowing,
  reset,
  crosshairJump,
  measureDistance,
  measureAngle,
  pixelInfo,
  circleMark,
  rectMark,
  freeHandMark,
  poiMove,
  beamRotating,
  ctSimSetupEdit,
  translate3D,
  drag3D,
  isoCenterMove,

  //registration
  panChess,
  manualRegistration,
  editRegRegion,
  uviewManualRegistration,

  //background
  pageturn,
  shortcuts,
  displayRoiName,
  cornerInfo,

  //threeD
  threeDPan,
  threeDRotate,
  threeDZoom,

  //bolus
  bolus,
  // dosegrid
  dosegrid,
  //bev
  bevDefault,
  bevScroll,
  bevPan,
  bevZoom,
  bevWindowing,
  bevLockJaw,
  bevMoveLeaf,
  bevMoveJaw,
  bevEditApertureBlock,
  bevEditShieldingBlock,
  bevCircle,
  bevNudge,
  bevRect,
  bevCombo,
  bevDistance,
  bevAngle,
  bevRotate,
  cursor,
  gating,
  eevmeasureDistance,
  eevmeasureAngle,
  bevShortcuts,
  eevLeafNO,
  bevCornerInfo,
  moveSpot,
  editSpot,

  // RtImg
  rtImgDefault,
  rtImgPan,
  rtImgZoom,
  rtImgWindowing,
  pan2DChess,
  rtImgShortCuts,
  rtImgCornerInfo,
  rtImgManualReg,
  rtImgMeasureDistance,
  rtImgMeasureAngle,
  rtImgCircleMark,
  rtImgRectMark,
  rtImgFreeHandMark,
  editRtImgRegRegion,

  // Scout
  scoutDefault,
  scoutPan,
  scoutZoom,
  scoutWindowing,
  editScoutScanRange,

  //剂量剖面
  doseLine,
  // EpidInvivo归一点选取
  normalizationPoint,
  //Epid剂量剖面
  epidDoseLine,
  //三维移动床
  structureTranslate3D
}

export enum MlcLayerType {
  Bottom = 0,
  Upper,
  All
}

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseMove = (event) => {
    setPosition(event.evt.layerX, event.evt.layerY);
  };

  return (
    <Stage width={490} height={702} onMouseMove={onMouseMove}>
      <Layer>
        <Text text={`Postion: ${position.x}, ${position.y}`} />
      </Layer>
      <Layer>
        <MlcWidget
          canEdit={
            props.behaviorType == BehaviorType.bevMoveLeaf &&
            props.currentLayer == MlcLayerType.Bottom
          }
          mlcLayer={MlcLayerType.Bottom}
          collimatorGo={collimatorGo}
          behaviorType={props.behaviorType}
          defaultColor={"#D5B09D"}
          hittedColor={"#BB2499"}
          renderComplete={() => {}}
        />
        {/* <MlcWidget
          canEdit={
            props.behaviorType == BehaviorType.bevMoveLeaf &&
            props.currentLayer == MlcLayerType.Upper
          }
          mlcLayer={MlcLayerType.Upper}
          collimatorGo={collimatorGo}
          behaviorType={props.behaviorType}
          defaultColor={"#5646B8"}
          hittedColor={"#57F5FF"}
          renderComplete={() => {}}
        /> */}
        <JawWidget
          collimatorGo={collimatorGo}
          behaviorType={props.behaviorType}
        />
      </Layer>
    </Stage>
  );
};

export default App;
