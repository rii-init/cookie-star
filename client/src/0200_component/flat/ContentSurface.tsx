import { Html } from "@react-three/drei";
import React from "react";
import { Flat } from "../../0100_element/x00_flat/[flat]";

export interface ContentProps {
    children?: React.ReactNode;
    text?:              string;
}


export function ContentSurface(props?: ContentProps) {

    return (
        <Flat>
            <Html>
                <div className="content-surface">
                    { props?.children }
                    { props?.text     }
                </div>
            </Html>
        </Flat>
    )

} 