import React from 'react';
import { Group, Vector3 } from "three";
import { XR_MOVEMENT_TYPE } from "./control.type";
import { UserControlsSystem } from "./control";
export declare class XRControllerState {
    movementType: XR_MOVEMENT_TYPE;
    handedness: {
        left: {
            selecting: boolean;
            previous: Vector3;
            group: Group | null;
        };
        right: {
            selecting: boolean;
            previous: Vector3;
            group: Group | null;
        };
        none: {
            selecting: boolean;
            previous: Vector3;
            group: Group | null;
        };
    };
    controllerMovement: Vector3;
    private UserControls;
    get dependencies(): UserControlsSystem | undefined;
    constructor();
    update(update: number): void;
    private updateClimb;
}
export declare const XRControlls: () => React.JSX.Element;
//# sourceMappingURL=xr-controlls.d.ts.map