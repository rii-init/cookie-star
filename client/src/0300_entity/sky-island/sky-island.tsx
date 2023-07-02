import { ReactNode } from "react";
import { Entity } from "..";
import { MagneticField } from "../../0700_life/physical/magnetic-field";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";

export interface SkyIslandProps {
    children?: ReactNode
    position: [number, number, number]
}

export const SkyIsland = (p: SkyIslandProps) => {
    return (
        <group position={p.position}>
            
            { p.children }

            <MagneticField>
                <Entity editMode={true} position={[5, 2, -5]}>
                    <boxGeometry    attach="geometry" args={[3,2,3]} />
                    <meshLambertMaterial  attach="material" color={SyntaxHighlight.Structure} />
                </Entity>
            </MagneticField>
            
            <MagneticField>
                <Entity                position={[-3.5,0,0]}>
                    <boxGeometry   attach="geometry" args={[6,2,4]} />
                    <meshLambertMaterial attach="material" color={SyntaxHighlight.Structure} />
                </Entity>
            </MagneticField>

            <MagneticField>
                <Entity editMode={true} position={[-7, 0, -6.8]}>
                    <boxGeometry    attach="geometry" args={[3,2,3]} />
                    <meshLambertMaterial  attach="material" color={SyntaxHighlight.Structure} />
                </Entity>
            </MagneticField>
            
            <Entity     editMode={true} position={[3.25, 0, -6.5]}>
                    <boxGeometry    attach="geometry" args={[3,2,3]} />
                    <meshLambertMaterial  attach="material" color={SyntaxHighlight.Structure} />
            </Entity>

        </group>
    )
}
