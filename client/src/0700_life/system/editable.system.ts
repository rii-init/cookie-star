import { ReactElement } from "react";
import { ISystem } from "./index";

export const Editable = () => null;

export class EditableSystem implements ISystem {


    public registerComponent(component: ReactElement, state: Record<string, any>) {
        // this has to wrap the parent of component with <RayGrab> and i'm not sure that's possible
        // I'm not sure how to do this imperatively from this function, is more specifically the issue
        

    }

    public removeComponent(component: any) {

    }

    public update(delta: number, context: Record<string, any>) {

    }


}