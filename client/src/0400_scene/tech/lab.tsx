import { Sequence } from "../../0100_element/200_sequence/sequence"
import { LabelSurface } from "../../0200_component/flat/LabelSurface"

export const lab = () => {
    return (
        <>
            <h1>Lab</h1>
            <main>
                <Sequence direction={"x"}>
                    <LabelSurface>N0TE8</LabelSurface>
                    <LabelSurface>5HDDR</LabelSurface>
                    <LabelSurface>RETRO</LabelSurface>
                    <LabelSurface>MXT8P</LabelSurface>
                </Sequence>
            </main>
        </>
    )
}