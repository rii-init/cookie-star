import { Html, Text } from "@react-three/drei";
import { Interactive, XRInteractionEvent } from "@react-three/xr";
import React, { useState } from "react";
import { Mesh } from "three";
import { useLocation, Link } from "wouter";
import { Universe } from "../../../0000_concept/universe";
import { TextH3 } from "../typography/h3";


export interface LinkSurfaceProps {
    location:  string;
    current:   string;
    position?:     [number, number, number];
    linkShape?:    [number, number, number];
    linkPosition?: [number, number, number];
    children:  React.ReactNode;
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
                 onClick={() => { 
                    if (props.location.startsWith("http")) {
                        // open in new tab
                        window.open(props.location, "_blank");
                    } else {
                        setLocation(props.location);
                    }
                    
                 }}
        >
            <mesh ref={meshRef}
                  position={props.linkPosition || [0, 0,-0.6]} 
                  visible={props.current == props.location || hovered} >
                <boxBufferGeometry args={props.linkShape || [0.5,0.5,0.5]} />
                <meshLambertMaterial color={hovered 
                            ? Universe.colors.accent3
                            : Universe.colors.background2} />
            </mesh>
            <TextH3 position={props.position || [0,0,0]} 
                    onPointerOver={() => { 
                        setHovered(true);
                        Universe.user_controls.handlePointerOver(meshRef.current as any) } }
                    onPointerOut={() => {
                        setHovered(false);
                        Universe.user_controls.handlePointerOut(meshRef.current as any) } } >
                {props.children}
            </TextH3>
        </group>
        </Interactive>
    );
}