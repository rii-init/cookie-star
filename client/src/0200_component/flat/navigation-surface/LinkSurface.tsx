import { Interactive, XRInteractionEvent } from "@react-three/xr";
import React, { useState, useEffect } from "react";
import { Mesh } from "three";
import { useLocation } from "wouter";
import { TextH3 } from "../typography/h3";
import { LinkSurfaceFeedback } from "./LinkSurfaceFeedback";
import { systems } from "../../../0700_life/system";


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

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (hovered) {
            timer = setTimeout(() => {
                clickLink(props.location);
            }, 500);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [hovered, props.location]);

    return (
        
        <group  name="navigation"
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
                    }}
            >
                <LinkSurfaceFeedback 
                    position={props.linkPosition || [0,0,0]}
                    location={props.location}
                    currentLocation={location}
                    hovered={hovered}
                    linkPosition={linkPosition}
                />
                
                <TextH3 meshRef={meshRef}
                        justify={props.justify}
                        onPointerOver={() => { 
                            if (!hovered) {
                                setHovered(true);
                            }
                            systems.byComponent.UserControls?.handlePointerOver(meshRef.current as any) } }
                        onPointerOut={() => {
                            setHovered(false);
                            systems.byComponent.UserControls?.handlePointerOut(meshRef.current as any) } } >
                    {props.children}
                </TextH3>
            </Interactive>
        </group>
    );
}
        