import { Flat } from "../../0100_element/x00_flat/[flat]";

export interface MediaProps {
    image: string;
    alt:   string;
}

export let MediaSurface = (props: MediaProps) => {
    return (
        <Flat>
            <img src={props.image} alt={props.alt} />
        </Flat>
    );
};