import { ReactElement } from "react";
import { System, Systems } from ".";
import { EntityState } from "../entity";
export declare class GeometrySystem implements System {
    registerComponent(component: ReactElement, state: EntityState): void;
    removeComponent(component: any): void;
    update(delta: number, context: Systems): void;
}
//# sourceMappingURL=geometry.system.d.ts.map