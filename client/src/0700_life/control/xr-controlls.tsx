import { useXR } from "@react-three/xr";
import { Group, Vector3 } from "three";

import { Universe } from "../../0000_concept/universe";
import { ClimbingControls } from "./climbing-controls";

import { XRHardwareState } from "./xr-hardware-state";
import { XR_MOVEMENT_TYPE } from "./control.type";


export class XRControllerState {

    movementType: XR_MOVEMENT_TYPE = XR_MOVEMENT_TYPE.CLIMB;

    handedness = {
        left:  { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
        right: { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
        none:  { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
    }

    controllerMovement = new Vector3(0, 0, 0);

    constructor() { }

    update(update: number) {

        for (const paw in this.handedness) {
                    
            const controller = this.handedness[paw as "left" | "right" | "none"];
    
            if (controller.selecting && controller.group !== null) {
                // current position minus previous position
                this.controllerMovement.subVectors(
                    controller.previous,  
                    controller.group.position,
                );
                
                if (Universe.user_controls.xr_player) {
                    Universe.user_controls.xr_player.position.add(this.controllerMovement);
                    
                }
    
                controller.previous.copy(controller.group.position)
            }
                
        }
    
    }
}


export const XRControlls = () => {

    const { player, isPresenting } = useXR();

    return (
        <>
            <ClimbingControls />
            { isPresenting && <XRHardwareState player={player} /> }
        
        </>
    )

}