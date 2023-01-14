export interface CursorProps {
    hide: boolean;
    activated: number;
}

export const Cursor = (p: CursorProps) => {
    
    if (p.hide) {
        return null;
    }

    return (
        <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh position={[-0.1-p.activated, 0,  0]}>
                <planeBufferGeometry args={[0.1, 0.1]} />
                <meshBasicMaterial color={[250,250,250]} />
            </mesh>
            <mesh position={[0.1+p.activated,  0,  0]} >
                <planeBufferGeometry args={[0.1, 0.1]} />
                <meshBasicMaterial color={[250,250,250]} />
            </mesh>       
            <mesh position={[0.0,  0,  0.1+p.activated]} >
                <planeBufferGeometry args={[0.1, 0.1]} />
                <meshBasicMaterial color={[250,250,250]} />
            </mesh>       
            <mesh position={[0.0,  0, -0.1-p.activated]} >
                <planeBufferGeometry args={[0.1, 0.1]} />
                <meshBasicMaterial color={[250,250,250]} />
            </mesh>
        </group>    
    );
}