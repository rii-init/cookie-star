import { ReactNode } from "react"
import { Entity } from ".."
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterStreamProps {
    children?: ReactNode
    position: [number, number, number],
    rotation: [number, number, number]
}

export const WaterStream = (p: WaterStreamProps) => {
    return (
        <Entity position={p.position} rotation={p.rotation} editMode={true}>
            <mesh>
                <boxGeometry args={[2,0.25,3]} />
                <meshLambertMaterial transparent={true} opacity={0.65} color={SyntaxHighlight.Sequence} />
            </mesh>
        </Entity>
    )
}