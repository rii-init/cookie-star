import { createContext } from "react";
import { Universe } from "../../0000_concept/universe";
import { CameraTrack } from "../../0700_life/control/track/camera-track";

export interface ScrollingBufferProps {
    children: React.ReactNode;
}

export const ScrollingBufferContext = createContext<any>(null);

export function ScrollingBuffer(props: ScrollingBufferProps) {
    return (
        <ScrollingBufferContext.Provider value={Universe.user_controls.track}>
            {props.children}
        </ScrollingBufferContext.Provider>
    );
}