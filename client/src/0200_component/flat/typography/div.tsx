import { Text } from '@react-three/drei';
import { useContext } from 'react';
import { Universe } from '../../../0000_concept/universe';
import { UniverseContext } from '../../../App';

export interface TextDivProps {
    children?: React.ReactNode;
    position?: [number, number, number];
    className?: string;
    color?: string;
}

export const TextDiv = (props: TextDivProps) => {
    const colors = useContext(UniverseContext).colors;

    return (
        <group position={props.position || [0,0,0]}>
            <Text color={props.color || colors._foreground || "black" } 
                  scale={[0.2, 0.2, 0.2]}>
                {props.children}
            </Text>
        </group>
    )
}