import { Text } from "@react-three/drei";
import { Universe } from "../../../0000_concept/universe";
import { TextDebug } from "./text-debug";
import { MutableRefObject, useState } from "react";

export interface TextNodeProps {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextNode = (p: TextNodeProps) => {
    const [ref, setRef] = useState<MutableRefObject<THREE.Mesh>>(null!);

    return (
        <Text
            ref={meshRef => { setRef(meshRef) }}
            position={p.position || [0, 0, 0]}
            scale={[0.2 * (p?.scaling || 1), 0.2 * (p?.scaling || 1), 0.2 * (p?.scaling || 1)]}
            color={p?.color || Universe.colors._foreground} // default
            anchorX="left"   // default
            anchorY="middle" // default
        >
            {p?.children}  
            <TextDebug meshRef={ref} /> 
        </Text>
    );
}