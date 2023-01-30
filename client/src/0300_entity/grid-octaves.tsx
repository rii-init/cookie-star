export const GridOctaves = () => {
    return (
        <group>
            <gridHelper args={[16,  16,  0xf0f0f0, "#f0f0f0"]} 
                       scale={[96, 96, 96]}
                    position={[0,  96, 0]} />
            <gridHelper args={[12,  12,  0xe0e0e0, "#e0e0e0"]} 
                       scale={[12, 12, 12]} 
                    position={[0,-6, 0]}/>
            {/* <gridHelper args={[12,  12,  0xe0e0e0, "#e0e0e0"]} 
                        scale={[4,  4,  4]} /> */}
        </group>
    )
}