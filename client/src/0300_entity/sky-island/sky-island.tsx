import { ReactNode } from "react";
import { Entity } from "..";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { Tree } from "./tree";
import { MagnetServer } from "../../0700_life/system/magnet.system";

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
            
            <Entity position={[5*spread, 2, -5*spread]} name="small-island 1">
                <boxGeometry         attach="geometry"    args={[3,2,3]} />
                <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                <MagnetServer />
                
            </Entity>
            
            <Entity position={[-3.5*spread, 0, 0*spread]} name="BIG-island">
                <boxGeometry         attach="geometry"    args={[6,2,4]} />
                <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                <MagnetServer />

            </Entity>
            
            <Entity position={[-7*spread, 0, -6.8*spread]} name="small-island 2">
                <boxGeometry         attach="geometry"    args={[3,2,3]} />
                <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                <MagnetServer />
                
                <Tree rotation={[0, -1.5/3*Math.PI, 0]} position={[0, 1.5, 0]} />
            </Entity>
            
            
            <Entity position={[3.25*spread, 0, -6.5*spread]} name="small-island 3">
                <boxGeometry         attach="geometry"    args={[3,2,3]} />
                <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                <MagnetServer />
            </Entity>

        </group>
    )
}
