import { Text } from '@react-three/drei';
import { useContext } from 'react';
import { Universe } from '../../../0000_concept/universe';
import { UniverseContext } from '../../../App';
import { Children } from 'react';
import { Sequence } from '../../../0100_element/200_sequence/sequence';

export interface TextDivProps {
    children?: React.ReactNode;
    direction?: "x" | "y" | "z";
    position?: [number, number, number];
    className?: string;
    color?: string;
}

export const TextDiv = (props: TextDivProps) => {
    const colors = useContext(UniverseContext).colors;

    return (
        <Sequence direction={props.direction || "z"} polarity={-1} 
		   position={props.position || [0,0,0]}>
                {
			Children.map(props.children, (child) => {
				
				if (typeof child === "string") {
		    			return (
					<Text color={props.color || colors._foreground || "black" }
					      scale={[0.2, 0.2, 0.2]}
					>
						{child}
					</Text>
					)
		    	}

				return child;             
		})
		}       
        </Sequence>
    )
}
