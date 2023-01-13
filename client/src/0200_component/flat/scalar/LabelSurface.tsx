import { Flat } from "../../../0100_element/x00_flat/[flat]";
import { Html } from "@react-three/drei";

export interface LabelSurfaceProps {
    text?: string;
    position?: [number, number, number];
    children: React.ReactNode;
}

export let LabelSurface = (props: LabelSurfaceProps) => {
    return (
        <Flat position={props.position}>
            <Html>            
            { props.text 
                    ? <span>{props.text}</span> 
                    : null 
            }
            { props.children }
            </Html>
        </Flat>
    );
}
