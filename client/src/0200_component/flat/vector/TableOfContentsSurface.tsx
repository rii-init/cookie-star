import { ReactNode } from "react"
import { Sequence } from "../../../0100_element/200_sequence/sequence"
export interface TableOfContentsSurfaceProps {
    children: ReactNode
}

export const TableOfContentsSurface = (props: TableOfContentsSurfaceProps) => {
    return (
        <Sequence direction="y" polarity = {-1}>
            { props.children }
        </Sequence>
    )
}