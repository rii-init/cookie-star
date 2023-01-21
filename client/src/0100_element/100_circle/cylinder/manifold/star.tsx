import { Quaternion, Vector3 } from "three";
import { Universe } from "../../../../0000_concept/universe";
import { CylinderManifold } from "./[cylinder_manifold]";

export interface StarProps {
    position: [number, number, number]
}

export let Star = (p: StarProps) => {
    
    // get direction to center
    const rotation  =    new Quaternion();
    const center    =    new Vector3(0, 0, 0),
          direction = 
          center
                    .sub(new Vector3(...p.position))
                    .normalize(); 

    return (
        <mesh position={p.position} 
            quaternion={rotation.setFromUnitVectors(center, direction)}>
            <boxBufferGeometry args={[1,1,1]} />
            <meshBasicMaterial color={Universe.colors.accent} />
        </mesh>
    );

}

