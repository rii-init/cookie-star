export const GridOctaves = () => {
    return (
        <group>
            <gridHelper args={[16,  16,  0xffffff, "#ffffff"]} 
                       scale={[96, 96, 96]}
                    position={[0,  96, 0]} />
            <gridHelper args={[12,  12,  0xffffff, "#ffffff"]} 
                       scale={[12, 12, 12]} 
                    position={[0,-6, 0]}/>
            {/* <gridHelper args={[12,  12, 0xffffff, "#ffffff"]} 
                        scale={[4,  4,  4]} /> */}
        </group>
    )
}