import { Html } from "@react-three/drei";
import React, { useState } from "react";
import { Mesh } from "three";
import { useLocation, Link } from "wouter";
import { Universe } from "../../../0000_concept/universe";


export interface LinkSurfaceProps {
    location: string;
    current:  string;
    children: React.ReactNode;
}

export const LinkSurface = (props: LinkSurfaceProps) => {
    const [location, setLocation] = useLocation();
    const meshRef = React.useRef<Mesh>(null);
    
    return (
        <group className="navigation" >
            <mesh ref={meshRef}
                  onClick={() => setLocation(props.location)}
                  onPointerOver={() => Universe.user_controls.handlePointerOver(meshRef.current as any)}
                  onPointerOut={ () => Universe.user_controls.handleOverOut(meshRef.current as any)}
                >
                <boxBufferGeometry args={[0.5,0.5,0.5]} />
                <meshLambertMaterial color={props.current == props.location 
                        ? Universe.colors.accent2 
                        : Universe.colors.background} />
            </mesh>
            <Html className="navigation-link"
                  occlude
                  style={{
                    transition: 'all 0.2s',
                  }}
                    position={[-0.1,0,0.45]}
            >
                <a className={ props.current == props.location ? "active" : "" }>
                    {props.children}
                </a>
            </Html>
        </group>
    );
}