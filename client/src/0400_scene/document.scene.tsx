import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { PageControl } from "../0700_life/control/page-control";

export interface DocumentSceneProps {
    children?: React.ReactNode;
}

export const DocumentScene = (props: DocumentSceneProps) => {
    
    return (
        <Html position={[0,1.6,-2]} style={{pointerEvents: "none"}} >
            {   props.children   }
        </Html>
    )

}