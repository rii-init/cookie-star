
export const LilacBox = function() {
    return (
        <mesh position={[0, 2, 0]}>
            <boxGeometry       attach="geometry" 
                                 args={[0.5, 1.8, 0.3]} 
            />
            <meshBasicMaterial attach="material" 
                                color="#f3daff" 
                                
            />
        </mesh>
    )
}
        