import { ReactNode } from "react";
import { Entity } from "..";
import { magnetServer } from "../../0700_life/system/magnet.server";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { Tree } from "./tree";

export interface SkyIslandProps {
    children?: ReactNode
    position: [number, number, number]
    spread?: number // How far apart the islands are
}

export const SkyIsland = (p: SkyIslandProps) => {
    const spread = p.spread !== undefined ? p.spread : 1;

    return (
        <group position={p.position}>
            
            { p.children }
            
            
                <Entity editMode={true} position={[5*spread, 2, -5*spread]}>
                    <boxGeometry          attach="geometry" args={[3,2,3]} />
                    <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                    <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                    <magnetServer />
                </Entity>
            
            
            
                <Entity position={[-3.5*spread, 0, 0*spread]}>
                    <boxGeometry         attach="geometry" args={[6,2,4]} />
                    <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                    <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                    <magnetServer />
                </Entity>
            

            
                <Entity editMode={true} position={[-7*spread, 0, -6.8*spread]}>
                    <boxGeometry          attach="geometry" args={[3,2,3]} />
                    <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                    <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                    <magnetServer />
                    
                    <Tree rotation={[0, -1.5/3*Math.PI, 0]} position={[0, 1.5, 0]} />
                </Entity>
            
            
            <Entity editMode={true} position={[3.25*spread, 0, -6.5*spread]}>
                    <boxGeometry          attach="geometry" args={[3,2,3]} />
                    <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                    <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                    <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                    <magnetServer />

            </Entity>

        </group>
    )
}
