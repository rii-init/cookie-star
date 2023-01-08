import THREE from "three"
import { CloudFormation } from "./cloud.formation"
import { Galaxy } from "./galaxy"

export interface AtmosphereProps {
    texture: string
}

export const atmosphere = (props: AtmosphereProps) => {
    return (
        <group>
            <Galaxy />
            <CloudFormation />
            <mesh>
                <sphereGeometry attach="geometry" args={[100, 100, 100]} />
                <meshBasicMaterial attach="material" map={props.texture} side={THREE.BackSide} />
            </mesh>
        </group>
    )
}