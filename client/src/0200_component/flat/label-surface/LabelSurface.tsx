import { Flat } from "../../../0100_element/x00_flat/[flat]";
import { LabelSurfaceProps } from "./LabelSurface.props";

export let LabelSurface = (props: LabelSurfaceProps) => {
    return (
        <Flat position={props.position}>
            { props.text 
                    ? <span>{props.text}</span> 
                    : null 
            }
            { props.children }
        </Flat>
    );
}
