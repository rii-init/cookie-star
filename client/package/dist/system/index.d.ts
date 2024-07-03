import { ReactElement } from "react";
import { GeometrySystem } from "./geometry.system";
import { MagnetSystem } from "./magnet.system";
import { EditableSystem } from "./editable.system";
import { EntityState } from "../entity";
import { Group, Mesh } from "three";
import { UserControlsSystem } from "./control/control";
export interface SystemComponentState {
    remove(): void;
    [key: string]: any;
}
export declare class SystemEntityState {
    MagnetServer?: SystemComponentState | undefined;
    Editable?: SystemComponentState | undefined;
    constructor(MagnetServer?: SystemComponentState | undefined, Editable?: SystemComponentState | undefined);
}
export interface System {
    registerComponent: (component: ReactElement, state: EntityState, parentMesh?: Mesh | Group) => void;
    update: (delta: number, context: Systems) => void;
    removeComponent: (component: any) => void;
    dependencies?: any;
}
export interface SystemsByComponent {
    MagnetClient?: MagnetSystem;
    MagnetServer?: MagnetSystem;
    Editable?: EditableSystem;
    UserControls?: UserControlsSystem;
    boxGeometry?: GeometrySystem;
    sphereGeometry?: GeometrySystem;
    cylinderGeometry?: GeometrySystem;
}
export declare class Systems {
    updateSequence: System[];
    byComponent: SystemsByComponent;
    constructor();
}
export declare const systems: Systems;
//# sourceMappingURL=index.d.ts.map