export const GridOctaves = () => {
    return (
        <group>
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} 
                       scale={[32, 32, 32]}
                    position={[0,  32, 0]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[16, 16, 16]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[8,  8,  8]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[4,  4,  4]} />
        </group>
    )
}