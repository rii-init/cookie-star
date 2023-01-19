import { FluidManifold } from "./[fluid_manifold]";

export interface CloudProps {
    position: [number, number, number];
    children?: React.ReactNode;
}

export let Cloud = (p: CloudProps) => {
        
        return (
            <mesh position={p.position}>
                <sphereBufferGeometry args={[3.5+Math.random()*4, 3, 4]} />
                <meshLambertMaterial color="white" transparent={true} opacity={0.5} />
            </mesh>
            // <FluidManifold />
        );
    
    };