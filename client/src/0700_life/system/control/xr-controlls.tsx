import { useXR } from "@react-three/xr";
import { Group, Vector3 } from "three";
import { systems } from "../index";
import { ClimbingControls } from "./climbing-controls";

import { XRHardwareState } from "./xr-hardware-state";
import { XR_MOVEMENT_TYPE } from "./control.type";
import { UserControlsSystem } from "./control";


export class XRControllerState {

    // Internal State
    movementType: XR_MOVEMENT_TYPE = XR_MOVEMENT_TYPE.CLIMB;

    handedness = {
        left:  { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
        right: { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
        none:  { selecting: false, previous: new Vector3(0,0,0), group: null as null | Group },
    }

    controllerMovement = new Vector3(0, 0, 0);

    // External Dependencies + Context
    private UserControls: UserControlsSystem | undefined | null = null;

    public get dependencies(){
        return this.UserControls || (this.UserControls = systems.byComponent.UserControls, this.UserControls)
    }


    constructor() { }

    update(update: number) {
        
        for (const paw in this.handedness) {
                    
            const controller = this.handedness[paw as "left" | "right" | "none"];
    
            switch(this.movementType) {
                case XR_MOVEMENT_TYPE.CLIMB:
                default:
                    this.updateClimb(controller);
                    break;
            }    
        }
    
    }

    private updateClimb(controller: { selecting: boolean; previous: Vector3; group: Group | null; }) {
        if (!this.dependencies) return;
        
        if (controller.selecting && controller.group !== null) {
            // current position minus previous position
            this.controllerMovement.subVectors(
                controller.previous,  
                controller.group.position,
            );
            
            if (this.dependencies.xr_player) {
                this.dependencies.xr_player.position.add(this.controllerMovement);
                
            }

            controller.previous.copy(controller.group.position)
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