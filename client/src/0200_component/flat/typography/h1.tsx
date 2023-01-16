import { Text } from "@react-three/drei";

export interface TextH1Props {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextH1 = (p: TextH1Props) => {
    return (
        <Text position={p.position || [0, 0, 0]}
                 scale={[(p.scaling || 1), (p.scaling || 1), (p.scaling || 1)]}
                 color={p.color || "black"} // default
               anchorX="center" // default
               anchorY="middle" // default
            >
            {p.children}    
        </Text>
    )
}