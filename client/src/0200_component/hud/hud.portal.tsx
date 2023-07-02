import { createPortal } from "@react-three/fiber";
import { Cursor, CursorProps } from "./cursor";
import { useEffect, useState } from "react";
import { Object3D } from "three";

import { Universe } from "../../0000_concept/universe";
import { BehaviorSubject } from "rxjs";

export interface Resource { something: string };

export interface HudPortalProps {
    renderHudComponent: () => JSX.Element;
    parent: BehaviorSubject<Object3D | null>;
}

export function HudPortal(props: HudPortalProps): any {
    const [target, setTarget] = useState<Object3D | null>(null)
  
    useEffect(() => {
        const subscription = props.parent.subscribe((v) => {
        
            if (v) {
                setTarget(v);
            }
        
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [])
  
    const HudComponent = props.renderHudComponent();

    return (
        <>
            {target ? createPortal(HudComponent, target)
                    : null
            }
        </>
    );
}