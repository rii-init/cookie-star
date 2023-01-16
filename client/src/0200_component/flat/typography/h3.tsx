import { Text } from "@react-three/drei";
import { Universe } from "../../../0000_concept/universe";

export interface TextH3Props {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextH3 = (p: TextH3Props) => {
    return (
        <Text position={p.position || [0, 0, 0]}
                 scale={[0.25 * (p.scaling||1) , 0.25 * (p.scaling||1), 0.25 * (p.scaling||1)]}
                 color={p.color || Universe.colors._foreground} // default
               anchorX="center" // default
               anchorY="middle" // default
        >
            {p.children}    
        </Text>
    )
}