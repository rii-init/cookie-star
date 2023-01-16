import { Text } from "@react-three/drei";

export interface TextH2Props {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
}

export const TextH2 = (p: TextH2Props) => {
    return (
        <Text
                scale={[0.75 * (p.scaling||1), 0.75 * (p.scaling||1), 0.75 * (p.scaling||1)]}
                color={p.color || "black"} // default
                anchorX="center" // default
                anchorY="middle" // default
            >
            {p.children}    
        </Text>
    );
}