/***
 * 
 * I fight for the UwU/
 * 
 */

import { Universe } from "../0000_concept/universe";

export const UwU = function() {

    return (
        <mesh>
            <boxGeometry       attach="geometry"
                                 args={[3, 3, 3]} 
            />
            <meshBasicMaterial attach="material"
                                color={Universe.colors.foreground as any} 
            />
        </mesh>
    );

}