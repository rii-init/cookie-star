import { ReactNode } from "react";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";

export interface SkyIslandProps {
    children?: ReactNode
    position: [number, number, number]
}

export const SkyIsland = (p: SkyIslandProps) => {
    return (
        <group position={p.position}>
            <mesh>
                <sphereGeometry  attach="geometry" args={[10,2,10]} />
                <meshLambertMaterial attach="material" color={SyntaxHighlight.Structure} />
            </mesh>
            <mesh position={[-3, 0, -7]}>
                <sphereGeometry attach="geometry" args={[3,2,3]} />
                <meshLambertMaterial attach="material" color={SyntaxHighlight.Structure} />
            </mesh>
            <mesh position={[3, 0, 7]}>
                <sphereGeometry attach="geometry" args={[3,2,3]} />
                <meshLambertMaterial attach="material" color={SyntaxHighlight.Structure} />
            </mesh>
            { p.children }
        </group>
    )
}