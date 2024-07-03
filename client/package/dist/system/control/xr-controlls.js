import React from 'react';
import { useXR } from "@react-three/xr";
import { Vector3 } from "three";
import { systems } from "../index";
import { ClimbingControls } from "./climbing-controls";
import { XRHardwareState } from "./xr-hardware-state";
import { XR_MOVEMENT_TYPE } from "./control.type";
export class XRControllerState {
    get dependencies() {
        return this.UserControls || (this.UserControls = systems.byComponent.UserControls, this.UserControls);
    }
    constructor() {
        // Internal State
        this.movementType = XR_MOVEMENT_TYPE.CLIMB;
        this.handedness = {
            left: { selecting: false, previous: new Vector3(0, 0, 0), group: null },
            right: { selecting: false, previous: new Vector3(0, 0, 0), group: null },
            none: { selecting: false, previous: new Vector3(0, 0, 0), group: null },
        };
        this.controllerMovement = new Vector3(0, 0, 0);
        // External Dependencies + Context
        this.UserControls = null;
    }
    update(update) {
        for (const paw in this.handedness) {
            const controller = this.handedness[paw];
            switch (this.movementType) {
                case XR_MOVEMENT_TYPE.CLIMB:
                default:
                    this.updateClimb(controller);
                    break;
            }
        }
    }
    updateClimb(controller) {
        if (!this.dependencies)
            return;
        if (controller.selecting && controller.group !== null) {
            // current position minus previous position
            this.controllerMovement.subVectors(controller.previous, controller.group.position);
            if (this.dependencies.xr_player) {
                this.dependencies.xr_player.position.add(this.controllerMovement);
            }
            controller.previous.copy(controller.group.position);
        }
    }
}
export const XRControlls = () => {
    const { player, isPresenting } = useXR();
    return (React.createElement(React.Fragment, null,
        React.createElement(ClimbingControls, null),
        isPresenting && React.createElement(XRHardwareState, { player: player })));
};
//# sourceMappingURL=xr-controlls.js.map