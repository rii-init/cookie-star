import { useThree } from "@react-three/fiber";
import { XR, XRController, XRControllerEvent, useController, useXR, useXREvent } from "@react-three/xr";
import { createContext, useEffect, useState } from "react";
import { Group } from "three";
import { Universe } from "../../0000_concept/universe";
import { XRControllerState } from "./xr-controller-state";



export interface ClimbingControlsProps {
    children?: React.ReactNode;    
    api?: any // (api: { methods?: any }) => ExternalClimbingControlsProviders;
}


interface XRInputSource {
    handedness: "left" | "right" | "none";
    gamepad: Gamepad;
}
  

// export interface XRController extends Object3D {
//   index: number
//   controller: THREE.XRTargetRaySpace
//   grip: THREE.XRGripSpace
//   hand: THREE.XRHandSpace
//   inputSource: XRInputSource
// }

  
export interface XRControllerMap {
    [key: string]: IXRController;
}

export interface IXRController {
    squeezing: boolean;
    selecting: boolean;
    inputSource: XRInputSource;
    grip: Group;
    // we can always get the world position etc. from the controller
    // TODO: add targetray, so that rays can be precisely positioned
    // https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource/targetRayMode
    // controller actually returns the targetRaySpace!
    controller: Group;
}



export const xRControllerState = {
  handedness: {
    left:  { selecting: false, previousPosition: [] as number[], baseMatrix: null as null | number[] },
    right: { selecting: false, previousPosition: [] as number[], baseMatrix: null as null | number[] },
    none:  { selecting: false, previousPosition: [] as number[], baseMatrix: null as null | number[] },
  } 
}


export const ClimbingControls = (props: ClimbingControlsProps) => {
    // const { isPresenting, session, player } =  useXR();


    // (useXREvent as any)('selectstart', (event: XRControllerEvent) => {
    //   const hand = event.target.inputSource.handedness;
    //   const grip = event.target.grip;

    //   if (hand !== null) {
    //     const controller = xRControllerState.handedness[hand];
    //     controller.previousPosition = grip.matrixWorld.elements;
    //     controller.selecting = true;       
    //   }
    // });

    // (useXREvent as any)('selectEnd', (event: XRControllerEvent) => {
    //   const hand = event.target.inputSource.handedness;
      
    //   if (hand !== null) {
    //     const controller = xRControllerState.handedness[hand];

    //     controller.selecting = false;      
    //   }
    // });


    return (
        <>
          {/* { isPresenting && <XRControllerState session={session} player={player}></XRControllerState>} */}
          {props.children}
        </>
    );
};
