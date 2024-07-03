import React from 'react'
import { XRControllerEvent, useXREvent } from "@react-three/xr";

import { systems } from "..";



export interface ClimbingControlsProps {
    children?: React.ReactNode;    
}


export const ClimbingControls = (props: ClimbingControlsProps) => {

    (useXREvent as any)('selectstart', (event: XRControllerEvent) => {
      if (!systems.byComponent.UserControls?.xrControls) return

      
      const hand = event.target.inputSource?.handedness ?? 'left';
      const grip = event.target.grip;

      const controllerState = systems.byComponent.UserControls.xrControls.handedness[hand];

      controllerState.selecting = true;
      controllerState.group = grip;
      controllerState.previous.copy(grip.position);
    });

    (useXREvent as any)('selectend', (event: XRControllerEvent) => {
      if (!systems.byComponent.UserControls?.xrControls) return

      const controllerState = systems.byComponent.UserControls
                                      .xrControls
                                      .handedness[event.target.inputSource?.handedness ?? 'left'];

      controllerState.selecting = false;
    });


    return (
        <>
          {props.children}
        </>
    );
};
