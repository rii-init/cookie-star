
import { useEffect, useState } from "react";
import { Object3D } from "three";
import { Universe } from "../../0000_concept/universe";


const WhiteSquare = (p: {
        position: [number,number,number], 
        rotation: [number,number,number]
    }) => (
    <mesh position={p.position} rotation={p.rotation}>
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
    
    let [activated, setActivated] = useState(0.25);


    useEffect(() => {
        const subscription = Universe.state.cursor.$activation
                                                  .subscribe((v: number) => {
            setActivated(v);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    if (p.hide) { return null; }

    const angles = [0, Math.PI * (2/3), Math.PI * (4/3)];

    return (
        <group rotation={[0, 0, 0]} position={p.position}>
            <WhiteSquare position={[Math.sin(angles[0])* 0.25 * activated, Math.cos(angles[0])* 0.25 * activated, 0]} 
                            rotation={[0, 0, 0]} />
            <WhiteSquare position={[Math.sin(angles[1])* 0.25 * activated, Math.cos(angles[1])* 0.25 * activated, 0]} 
                            rotation={[0, 0, angles[1]]} />
            <WhiteSquare position={[Math.sin(angles[2])* 0.25 * activated, Math.cos(angles[2])* 0.25 * activated, 0]} 
                            rotation={[0, 0, angles[2]]} />
        </group>    
    );
}
