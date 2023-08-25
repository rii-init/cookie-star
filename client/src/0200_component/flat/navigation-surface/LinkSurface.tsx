import { Html, Text } from "@react-three/drei";
import { Interactive, XRInteractionEvent } from "@react-three/xr";
import React, { useState } from "react";
import { Mesh } from "three";
import { useLocation, Link } from "wouter";
import { Universe } from "../../../0000_concept/universe";
import { TextH3 } from "../typography/h3";


export interface LinkSurfaceProps {
    location:  string;
    position?:     [number, number, number];
    linkShape?:    [number, number, number];
    linkPosition?: [number, number, number];
    children:  React.ReactNode;
}

export const LinkSurface = (props: LinkSurfaceProps) => {
    const [location, setLocation] = useLocation();
    
    const clickLink = (location: string) => {
        if (location.startsWith("http")) {
            // open in new tab
            window.open(location, "_blank");
        } else {
            setLocation(location);
        }
    }
    
    const meshRef = React.useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);

    return (
        
        <group  className="navigation" 
                position={props.position || [0,0,0]}
                onClick={() => { 
                   clickLink(props.location);
                }}
        >
            <Interactive onSelect={(event: XRInteractionEvent) => { clickLink(props.location); }}
                     onHover={(event: XRInteractionEvent) => { setHovered(true);   }}
                     onBlur={(event: XRInteractionEvent) => {  setHovered(false); }}
            >
                <mesh ref={meshRef}
                    position={props.linkPosition || [0, 0,-0.6]} 
                    visible={location == props.location || hovered} >
                    <boxGeometry args={props.linkShape || [0.5,0.5,0.5]} />
                    <meshLambertMaterial color={hovered 
                                ? Universe.colors.accent3
                                : Universe.colors.background2} />
                </mesh>
                <TextH3 onPointerOver={() => { 
                            setHovered(true);
                            Universe.user_controls.handlePointerOver(meshRef.current as any) } }
                        onPointerOut={() => {
                            setHovered(false);
                            Universe.user_controls.handlePointerOut(meshRef.current as any) } } >
                    {props.children}
                </TextH3>
            </Interactive>
        </group>
        
    );
}