import { Html } from "@react-three/drei";
import { PageControl } from "../0700_life/control/page-control";

export interface DocumentSceneProps {
    children?: React.ReactNode;
}

export const DocumentScene = (props: DocumentSceneProps) => {
    return (
        <Html position={[0,3,-2]} >
            {   props.children   }
        </Html>
    )

}