import { ReactNode } from "react"

export interface DemoVolumeProps {
    children: ReactNode
}

export const DemoVolume = (props: DemoVolumeProps) => {
    return (
        <DemoVolume>
            {props.children}
        </DemoVolume>
    )   
}