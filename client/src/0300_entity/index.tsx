import { RayGrab } from "@react-three/xr";
import { Children, cloneElement, isValidElement, ReactNode } from "react";

export interface EntityProps {
    id?:   string;
    name?: string;

    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?:   [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

    children: ReactNode;

    editMode?: boolean;
}


export const Entity = (p: EntityProps) => {

    if (p.editMode) {
        return (
            <mesh position={p.position} rotation={p.rotation}>
              {Children.map(p.children, child => {
                if (! isValidElement(child)) return child
                //if (child.type === 'mesh') {
                  return <RayGrab>{child}</RayGrab>
                //}
                //return child
              })}
            </mesh>
          )
    }

    return (
        <>
            { p.children }
        </>
    )
}