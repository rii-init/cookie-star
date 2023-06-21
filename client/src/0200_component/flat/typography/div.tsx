import { Text } from '@react-three/drei';
import { useContext } from 'react';
import { UniverseContext } from '../../../App';
import { Sequence } from '../../../0100_element/200_sequence/sequence';
import { TextWrap } from './text-wrap';

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
        <Sequence direction={props.direction || "z"} polarity={-1} itemPadding={props.itemPadding || 0} 
		   position={props.position || [0,0,0]}>
            <TextWrap renderer={(text: string) => (
					<Text color={props.color || colors._foreground || "black" }
                                scale={[0.2, 0.2, 0.2]}
                            >
                            {text}
                    </Text>
			)}>
				{props.children}
			</TextWrap>
        </Sequence>
    )
}
