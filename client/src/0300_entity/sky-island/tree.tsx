import { ReactNode } from "react";
import { Entity } from "..";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";

export interface TreeProps {
    children?: ReactNode
    position: [number, number, number],
    rotation: [number, number, number]
}

export const Tree = (props: TreeProps) => {
    console.log("🌳 Tree!!", props);
    
    return (
        <Entity position={props.position} rotation={props.rotation} editMode={true}>
            {/* tree trunk */}
            <mesh position={[0,0.5,0]}>
                <boxGeometry args={[1,5.8,1]} />
                <meshLambertMaterial color={SyntaxHighlight.Manifold} />
            </mesh>
            {/* tree top */}
            <group>
                {/* <mesh position={[0,4,0]} rotation={[Math.PI/-3, Math.PI/-3,0]}>
                    <boxGeometry args={[1,4,1]} />
                    <meshLambertMaterial color={SyntaxHighlight.Manifold} />
                </mesh> */}
                <mesh position={[0.5,5,0.75]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <boxGeometry args={[1,4,1]} />
                    <meshLambertMaterial color={SyntaxHighlight.Manifold} />
                </mesh>
                <mesh position={[-0.5,5,-0.75]} rotation={[Math.PI/-6, Math.PI/-6,0]}>
                    <boxGeometry args={[1,4,1]} />
                    <meshLambertMaterial color={SyntaxHighlight.Manifold} />
                </mesh>
            </group>
            <group>
                {/* Canopy */}
                <mesh position={[-2,4,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2,4,4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[-2,4,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2,4,4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[1,5,-2]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2,4,4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[1,5,2]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2,4,4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[-0.5,6,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2,4,4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[0.4,6,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2,4,4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
            </group>
        </Entity>
    )
}