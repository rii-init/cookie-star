import { Html } from "@react-three/drei";

export interface DocumentSceneProps {
    children?: React.ReactNode;
}

export const DocumentScene = (props: DocumentSceneProps) => {
    
    return (
        <Html position={[0,1.6,-2]} style={{pointerEvents: "none"}} >
            {   props.children   }
        </Html>
    )

}