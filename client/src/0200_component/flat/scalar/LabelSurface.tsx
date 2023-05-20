import { Html } from "@react-three/drei";
import { TextH3 } from "../typography/h3";

export interface LabelSurfaceProps {
    text?: string;
    position?: [number, number, number];
    children: React.ReactNode;
}

export let LabelSurface = (props: LabelSurfaceProps) => {
    return (
        <TextH3 position={props.position}>            
            { props.text 
                    ? props.text 
                    : null 
            }
            { props.children }
        </TextH3>
    );
}
