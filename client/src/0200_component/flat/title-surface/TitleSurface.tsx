import { Flat } from "../../../0100_element/x00_flat/[flat]";
import { LabelSurfaceProps } from "../label-surface/LabelSurface.props";

export interface TitleSurfaceProps extends LabelSurfaceProps {
    text: string;
}

export let TitleSurface = (props: TitleSurfaceProps) => {
    return (
        <Flat>
            <span>{props.text}</span>
        </Flat>
    );
}
