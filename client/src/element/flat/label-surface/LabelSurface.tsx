import { Flat } from "../[flat]";
import { LabelSurfaceProps } from "./LabelSurface.props";

export let LabelSurface = (props: LabelSurfaceProps) => {
    return (
        <Flat>
            <span>{props.text}</span>
        </Flat>
    );
}
