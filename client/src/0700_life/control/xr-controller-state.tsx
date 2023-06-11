import { Group } from "three";
import { xRControllerState } from "./climbing-controls";
import { Universe } from "../../0000_concept/universe";


export function setXRControllerBaseMatrixFromInputSources(inputSources: any) {
    for (const source in inputSources) { 
        xRControllerState.handedness[inputSources[source].handedness as "left" | "right" | "none"].baseMatrix 
                                   = inputSources[source].gripSpace.baseMatrix;
    }
}

export function XRControllerState({ session, player  }: { session: any, player: Group | null }) {

    // Universe.user_controls.xr_player = player;

    // setXRControllerBaseMatrixFromInputSources(session.inputSources);
    
    return <></>;
}