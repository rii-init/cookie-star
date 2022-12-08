import { LabelSurfaceProps } from "../label-surface/LabelSurface.props";
import { Flat } from "../[flat]";

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
