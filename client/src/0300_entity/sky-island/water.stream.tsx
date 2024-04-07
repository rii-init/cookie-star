import { ReactNode } from "react"
import { Entity } from ".."
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterStreamProps {
    children?: ReactNode
    scale?:   [number, number, number]
    position: [number, number, number],
    rotation: [number, number, number]
}

export const WaterStream = (p: WaterStreamProps) => {
    const scale = p.scale || [2,0.25,3];
    
    return (
        <Entity position={p.position} rotation={p.rotation} name="🌊 water stream">
            <boxGeometry args={scale} />
            <meshLambertMaterial transparent={true} opacity={0.4} color={SyntaxHighlight.Sequence} />
        </Entity>
    )
}