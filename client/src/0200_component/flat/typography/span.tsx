import { Text } from "@react-three/drei";

import { Universe } from "../../../0000_concept/universe";

export interface TextSpanProps {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextSpan = (p: TextSpanProps) => {
    const colors = Universe.colors;

    return (
        <Text position={p?.position || [0, 0, 0]}
            scale={[0.2 * (p?.scaling || 1), 0.2 * (p?.scaling || 1), 0.2 * (p?.scaling || 1)]}
            color={p?.color || colors._foreground || "black"} 
            anchorX="left" 
            anchorY="middle"
        >
            {p?.children}    
        </Text>
    )
}