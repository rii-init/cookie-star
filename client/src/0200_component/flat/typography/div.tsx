import { Text } from '@react-three/drei';

export interface TextDivProps {
    children?: React.ReactNode;
    position?: [number, number, number];
    className?: string;
}

export const TextDiv = (props: TextDivProps) => {
    return (
        <group position={props.position || [0,0,0]}>
            <Text scale={[0.2, 0.2, 0.2]}>{props.children}</Text>
        </group>
    )
}