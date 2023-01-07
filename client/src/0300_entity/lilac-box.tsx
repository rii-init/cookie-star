import { Universe } from "../0000_concept/universe"

export interface TallBoxProps {
    position?: [number, number, number]
}

export const TallBox = function(props: TallBoxProps) {
    return (
        <mesh position={props.position || [0, 2, 0]}>
            <boxGeometry       attach="geometry" 
                                 args={[0.5, 1.8, 0.3]} 
            />
            <meshBasicMaterial attach="material" 
                                color={Universe.colors.accent2 as any} 
                                
            />
        </mesh>
    )
}
        