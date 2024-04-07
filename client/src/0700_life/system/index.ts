import { ReactElement } from "react";
import { GeometrySystem } from "./geometry.system";
import { MagnetSystem } from "./magnet.system";
import { EditableSystem } from "./editable.system";
import { EntityState } from "../../0300_entity";
import { Group, Mesh } from "three";


export interface ISystem {
    registerComponent: (component: ReactElement, state: EntityState, parentMesh?: Mesh | Group) => void;
    update: (delta: number, context: System) => void;
    
    removeComponent: (component: any) => void;
    clear:           ()               => void;

    dependencies?: any;
}


export class System {
  
  updateSequence: ISystem[]               = [];
  byComponent:    Record<string, ISystem> = {};
  
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

  clear() {
    // Clear all ECS entities and ECS components from registry:
    // (unless entity is exempted (like the user/camera, during scene change) )
    console.log("clearing systems state");
    for (const key in this.byComponent) {
      this.byComponent[key].clear();
    }
  }
}

export const systems = new System();