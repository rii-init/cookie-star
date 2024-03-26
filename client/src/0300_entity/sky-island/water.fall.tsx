import { ReactNode } from "react"
import { Entity } from ".."
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterFallProps {
    position: [number, number, number],
    rotation: [number, number, number]
}

export const WaterFall = (p: WaterFallProps) => {
    return (
        <Entity position={[ p.position[0], p.position[1] - 50, p.position[2] ]} 
                rotation={p.rotation}>
            
            <boxGeometry args={[2,100,0.5]} />
            <meshLambertMaterial transparent={true} opacity={0.4} color={SyntaxHighlight.Sequence} />
            
        </Entity>
    )
}