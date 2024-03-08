
import { useEffect, useState } from "react";
import { Object3D } from "three";
import { Universe } from "../../0000_concept/universe";


const WhiteSquare = (p: {
        position: [number,number,number]
    }) => (
    <mesh position={p.position}>
        <boxGeometry args={[0.025, 0.025, 0.025]} />
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

    if (p.hide) { return null; }

    return (
        <group rotation={[Math.PI / 2, 0, 0]} position={p.position}>
            <WhiteSquare position={[-0.025- activated, 0,  0]} />
            <WhiteSquare position={[ 0.025+ activated,  0,  0]} />
            <WhiteSquare position={[0.0,  0,  0.025+ activated]} />
            <WhiteSquare position={[0.0,  0, -0.025- activated]} />
        </group>    
    );
}
