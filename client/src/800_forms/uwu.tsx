/***
 * 
 * I fight for the UwU/
 * 
 */

export const UwU = function() {

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