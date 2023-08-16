import { Text } from "@react-three/drei";
import { Universe } from "../../../0000_concept/universe";

export interface TextPProps {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextP = (p: TextPProps) => {

    // const paragraph = (p.children as string)
    //          .match(/(.{1,32})(?:\s|$)/g);;

    return (
        <group>
        
            <Text
                scale={[0.2 * (p?.scaling || 1), 0.2 * (p?.scaling || 1), 0.2 * (p?.scaling || 1)]}
                color={p?.color || Universe.colors._foreground} // default
                anchorX="center" // default
                anchorY="middle" // default
            >
            {p?.children}   
            </Text>
        ))
        
        </group>
    );
}