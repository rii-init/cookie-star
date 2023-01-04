import { Flat } from "../../../0100_element/flat/[flat]";
import { LabelSurfaceProps } from "./LabelSurface.props";

export let LabelSurface = (props: LabelSurfaceProps) => {
    return (
        <Flat>
            <span>{props.text}</span>
        </Flat>
    );
}
