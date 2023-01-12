import { Flat } from "../../../0100_element/x00_flat/[flat]";
import { LabelSurfaceProps } from "./LabelSurface.props";
import { Html, Stats } from "@react-three/drei";

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
