import { Sequence } from "../../0100_element/200_sequence/sequence"
import { LabelSurface } from "../../0200_component/flat/label-surface/LabelSurface"

export const lab = () => {
    return (
        <>
            <h1>Tech</h1>
            <main>
                <Sequence direction={"x"}>
                    <LabelSurface>N0TE8  </LabelSurface>
                    <LabelSurface>5HTDDR </LabelSurface>
                    <LabelSurface>RETRO  </LabelSurface>
                    <LabelSurface>MIXTAPE</LabelSurface>
                </Sequence>
            </main>
        </>
    )
}