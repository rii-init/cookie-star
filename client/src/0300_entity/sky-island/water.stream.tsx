import { ReactNode } from "react"
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterStreamProps {
    children?: ReactNode
    position: [number, number, number]
}

export const WaterStream = (p: WaterStreamProps) => {
    return (
        <group position={p.position}>
            <mesh>
                <boxBufferGeometry args={[1,1,3]} />
                <meshLambertMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
        </group>
    )
}