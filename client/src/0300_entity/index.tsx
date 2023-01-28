import { RayGrab } from "@react-three/xr";
import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { MagneticField } from "../0700_life/physical/magnetic-field";

export interface EntityProps {
    id?:   string;
    name?: string;

    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?:   [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

    children: ReactNode;

    editMode?: boolean;
    magnetic?: boolean;
}

const EditableEntiy = (p: EntityProps) => {

    return (
        <RayGrab>
        <mesh position={p.position} rotation={p.rotation}>
          { p.children }
        </mesh>
        </RayGrab>
    )
}


export const Entity = (p: EntityProps) => {
    
    if (p.editMode) {
        return (
            <EditableEntiy position={p.position} rotation={p.rotation}>
                { p.children }
            </EditableEntiy>
          )
    }

    return (
        <mesh position={p.position} rotation={p.rotation}>
            { p.children }
        </mesh>
    )
}
