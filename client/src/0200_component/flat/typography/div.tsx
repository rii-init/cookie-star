import { Text } from '@react-three/drei';
import { useContext } from 'react';
import { UniverseContext } from '../../../App';
import { Sequence } from '../../../0100_element/200_sequence/sequence';

export interface TextDivProps {
    children?: React.ReactNode;
    direction?: "x" | "y" | "z";
	itemPadding?: number;
    position?: [number, number, number];
    className?: string;
    color?: string;
}

export const TextDiv = (props: TextDivProps) => {
    const colors = useContext(UniverseContext).colors;

    return (
		<Text color={props.color || colors._foreground || "black" }
                                scale={[0.2, 0.2, 0.2]}
                            >
            {props.children}
        </Text>
    )
}
