import { ReactElement } from "react";
import { System, Systems } from "./index";
import { EntityState } from "../entity";
export declare const Editable: Function;
export declare class EditableSystem implements System {
    registerComponent(component: ReactElement, state: EntityState): void;
    removeComponent(component: any): void;
    update(delta: number, context: Systems): void;
}
//# sourceMappingURL=editable.system.d.ts.map