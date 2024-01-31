import { useFrame } from "@react-three/fiber";
import { Universe } from "../../../0000_concept/universe";

export interface  LinkSurfaceFeedbackProps {
    location:        string;
    currentLocation: string;
    hovered:         boolean;

    position?:     [number, number, number];
    linkShape?:    [number, number, number];
    linkPosition?: [number, number, number];
}

       const animatedShape = [0.5, 0.5, 0.1];

export const LinkSurfaceFeedback = (props: LinkSurfaceFeedbackProps) => {
    
    useFrame((state, delta: number) => {
        if (props.hovered) {
            animatedShape[0] += 0.1 * delta;
            animatedShape[1]  = animatedShape[0];
        }
    }, 2);

    return (
        <mesh      
            position={props.linkPosition}>
            
                <boxGeometry args={[ props.linkShape ? props.linkShape[0] : animatedShape[0], 
                                     props.linkShape ? props.linkShape[1] : animatedShape[1], 
                                     props.hovered ? 0.1 : 0.5
                                   ]} 
                                                            />
                <meshLambertMaterial 
                        attach="material"
                        transparent={props.hovered}
                        opacity={props.hovered ? 0.7 : 1.0}
                        color={Universe.colors.background2} />
        </mesh>
    )
}