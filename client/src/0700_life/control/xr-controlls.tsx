import { useXR } from "@react-three/xr";
import { XRHardwareState } from "./xr-hardware-state";
import { useEffect } from "react";
import { ClimbingControls } from "./climbing-controls";

export const XRControlls = () => {

    const { player, isPresenting } = useXR();

    return (
        <>
            <ClimbingControls />
            { isPresenting && <XRHardwareState player={player} /> }
        
        </>
    )

}