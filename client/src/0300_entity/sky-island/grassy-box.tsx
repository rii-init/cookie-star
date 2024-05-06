import { Entity } from ".."
import { UwUid } from "../../0000/util"
import { MagnetServer } from "../../0700_life/system/magnet.system"
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"

export interface GrassyBoxProps {
    position:    [number, number, number]
    dimensions?: [number, number, number]
    name?:        string
    children?:    React.ReactNode
}

export const GrassyBox = (p: GrassyBoxProps) => {
    return (
        <Entity position={p.position} name={"grassy-box"+UwUid()}>
                <boxGeometry         attach="geometry"    args={p.dimensions || [3,2,3]} />
                <meshLambertMaterial attach="material-0" color={0xdfffa0} />
                <meshLambertMaterial attach="material-1" color={0xdfffa0} />
                <meshLambertMaterial attach="material-2" color={SyntaxHighlight.Structure} />
                <meshLambertMaterial attach="material-3" color={0xdfffa0} />
                <meshLambertMaterial attach="material-4" color={0xdfffa0} />
                <meshLambertMaterial attach="material-5" color={0xdfffa0} />
                <MagnetServer />
                { p.children }
        </Entity>
    )
}