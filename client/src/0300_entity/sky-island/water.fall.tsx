import { ReactNode } from "react"
import { Entity } from ".."
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterFallProps {
    children?: ReactNode
    position: [number, number, number],
    rotation: [number, number, number]
}

export const WaterFall = (p: WaterFallProps) => {
    return (
        <Entity position={p.position} rotation={p.rotation} editMode={true}>
            <mesh position={[0,-50,0]}>
                <boxGeometry args={[2,100,0.5]} />
                <meshLambertMaterial transparent={true} opacity={0.4} color={SyntaxHighlight.Sequence} />
            </mesh>
            {p.children}
        </Entity>
    )
}