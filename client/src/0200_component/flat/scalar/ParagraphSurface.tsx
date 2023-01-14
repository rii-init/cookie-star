import { Html } from "@react-three/drei"
import { ReactNode } from "react"
import { Flat } from "../../../0100_element/x00_flat/[flat]"

export interface ParagraphSurfaceProps {
    children: ReactNode 
}

export const ParagraphSurface = (props: ParagraphSurfaceProps) => {
    return (
        <Html>
            { props.children }    
        </Html>
        
    )
}