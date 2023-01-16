import { Text } from "@react-three/drei";

export interface TextH4Props {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
}

export const TextH4 = (p: TextH4Props) => {
    return (
        <Text
                scale={[0.5 * (p.scaling || 1), 0.5 * (p.scaling || 1), 0.5 * (p.scaling || 1)]}
                color={p.color || "black"} // default
                anchorX="center" // default
                anchorY="middle" // default
            >
            {p.children}    
        </Text>
    )
}