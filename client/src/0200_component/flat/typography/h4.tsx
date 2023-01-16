import { Text } from "@react-three/drei";

export interface TextH4Props {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextH4 = (p: TextH4Props) => {
    return (
        <Text position={p.position || [0, 0, 0]}
                 scale={[0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1)]}
                 color={p.color || "black"} // default
               anchorX="center" // default
               anchorY="middle" // default
            >
            {p.children}    
        </Text>
    )
}