import { XRControllerEvent, useXREvent } from "@react-three/xr";

import { Universe } from "../../0000_concept/universe";



export interface ClimbingControlsProps {
    children?: React.ReactNode;    
}


export const ClimbingControls = (props: ClimbingControlsProps) => {

    (useXREvent as any)('selectstart', (event: XRControllerEvent) => {
      const hand = event.target.inputSource.handedness;
      const grip = event.target.grip;

      const controllerState = Universe.user_controls.xrControls.handedness[hand];

      controllerState.selecting = true;
      controllerState.group = grip;
      controllerState.previous.copy(grip.position);
    });

    (useXREvent as any)('selectend', (event: XRControllerEvent) => {
      const controllerState = Universe.user_controls
                                      .xrControls
                                      .handedness[event.target.inputSource.handedness];

      controllerState.selecting = false;
    });


    return (
        <>
          {props.children}
        </>
    );
};
