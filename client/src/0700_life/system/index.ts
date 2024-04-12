import { ReactElement } from "react";
import { GeometrySystem } from "./geometry.system";
import { MagnetSystem } from "./magnet.system";
import { EditableSystem } from "./editable.system";
import { EntityState } from "../../0300_entity";
import { Group, Mesh } from "three";


// Entity-facing interface for a component + system
export interface SystemComponentState {
  // cleans up instance of an entity from the perspective of a system
  remove(): void;
  // various other things for the system in question
  [key: string]: any;
}

// Entity-facing interface for an entity + system
export class SystemEntityState {
  constructor (
      public MagnetServer?: SystemComponentState,
      public Editable?:     SystemComponentState,
  ) {}
} 


export interface System {
    registerComponent: (component: ReactElement, state: EntityState, parentMesh?: Mesh | Group) => void;
    update: (delta: number, context: Systems) => void;
    removeComponent: (component: any)         => void;

    dependencies?: any;
}


export class Systems {
  
  updateSequence: System[]               = [];
  byComponent:    Record<string, System> = {};
  
  constructor() {
    this.updateSequence = [];
    this.byComponent = {};

    // ecs systems:
    const magnetSystem   = new MagnetSystem();
    const geometrySystem = new GeometrySystem();
    const editSystem = new EditableSystem();

    // custom components and their associated systems:
    this.byComponent.MagnetClient = magnetSystem;
    this.byComponent.MagnetServer = magnetSystem;
    this.byComponent.Editable = editSystem;

    // react-three/fiber components and their associated systems:
    this.byComponent.boxGeometry      = geometrySystem;
    this.byComponent.sphereGeometry   = geometrySystem;
    this.byComponent.cylinderGeometry = geometrySystem;
    
    
    // some of these need to do things in a certain order, at animation time
    this.updateSequence.push(magnetSystem);
  }
}

export const systems = new Systems();