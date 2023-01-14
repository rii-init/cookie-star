export const GridOctaves = () => {
    return (
        <group>
            <gridHelper args={[8,  8,  0xf0f0f0, "#f0f0f0"]} 
                       scale={[64, 64, 64]}
                    position={[0,  48, 0]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[16, 16, 16]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[8,  8,  8]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[4,  4,  4]} />
        </group>
    )
}