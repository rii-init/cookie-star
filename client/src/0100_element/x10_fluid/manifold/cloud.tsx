import { Entity } from "../../../0300_entity";
import { FluidManifold } from "./[fluid_manifold]";

export interface CloudProps {
    position: [number, number, number];
    radius: number;
    children?: React.ReactNode;
}

export let Cloud = (p: CloudProps) => {
        
        return (
            <Entity editMode={true}>                
                <mesh position={p.position}>
                    <sphereBufferGeometry args={[p.radius, 3, 4]} />
                    <meshLambertMaterial color="white" transparent={true} opacity={0.5} />
                </mesh>
            </Entity>
            // <FluidManifold />
        );
    
    };