import { useState } from "react";
import { PerspectiveCamera } from "three";
import { Universe } from "../../0000_concept/universe";

export interface TeleportControlsProps {
    children?: React.ReactNode;
}


export function onSelect(intersects: any[]) {

}


export const TeleportControls = (props: TeleportControlsProps) => {
    const [cursorVisible, setCursorVisible] = useState(false);
    const [intersection, setIntersection] = useState(null);
    const camera = Universe.ctx3.camera;
    const controllers = Universe.xrControllers;

    function handleSelection(intersects: { point: any }[] ) {
        onSelect(intersects);
    }

    function previewTeleport() {
        setCursorVisible(true);
    }

    function cancelTeleport() {
        setCursorVisible(false);
    }

    return (
        <>
            {
                cursorVisible 
                ? ( 
                    <group>
                        <mesh>
                            <boxBufferGeometry args={[1, 1, 1]} />
                            <meshBasicMaterial color="red" />
                        </mesh>
                    </group>
                )
                : null
            }
        </>
    );
};