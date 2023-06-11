import { useThree } from "@react-three/fiber";
import { XR, XRController, XRControllerEvent, useController, useXR, useXREvent } from "@react-three/xr";
import { createContext, useEffect, useState } from "react";
import { Group } from "three";
import { Universe } from "../../0000_concept/universe";
import { XRControllerState } from "./xr-controller-state";
import { diagnosticState } from "../../0000/r3f-debug";



export interface ClimbingControlsProps {
    children?: React.ReactNode;    
}




export const xRControllerState = {
  handedness: {
    left:  { selecting: false, previous: [] as number[], group: null as null | Group },
    right: { selecting: false, previous: [] as number[], group: null as null | Group },
    none:  { selecting: false, previous: [] as number[], group: null as null | Group },
  } 
}


export const ClimbingControls = (props: ClimbingControlsProps) => {
    const { isPresenting, session } =  useXR();


    (useXREvent as any)('selectstart', (event: XRControllerEvent) => {
      const hand = event.target.inputSource.handedness;
      const grip = event.target.grip;

      const controllerState = xRControllerState.handedness[hand];

      controllerState.selecting = true;
      controllerState.previous = [grip.position.x, grip.position.y, grip.position.z];
    });

    (useXREvent as any)('selectend', (event: XRControllerEvent) => {
      const controllerState = xRControllerState.handedness[event.target.inputSource.handedness];

      controllerState.selecting = false;
    });


    return (
        <>
          {/* player={player} */}
          { isPresenting && <XRControllerState session={session} ></XRControllerState> }
          {props.children}
        </>
    );
};
