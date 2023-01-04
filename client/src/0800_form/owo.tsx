import { Mesh } from "three";
import { Universe } from "../0000_concept/universe";

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
                                color={Universe.colors.accent2 as any} 
            />
        </mesh>
    );

}