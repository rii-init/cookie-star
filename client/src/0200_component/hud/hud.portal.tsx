import { createPortal } from "@react-three/fiber";
import { Cursor, CursorProps } from "./cursor";
import { useEffect, useState } from "react";
import { Object3D } from "three";

import { Universe } from "../../0000_concept/universe";

export interface Resource { something: string };

export interface HudPortalProps extends CursorProps {
    
}

export function HudPortal(props: HudPortalProps): any {
    const [target, setTarget] = useState<Object3D | null>(null)
  
    useEffect(() => {
        // set(targets[1])
        const subscription = Universe.state.cursor.$parent.subscribe((v) => {
        
            if (v) {
                setTarget(v);
            }
        
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])
  
    return (
        <>
            {target ? createPortal(<Cursor position={props.position} hide={props.hide} />, target)
                    : null
            }
        </>
    );
}