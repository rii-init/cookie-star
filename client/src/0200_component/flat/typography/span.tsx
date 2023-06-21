import { Text } from "@react-three/drei";
import { useContext } from "react";
import { UniverseContext } from "../../../App";
import { TextWrap } from "./text-wrap";

export interface TextSpanProps {
    children: React.ReactNode;
    color?: string;
    scaling?: number;
    position?: [number, number, number];
}

export const TextSpan = (p: TextSpanProps) => {
    const colors = useContext(UniverseContext).colors;
    
    return (
        
        <TextWrap renderer={(text: string) => (
            <Text position={p.position || [0, 0, 0]}
                 scale={[0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1), 0.2 * (p.scaling || 1)]}
                 color={p.color || colors._foreground || "black"} 
               anchorX="center" 
               anchorY="middle">
                {text}    
            </Text>

        )}
        >
            {p.children}
        </TextWrap>
    )
}