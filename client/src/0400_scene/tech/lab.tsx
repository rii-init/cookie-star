import { Sequence } from "../../0100_element/200_sequence/sequence"
import { LabelSurface } from "../../0200_component/flat/LabelSurface"
import { TableOfContentsSurface } from "../../0200_component/flat/TableOfContentsSurface"

export const lab = () => {
    return (
        <>
            <h1>Lab</h1>
            <main>
                <TableOfContentsSurface>
                    <LabelSurface>N0TE8</LabelSurface>
                    <LabelSurface>5HDDR</LabelSurface>
                    <LabelSurface>RETRO</LabelSurface>
                    <LabelSurface>MXT8P</LabelSurface>
                </TableOfContentsSurface>
            </main>
        </>
    )
}