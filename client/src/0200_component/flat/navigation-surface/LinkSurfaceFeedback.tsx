import { Universe } from "../../../0000_concept/universe";

export interface  LinkSurfaceFeedbackProps {
    location:        string;
    currentLocation: string;
    hovered:         boolean;

    position?:     [number, number, number];
    linkShape?:    [number, number, number];
    linkPosition?: [number, number, number];

    children?:  React.ReactNode;
}

export const LinkSurfaceFeedback = (props: LinkSurfaceFeedbackProps) => {
    return (
        <mesh 
               
            position={props.linkPosition} 
            visible={props.currentLocation == props.location || props.hovered} >
            
                <boxGeometry args={props.linkShape || [ 0.5, 0.5, props.hovered ? 0.1 : 0.5]} 
                                                          />
                <meshLambertMaterial 
                        attach="material"
                        transparent={props.hovered}
                        opacity={props.hovered ? 0.7 : 1.0}
                        color={Universe.colors.background2} />
            { props.children }
        </mesh>
    )
}