import { ReactElement } from "react";
import { GeometrySystem } from "./geometry.system";
import { MagnetSystem } from "./magnet.system";
import { EditableSystem } from "./editable.system";
import { EntityState } from "../../0300_entity";
import { Group, Mesh } from "three";
import { UserControlsSystem } from "./control/control";


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


export interface SystemsByComponent {

  MagnetClient?: MagnetSystem
  MagnetServer?: MagnetSystem
  Editable?:     EditableSystem
  UserControls?: UserControlsSystem

  boxGeometry?:      GeometrySystem
  sphereGeometry?:   GeometrySystem
  cylinderGeometry?: GeometrySystem
}

export class Systems {
  
  updateSequence: System[]               = [];
  byComponent:    SystemsByComponent     = {};
  
  constructor() {
    this.updateSequence = [];
    this.byComponent = {};

    // hid system:
    const userControlsSystem = new UserControlsSystem();

    // ecs systems:
    const magnetSystem   = new MagnetSystem();
    const geometrySystem = new GeometrySystem();
    const editSystem = new EditableSystem();

    // custom components and their associated systems:
    this.byComponent.MagnetClient = magnetSystem;
    this.byComponent.MagnetServer = magnetSystem;
    this.byComponent.Editable = editSystem;
    this.byComponent.UserControls = userControlsSystem;

    // react-three/fiber components and their associated systems:
    this.byComponent.boxGeometry      = geometrySystem;
    this.byComponent.sphereGeometry   = geometrySystem;
    this.byComponent.cylinderGeometry = geometrySystem;
    
    
    // some of these need to do things in a certain order, at animation time
    this.updateSequence.push(magnetSystem);
    this.updateSequence.push(userControlsSystem);
  }
}

export const systems = new Systems();