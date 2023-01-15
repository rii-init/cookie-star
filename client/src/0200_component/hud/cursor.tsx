
import { useEffect, useRef } from "react";
import { Group } from "three";
import { Universe } from "../../0000_concept/universe";

const WhiteSquare = (p: {
        position: [number,number,number], children: React.ReactNode;
    }) => (
    <mesh position={p.position}>
        <boxBufferGeometry args={[0.05, 0.05, 0.05]} />
        <meshLambertMaterial color="white" />
    </mesh>
);

export interface CursorProps {
    hide: boolean; activated: number;
    position: [number, number, number];
}

export const Cursor = (p: CursorProps) => {
    const meshRef = useRef<Group>(null);
  
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current?.removeFromParent();
            Universe.ctx3.camera.add(meshRef.current);            
        }
    }, [meshRef.current])


    if (p.hide) { return null; }

    return (
        <group ref={meshRef} rotation={[Math.PI / 2, 0, 0]} position={p.position}>
            <WhiteSquare position={[-0.05-p.activated, 0,  0]}>
            </WhiteSquare>
            <WhiteSquare position={[0.05+p.activated,  0,  0]} >
            </WhiteSquare>       
            <WhiteSquare position={[0.0,  0,  0.05+p.activated]} >
            </WhiteSquare>       
            <WhiteSquare position={[0.0,  0, -0.05-p.activated]} >
            </WhiteSquare>
        </group>    
    );
}
