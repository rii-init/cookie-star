import React, { JSXElementConstructor } from "react";

export interface R3FDebugProps {
    enabled?: boolean;
    children: React.ReactNode;
}

export const R3FDebug = (p: R3FDebugProps) => {
    // iterate over children
    // if child is a mesh, add a box helper
    // if child is a group, add a box helper
    return (
        <group>
            { React.Children.map(p.children, (child) => {
                if (!child || !(child as any).type || typeof child === "string" || typeof child === "number") {
                    return null;
                }

                debugger;

                if ((child as any).type === "mesh") {
                    console.log("debug: mesh ", child);
                    return (
                        <>
                            {child}
                            <boxHelper args={[child as any]} />
                        </>
                    )
                }
                if ((child as any) === "group") {
                    console.log("debug: group ", child);
                    return (
                        <>
                            {child}
                            <boxHelper args={[child as any]} />
                        </>
                    )
                }
                return child    
            })
            }
        </group>
    )
}