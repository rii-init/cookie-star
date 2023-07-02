import { useThree } from "@react-three/fiber";
import { XR, XRController, XRControllerEvent, useController, useXR, useXREvent } from "@react-three/xr";
import { createContext, useEffect, useState } from "react";
import { Group, Vector3 } from "three";
import { Universe } from "../../0000_concept/universe";
import { diagnosticState } from "../../0000/r3f-debug";



export interface ClimbingControlsProps {
    children?: React.ReactNode;    
}


export const xRControllerState = {
  handedness: {
    left:  { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
    right: { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
    none:  { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
  } 
}


export const ClimbingControls = (props: ClimbingControlsProps) => {

    (useXREvent as any)('selectstart', (event: XRControllerEvent) => {
      const hand = event.target.inputSource.handedness;
      const grip = event.target.grip;

      const controllerState = xRControllerState.handedness[hand];

      controllerState.selecting = true;
      controllerState.group = grip;
      controllerState.previous.copy(grip.position);
    });

    (useXREvent as any)('selectend', (event: XRControllerEvent) => {
      const controllerState = xRControllerState.handedness[event.target.inputSource.handedness];

      controllerState.selecting = false;
    });


    return (
        <>
          {props.children}
        </>
    );
};
