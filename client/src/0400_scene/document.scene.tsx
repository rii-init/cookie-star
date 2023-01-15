import { Html } from "@react-three/drei";

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