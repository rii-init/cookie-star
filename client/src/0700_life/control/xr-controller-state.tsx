import { useController } from "@react-three/xr";

import { xRControllerState } from "./climbing-controls";

export type Handedness = "left" | "right" | "none";


export function XRControllerState({ session  }: { session: any }) {

        
    // const leftController = useController("left");
    
    // if (leftController) {
    //     const controllerState = xRControllerState.handedness["left"];
    //     controllerState.group = leftController;
    //     controllerState.selecting = false;
    // }
    
    // const rightController = useController("right");
    
    // if (rightController) {
    //     const controllerState = xRControllerState.handedness["right"];
    //     controllerState.group = rightController;
    //     controllerState.selecting = false;
    // }
    
    // const noneController = useController("none");
    
    // if (noneController) {
    //     const controllerState = xRControllerState.handedness["none"];
    //     controllerState.group = noneController;
    //     controllerState.selecting = false;
    // }
            
    
    return <></>;
}