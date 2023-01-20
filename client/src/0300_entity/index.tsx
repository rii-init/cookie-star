import { RayGrab } from "@react-three/xr";
import { Children, cloneElement, ReactNode } from "react";

export interface EntityProps {
    id?:   string;
    name?: string;

    position?: [number, number, number];
    rotation?: [number, number, number];
    matrix?:   [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

    children?: ReactNode;

    editMode?: boolean;
}


export const Entity = (p: EntityProps) => {

    if (p.editMode) {
        return (
        <group position={p.position || [0,0,0]}
               rotation={p.rotation} 
                 matrix={p.matrix}>
        {
             Children.map(p.children, (child) => {
                 if (!child) return null;
                 if (["string", "number"].includes(typeof child)) {
                     return child;
                 }
                 if (((child as any).type) === "group") {
                    return (
                        <group>
                        {
                         Children.map((child as any).props.children, (child) => {
                            if (!child) return null;
                            if (["string", "number"].includes(typeof child)) {
                                return child;
                            }
                            if (["group", "mesh"].includes((child as any).type)) {
                                return cloneElement(child as any, {},
                                    <RayGrab>{
                                        child
                                    }</RayGrab>
                                )
                            }

                            return child;
                         })
                        }
                        </group>
                    )
                } else if (((child as any).type) === "mesh") {
                    return cloneElement(child as any, {}, 
                        <RayGrab>{
                            child
                        }</RayGrab>
                    )
                }

                return child;
             })
        } 
        </group>
        );
    }

    return (
        <group position={p.position || [0,0,0]}
               rotation={p.rotation} 
                 matrix={p.matrix}>
            { p.children }
        </group>
    )
}