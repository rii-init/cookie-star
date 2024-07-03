import { ReactElement } from "react";
import { Vector3 } from "three";
import { System, Systems } from ".";
import { EntityState } from "../entity";
export declare const MagnetServer: Function;
export declare const MagnetClient: Function;
declare class MagnetServerState {
    shape: "boxGeometry" | "sphereGeometry";
    localBoundingBox: [
        number,
        number,
        number,
        number,
        number,
        number
    ];
    globalBoundingBox: [
        number,
        number,
        number,
        number,
        number,
        number
    ];
    radius: number;
    position: [number, number, number];
    vec3_position: Vector3 | null;
    rotation?: [number, number, number];
    constructor(state: EntityState);
}
export declare class MagnetSystem implements System {
    name: string;
    private camera?;
    private userControls?;
    private magnets;
    private clients;
    registerComponent(component: ReactElement, state: EntityState): void;
    update(delta: number, context: Systems): void;
    removeComponent(magnet: MagnetServerState): void;
    clear(): void;
    get dependencies(): boolean;
    private getGlobalBoundingBox;
    private handleCollision;
    private XZBoundsCheck;
    private applyBoxTopCollisionResponse;
    private applyBoxFrontCollisionResponse;
    private applyBoxBackCollisionResponse;
    private applyBoxLeftCollisionResponse;
    private applyBoxRightCollisionResponse;
    private handleBoxTopCollision;
    private handleBoxBottomCollision;
    private handleBoxSideCollision;
    private getBoxCollisionRegion;
    private handleDiagonalBoundary;
    private handleFTBDiagonalBoundaryFromLocal;
    private handleBTFDiagonalBoundaryFromLocal;
    private handleSphereCollision;
}
export {};
//# sourceMappingURL=magnet.system.d.ts.map