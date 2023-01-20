import { ReactNode } from "react"
import { Entity } from ".."
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterStreamProps {
    children?: ReactNode
    position: [number, number, number]
}

export const WaterStream = (p: WaterStreamProps) => {
    return (
        <Entity position={p.position} editMode={true}>
            <mesh>
                <boxBufferGeometry args={[1,1,3]} />
                <meshLambertMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
        </Entity>
    )
}