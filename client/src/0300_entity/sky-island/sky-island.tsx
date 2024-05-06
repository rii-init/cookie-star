import { ReactNode } from "react";
import { Tree } from "./tree";
import { GrassyBox } from "./grassy-box";

export interface SkyIslandProps {
    children?: ReactNode
    position: [number, number, number]
    spread?: number // How far apart the islands are
}

export const SkyIsland = (p: SkyIslandProps) => {
    const spread = p.spread !== undefined ? p.spread : 1;

    console.log("init SkyIsland 🏝");

    return (
        <group position={p.position}>
            
            { p.children }

            { /* (candy?) mountain, Charlie */ }
            <GrassyBox position={[-9*spread,     3, -16*spread]}   dimensions={[3,2,3]} name="secret-island 1" />
            <GrassyBox position={[-4*spread,     2, -12*spread]}   dimensions={[4,2,3]} name="secret-island 2" />
            <GrassyBox position={[-5*spread,     1, -10*spread]}   dimensions={[3,3,4]} name="secret-island 3" >
                <Tree position={[0, 1.5, 0]} rotation={[0, -Math.PI /2, 0 ]} />
            </GrassyBox>
            
            
            <GrassyBox position={[5*spread,     2, -5*spread]}   dimensions={[3,2,3]} name="small-island 1" />

            <GrassyBox position={[-3.5*spread,   0,   0]}          dimensions={[6,2,4]} name="BIG-island" />
            <GrassyBox position={[-3.5*spread,  -1.2,   4.5]}      dimensions={[5,3,5]} name="BIG-island" />

            <GrassyBox position={[-7*spread,    0, -6.8*spread]} dimensions={[3,2,3]} name="small-island 2" />

            <GrassyBox position={[3.25*spread, 0, -6.5*spread]} dimensions={[3,2,3]} name="small-island 3" />
            
        </group>
    )
}
