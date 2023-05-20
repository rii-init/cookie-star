import { useLayoutEffect, useRef } from "react";
import { InstancedMesh, Object3D, Quaternion, Vector3 } from "three";
import { Universe } from "../../0000_concept/universe";


export let Galaxy = () => {
  
    const meshRef = useRef<InstancedMesh>(null);

    useLayoutEffect( () => {
        const tempObject = new Object3D();
        const center     = new Vector3(0,0,0);
        
        for (let y = 0; y < 320; y++) {
            const theta = Math.random() * Math.PI,
                  phi   = Math.random() * Math.PI * 2;

            tempObject.position.set(
                Math.sin(theta) * Math.cos(phi) * 100,
                Math.sin(theta) * Math.sin(phi) * 100,
                Math.cos(theta) * 100
            );

            tempObject.lookAt(center);

            tempObject.scale.set(1, 1, 1)
            tempObject.updateMatrix()
            
    
            if (meshRef && meshRef.current) { 
                meshRef.current.setMatrixAt(y, tempObject.matrix);
                meshRef.current.instanceMatrix.needsUpdate = true 
            }
        }
    }, [meshRef.current]);
    

return (
  <instancedMesh
    ref={meshRef}
    args={[undefined, undefined, 320]}
  >
    <boxBufferGeometry attach="geometry" args={[1, 1, 1]}></boxBufferGeometry>
    <meshBasicMaterial color={Universe.colors.accent} />
  </instancedMesh>
)
}