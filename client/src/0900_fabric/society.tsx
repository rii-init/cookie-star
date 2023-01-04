import { useFrame } from "@react-three/fiber"
import { Children } from "react"
import { Universe } from "../0000_concept/universe"
import { Living } from "../0700_life/living"

export interface SocietalProps {
    children: React.ReactNode // you and your  friends
    networkPriority?: number  // let the movie begin
}

// It takes 2 to UwU
export const Society = (props: SocietalProps) => {
    useFrame(() => {
        const citizens = Children.toArray(props.children)
        Universe.net_transport.onEvent((evt: any) => {
            for (let idx = citizens.length; idx > -1; idx --) {
                // look up living being from lifeform
                // update lifeform
            }
        })
    }, props.networkPriority)
    return (
        <>
            { props.children }
        </>
    )
}