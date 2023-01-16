import { Text } from "@react-three/drei";

export interface TextH3Props {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
}

export const TextH3 = (p: TextH3Props) => {
    return (
        <Text
                scale={[0.66 * (p.scaling||1) , 0.66 * (p.scaling||1), 0.66 * (p.scaling||1)]}
                color={p.color || "black"} // default
                anchorX="center" // default
                anchorY="middle" // default
            >
            {p.children}    
        </Text>
    )
}