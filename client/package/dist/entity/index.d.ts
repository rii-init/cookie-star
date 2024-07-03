import React from "react";
import { ReactNode } from "react";
import { SystemEntityState } from "../system";
export interface EntityProps {
    id?: string;
    name?: string;
    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    children: ReactNode;
}
export declare class EntityState {
    position: [number, number, number];
    rotation: [number, number, number];
    geometry: any;
    material: any;
    mesh: THREE.Mesh | THREE.Group | null;
    subEntityState: EntityState[];
    systemEntityState: SystemEntityState;
    constructor();
}
export declare const Entity: (p: EntityProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map