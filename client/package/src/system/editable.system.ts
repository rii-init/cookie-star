import { ReactElement } from "react";
import { System, Systems } from "./index";
import { named } from "../etc/0000_concept/named";
import { EntityState } from "../entity";

export const Editable = named(function(){ return null }, "Editable");

export class EditableSystem implements System {


    public registerComponent(component: ReactElement, state: EntityState): void {
        // this has to wrap the parent of component with <RayGrab> and i'm not sure that's possible
        // I'm not sure how to do this imperatively from this function, is more specifically the issue
    }

    public removeComponent(component: any) {

    }

    public update(delta: number, context: Systems) {

    }


}