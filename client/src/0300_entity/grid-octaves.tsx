export const GridOctaves = () => {
    return (
        <group>
            {/* <gridHelper args={[16,  16,  0xffffff, "#ffffff"]} 
                       scale={[96, 96, 96]}
                    position={[0,  96, 0]} /> */}
            <gridHelper args={[12,  12,  0xffffff, "#ffffff"]} 
                       scale={[12, 12, 12]} 
                    position={[0, -10, 0]}/>
            {/* <gridHelper args={[12,  12, 0xffffff, "#ffffff"]} 
                       scale={[2,  2,  2]}
                    position={[0, 5, 0]} /> */}
        </group>
    )
}