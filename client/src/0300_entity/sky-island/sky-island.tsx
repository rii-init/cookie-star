import { ReactNode } from "react";
import { Entity } from "..";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { Tree } from "./tree";
import { MagnetServer } from "../../0700_life/system/magnet.system";
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

            { /* secret islands (kind of) */ }
            <GrassyBox position={[-9*spread,     3, -16*spread]}   dimensions={[3,2,3]} name="secret-island 1" />
            <GrassyBox position={[-4*spread,     2, -12*spread]}   dimensions={[4,2,3]} name="secret-island 2" />
            <GrassyBox position={[-5*spread,     1, -10*spread]}   dimensions={[3,3,4]} name="secret-island 3" />
            
            
            <GrassyBox position={[5*spread,     2, -5*spread]}   dimensions={[3,2,3]} name="small-island 1" />

            <GrassyBox position={[-3.5*spread,  0,  0]}          dimensions={[6,2,4]} name="BIG-island" />

            <GrassyBox position={[-7*spread,    0, -6.8*spread]} dimensions={[3,2,3]} name="small-island 2" />

            <GrassyBox position={[3.25*spread, 0, -6.5*spread]} dimensions={[3,2,3]} name="small-island 3" />
            
        </group>
    )
}
