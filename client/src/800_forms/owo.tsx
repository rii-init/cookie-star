import { Mesh } from "three";

/****
 * 
 *  OwO - an UwU's best friend
 * 
 *  Example:  <OwO/>\<UwU/>\<OwO/>
 *  
 * 
 */
export const OwO = function() {

    return (
        <mesh>
            <boxGeometry       attach="geometry"
                                 args={[3, 3, 3]} 
            />
            <meshBasicMaterial attach="material"
                                color="#c3aaff" 
            />
        </mesh>
    );

}