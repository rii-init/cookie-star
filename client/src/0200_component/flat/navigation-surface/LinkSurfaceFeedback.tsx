import { useFrame } from "@react-three/fiber";
import { Universe } from "../../../0000_concept/universe";
import { useEffect, useState } from "react";

export interface  LinkSurfaceFeedbackProps {
    location:        string;
    currentLocation: string;
    hovered:         boolean;

    position?:     [number, number, number];
    linkShape?:    [number, number, number];
    linkPosition?: [number, number, number];
}

       

export const LinkSurfaceFeedback = (props: LinkSurfaceFeedbackProps) => {
    const [animatedShape, setAnimatedShape] = useState([0.5, 0.5, 0.1]);
    
    useFrame((state, delta) => {
        if (props.hovered) {
            if (animatedShape[0] > 1) {
                setAnimatedShape([1,1,0.1]);
            } else {
                setAnimatedShape([animatedShape[0] + 2 * delta, animatedShape[1] + 2 * delta, 0.1])
            }
        } 
    });

    useEffect(() => {
        setAnimatedShape([0.5, 0.5, 0.1]);
    }, [props.hovered])

    return (
        <mesh      
            visible={props.hovered || props.currentLocation === props.location}
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