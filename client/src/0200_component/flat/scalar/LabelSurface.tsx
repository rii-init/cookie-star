import { Html } from "@react-three/drei";

export interface LabelSurfaceProps {
    text?: string;
    position?: [number, number, number];
    children: React.ReactNode;
}

export let LabelSurface = (props: LabelSurfaceProps) => {
    return (
        <Html>            
            { props.text 
                    ? <span>{props.text}</span> 
                    : null 
            }
            { props.children }
        </Html>
    );
}
