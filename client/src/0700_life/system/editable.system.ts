import { ReactElement } from "react";
import { System, Systems } from "./index";

export const Editable = () => null;

export class EditableSystem implements System {


    public registerComponent(component: ReactElement, state: Record<string, any>): void {
        // this has to wrap the parent of component with <RayGrab> and i'm not sure that's possible
        // I'm not sure how to do this imperatively from this function, is more specifically the issue
    }

    public removeComponent(component: any) {

    }

    public update(delta: number, context: Systems) {

    }


}