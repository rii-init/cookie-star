import { Html, Text } from "@react-three/drei";
import { Interactive, XRInteractionEvent } from "@react-three/xr";
import React, { useState } from "react";
import { Mesh } from "three";
import { useLocation, Link } from "wouter";
import { Universe } from "../../../0000_concept/universe";
import { TextH3 } from "../typography/h3";
import { TextDebug } from "../typography/text-debug";
import { LinkSurfaceFeedback } from "./LinkSurfaceFeedback";


export interface LinkSurfaceProps {
    location:  string;
    position?:     [number, number, number];
    linkShape?:    [number, number, number];
    linkPosition?: [number, number, number];

    justify?: "left" | "center" | "right";

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
    
    const linkPosition = props.linkPosition || [0,0, -0.35];

    if (hovered) {
        linkPosition[2] = -0.75;
    }

    // function hoverAnimation() {

    //     setHoverAnimationScale(hover_animation_scale + 0.01);

    //     if (hover_animation_scale >= 2.0) {
    //         clickLink(props.location);

    //     } else if (hovered) {
    //         setTimeout(() => {
    //             hoverAnimation();
    //         }, 9);
    //     }
    // }

    return (
        
        <group  className="navigation" 
                position={props.position || [0,0,0]}
                onClick={() => { 
                   clickLink(props.location);
                }}
        >
            <Interactive onSelect={(event: XRInteractionEvent) => { clickLink(props.location); }}
                    onHover={(event: XRInteractionEvent) => {  
                       setHovered(true);
                    }}
                     onBlur={(event: XRInteractionEvent) => {  
                        setHovered(false); 
                        //setHoverAnimationScale(1.0);
                    }}
            >
                <LinkSurfaceFeedback 
                    position={props.linkPosition || [0,0,0]}
                    location={props.location}
                    currentLocation={location}
                    hovered={hovered}
                    linkShape={props.linkShape}
                    linkPosition={linkPosition}
                >
                </LinkSurfaceFeedback>
                <TextH3 meshRef={meshRef}
                        justify={props.justify}
                        onPointerOver={() => { 
                            if (!hovered) {
                                setHovered(true);
                                //hoverAnimation();
                            }
                            Universe.user_controls.handlePointerOver(meshRef.current as any) } }
                        onPointerOut={() => {
                            setHovered(false);
                            // setHoverAnimationScale(1.0);
                            Universe.user_controls.handlePointerOut(meshRef.current as any) } } >
                    {props.children}
                </TextH3>
            </Interactive>
        </group>
        
    );
}