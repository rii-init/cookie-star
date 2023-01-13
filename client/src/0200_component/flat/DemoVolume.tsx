import { Html } from "@react-three/drei";
import { ReactNode } from "react"

export interface DemoVolumeProps {
    name: string;
    children: ReactNode
}

export const DemoVolume = (props: DemoVolumeProps) => {
    return (
        <group>
            {props.children}
        </group>
    )   
}