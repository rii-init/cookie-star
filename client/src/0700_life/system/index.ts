import { ReactElement } from "react";
import { GeometrySystem } from "./geometry.system";
import { MagnetSystem } from "./magnet.system";
import { EditableSystem } from "./editable.system";
import { EntityState } from "../../0300_entity";


export interface ISystem {
    registerComponent: (component: ReactElement, state: EntityState) => void;
    update: (delta: number, context: Record<string, any>) => void;
    removeComponent: (component: any) => void;
    dependencies?: any;
}

export const System: Record<string, ISystem> = {
  "MagnetClient":         null as any,
  "MagnetServer":         null as any,
  "boxGeometry":      null as any,
  "sphereGeometry":   null as any,
  "cylinderGeometry": null as any,
}

export const SystemUpdateSequence = [] as ISystem[];


export function initSystems() {
    const magnetSystem   = new MagnetSystem();
    const geometrySystem = new GeometrySystem();
    const editSystem = new EditableSystem();

    System.MagnetClient = magnetSystem;
    System.MagnetServer = magnetSystem;

    System.boxGeometry = geometrySystem;
    System.sphereGeometry = geometrySystem;
    System.cylinderGeometry = geometrySystem;
    System.Editable = editSystem;

    SystemUpdateSequence.push(magnetSystem);

    return System;
}