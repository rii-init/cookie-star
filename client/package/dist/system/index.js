import { GeometrySystem } from "./geometry.system";
import { MagnetSystem } from "./magnet.system";
import { EditableSystem } from "./editable.system";
import { UserControlsSystem } from "./control/control";
// Entity-facing interface for an entity + system
export class SystemEntityState {
    constructor(MagnetServer, Editable) {
        this.MagnetServer = MagnetServer;
        this.Editable = Editable;
    }
}
export class Systems {
    constructor() {
        this.updateSequence = [];
        this.byComponent = {};
        this.updateSequence = [];
        this.byComponent = {};
        // hid system:
        const userControlsSystem = new UserControlsSystem();
        // ecs systems:
        const magnetSystem = new MagnetSystem();
        const geometrySystem = new GeometrySystem();
        const editSystem = new EditableSystem();
        // custom components and their associated systems:
        this.byComponent.MagnetClient = magnetSystem;
        this.byComponent.MagnetServer = magnetSystem;
        this.byComponent.Editable = editSystem;
        this.byComponent.UserControls = userControlsSystem;
        // react-three/fiber components and their associated systems:
        this.byComponent.boxGeometry = geometrySystem;
        this.byComponent.sphereGeometry = geometrySystem;
        this.byComponent.cylinderGeometry = geometrySystem;
        // some of these need to do things in a certain order, at animation time
        this.updateSequence.push(magnetSystem);
        this.updateSequence.push(userControlsSystem);
    }
}
export const systems = new Systems();
//# sourceMappingURL=index.js.map