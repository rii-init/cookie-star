import { ReactNode } from "react";
import { Entity } from "..";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { RotationOrigin } from "../../0100_element/000_point/rotation-origin";
import { Editable } from "../../0700_life/system/editable.system";

export interface TreeProps {
    children?: ReactNode
    position: [number, number, number],
    rotation: [number, number, number]
}

export const Tree = (props: TreeProps) => {
    
    return (
        <Entity position={props.position} rotation={props.rotation}>
            
            {/* tree trunk */}
            <mesh position={[0,0.5,0]}>
                <cylinderGeometry args={[0.5,0.5,5.8]} />
                <meshLambertMaterial color={SyntaxHighlight.Manifold} />
            </mesh>
            
            {/* tree branches */}
            <RotationOrigin key={0} rotation={[-Math.PI * 0.7,0,0]} origin={[0, -2, 0]}>
                <mesh position={[0,3,0]}>
                    <cylinderGeometry args={[0.5, 0.5, 4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Manifold} />
                </mesh>
            </RotationOrigin>
            <RotationOrigin key={1} rotation={[Math.PI * 0.7, 0,0]} origin={[0, -2, 0]}>
                <mesh position={[0,3,0]}>
                    <cylinderGeometry args={[0.5, 0.5, 4]} />
                    <meshLambertMaterial color={SyntaxHighlight.Manifold} />
                </mesh>
            </RotationOrigin>

            {/* Canopy */}
            <group>
                <mesh position={[-2,4,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2, 12, 12]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[1,5,-2]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2, 12, 12]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[1,5,2]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2, 12, 12]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[-0.5,6,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2, 12, 12]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
                <mesh position={[0.4,6,0]} rotation={[Math.PI/6, Math.PI/6,0]}>
                    <sphereGeometry args={[2, 12, 12]} />
                    <meshLambertMaterial color={SyntaxHighlight.Structure} />
                </mesh>
            </group>
            <Editable />
        </Entity>
    )
}