import { Html, Text } from "@react-three/drei";
import { Interactive, XRInteractionEvent } from "@react-three/xr";
import React, { useState } from "react";
import { Mesh } from "three";
import { useLocation, Link } from "wouter";
import { Universe } from "../../../0000_concept/universe";
import { TextH3 } from "../typography/h3";


export interface LinkSurfaceProps {
    location: string;
    current:  string;
    children: React.ReactNode;
}

export const LinkSurface = (props: LinkSurfaceProps) => {
    const [location, setLocation] = useLocation();
    const meshRef = React.useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    return (
        <Interactive onSelect={(event: XRInteractionEvent) => {
                                setLocation(props.location);  
                              }}
                     onHover={(event: XRInteractionEvent) => {
                        setHovered(true);                    
                     }}
                     onBlur={(event: XRInteractionEvent) => {
                        setHovered(false);
                     }}
        >
        <group className="navigation" 
                 onClick={() => setLocation(props.location)}
           onPointerOver={() => Universe.user_controls.handlePointerOver(meshRef.current as any)}
            onPointerOut={() => Universe.user_controls.handleOverOut(meshRef.current as any)}
      
        >
            <mesh ref={meshRef} visible={props.current == props.location || hovered} >
                <boxBufferGeometry args={[0.5,0.5,0.5]} />
                <meshLambertMaterial color={hovered 
                            ? Universe.colors.accent3
                            : Universe.colors.background2} />
            </mesh>
            <TextH3 position={[0,-0.1,0.4]} >
                {props.children}
            </TextH3>
        </group>
        </Interactive>
    );
}