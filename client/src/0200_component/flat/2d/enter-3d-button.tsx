import { Universe } from "../../../0000_concept/universe";

export interface Enter3DProps {
    className: string,
    controllersAttached: boolean
}

export const Enter3DButton = (props: Enter3DProps) => {
    return (
        <button style={{ 
            display: props.controllersAttached 
                    ? "none" : "inline-block",
                    pointerEvents: "none"
                }}
                className={props.className} onClick={() => {
            console.log("Enter 3D button clicked");
        }}>
            Enter 3D
        </button>
    )
}
