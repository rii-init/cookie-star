import { ReactElement } from "react";
import { ISystem, System } from ".";
import { EntityState } from "../../0300_entity";

export class GeometrySystem implements ISystem {

    public registerComponent(component: ReactElement, state: EntityState) {
        // take the "args" prop and store it in the state
        const localBoundingBox = [0,0,0, 0,0,0];
        
        if (component.props.args) {

            if ((component as any).type) {
                if ((component as any).type == "boxGeometry") {
                    localBoundingBox[0] = -component.props.args[0] / 2;
                    localBoundingBox[1] = -component.props.args[1] / 2;
                    localBoundingBox[2] = -component.props.args[2] / 2;
                    localBoundingBox[3] = component.props.args[0] / 2;
                    localBoundingBox[4] = component.props.args[1] / 2;
                    localBoundingBox[5] = component.props.args[2] / 2;

                } else if ((component as any).type == "sphereGeometry") {
                    localBoundingBox[0] = -component.props.args[0];
                    localBoundingBox[1] = -component.props.args[0];
                    localBoundingBox[2] = -component.props.args[0];
                    localBoundingBox[3] = component.props.args[0];
                    localBoundingBox[4] = component.props.args[0];
                    localBoundingBox[5] = component.props.args[0];

                }
            }
        }

        state["geometry"] = {
            type: (component as any).type,
            args: (component as any)?.props?.args,
            localBoundingBox
        }
    }

    public removeComponent(component: any) {
        // noop
    }

    public clear() {
        // also noop (Nice!)
    }

    public update(delta: number, context: System) {

    }
}