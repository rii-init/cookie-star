import { Text } from "@react-three/drei";

export interface TextSpanProps {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextSpan = (p: TextSpanProps) => {
    return (
        <Text position={p.position || [0, 0, 0]}
                 scale={[0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1)]}
                 color={p.color || "black"} 
               anchorX="center" 
               anchorY="middle"
        >
            {p.children}    
        </Text>
    )
}