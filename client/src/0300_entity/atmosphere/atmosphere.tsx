import { BackSide } from "three"
import { Universe } from "../../0000_concept/universe"
import { CloudFormation } from "./cloud.formation"
import { Galaxy } from "./galaxy"

export interface AtmosphereProps {
    texture?: string
}

export const Atmosphere = (props: AtmosphereProps) => {
    return (
        <group>
            
            {/* <Galaxy />
            <CloudFormation /> */}
            <mesh>
                <boxBufferGeometry attach="geometry" args={[100, 100, 100]} />
                <meshBasicMaterial attach="material" color={Universe.skyColor} side={BackSide} />
            </mesh>
        </group>
    )
}