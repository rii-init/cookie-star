import { Text } from "@react-three/drei";

export interface TextSpanProps {
    children: React.ReactNode;
    color?: string;
}

export const TextSpan = (props: TextSpanProps) => {
    return (
        <Text
            scale={[0.4, 0.4, 0.4]}
            color={props.color || "black"} // default
            anchorX="center" // default
            anchorY="middle" // default
        >
            {props.children}    
        </Text>
    )
}