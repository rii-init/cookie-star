import { ReactNode } from "react"
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface WaterFallProps {
    children?: ReactNode
    position: [number, number, number]
}

export const WaterFall = (p: WaterFallProps) => {
    return (
        <group position={p.position}>
            <mesh>
                <sphereGeometry args={[1,4,5]} />
                <meshLambertMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
            <mesh position={[2,0,1]}>
                <sphereGeometry args={[0.7,4,4]} />
                <meshLambertMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
            <mesh position={[1,0,2]}>
                <sphereGeometry args={[1.7,4,4]} />
                <meshLambertMaterial color={SyntaxHighlight.Sequence} />
            </mesh>
            {p.children}
        </group>
    )
}