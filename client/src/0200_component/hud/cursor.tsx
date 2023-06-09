
import { useXR, useXREvent, XR } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import { Group, Object3D } from "three";
import { Universe } from "../../0000_concept/universe";
import { useFrame } from "@react-three/fiber";

const WhiteSquare = (p: {
        position: [number,number,number], children: React.ReactNode;
    }) => (
    <mesh position={p.position}>
        <boxBufferGeometry args={[0.025, 0.025, 0.025]} />
        <meshStandardMaterial color="white" opacity={0.45} transparent={true} />
    </mesh>
);

export interface CursorProps {
    hide: boolean; 
    position: [number, number, number];
}

let parent: Object3D | null = null;


export const Cursor = (p: CursorProps) => {
    
    let [activated, setActivated] = useState(0.1);


    useEffect(() => {
        const subscription = Universe.state.cursor.$activation
                                                  .subscribe((v) => {
            setActivated(v);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    
    const meshRef = useRef<Group>(null);
  
    function attachCursorToCamera() {
        if (meshRef.current) {
            if (meshRef.current) {
                parent = meshRef.current.parent;
            }
            meshRef.current?.removeFromParent();
            Universe.ctx3.camera.add(meshRef.current);            
        }
    }

    function removeCursorFromCamera() {
        if (meshRef.current) {
            meshRef.current?.removeFromParent();
            parent?.add(meshRef.current);
        }
    }

    Universe.attachCursorToCamera = attachCursorToCamera;
    Universe.removeCursorFromCamera = removeCursorFromCamera;

    useEffect(() => {
        attachCursorToCamera();
    }, [meshRef.current])


    if (p.hide) { return null; }

    return (
        <group ref={meshRef} rotation={[Math.PI / 2, 0, 0]} position={p.position}>
            <WhiteSquare position={[-0.025- activated, 0,  0]}>
            </WhiteSquare>
            <WhiteSquare position={[ 0.025+ activated,  0,  0]} >
            </WhiteSquare>       
            <WhiteSquare position={[0.0,  0,  0.025+ activated]} >
            </WhiteSquare>       
            <WhiteSquare position={[0.0,  0, -0.025- activated]} >
            </WhiteSquare>
        </group>    
    );
}
