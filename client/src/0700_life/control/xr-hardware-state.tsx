import { Group } from "three";
import { ClimbingControls } from "./climbing-controls";
import { useEffect } from "react";
import { Universe } from "../../0000_concept/universe";

export const XRHardwareState = (p: { player: Group }) => {

    useEffect(() => {
        Universe.user_controls.xr_player = p.player;
    }, [p.player])

    return (
        <>
        </>
    );
}