import { Sequence } from "../../0100_element/200_sequence/sequence"
import { DemoVolume } from "../../0200_component/flat/DemoVolume"
import { LabelSurface } from "../../0200_component/flat/LabelSurface"
import { TableOfContentsSurface } from "../../0200_component/flat/TableOfContentsSurface"

export const lab = () => {
    return (
        <>
            <h1>Lab</h1>
            <main>
                <TableOfContentsSurface>
                    <LabelSurface>N0TE8</LabelSurface>
                    <LabelSurface>MXT8P</LabelSurface>
                    <LabelSurface>NCODE</LabelSurface>
                    <LabelSurface>5HDDR</LabelSurface>
                    <LabelSurface>RETRO</LabelSurface>
                    <LabelSurface>OVRWRLD</LabelSurface>
                    <LabelSurface>ECSLANG</LabelSurface>
                </TableOfContentsSurface>
                <DemoVolume name="N0TE8">

                </DemoVolume>
                <DemoVolume name="MXT8P">
                    
                </DemoVolume>
                <DemoVolume name="NCODE">
                    
                </DemoVolume>
                <DemoVolume name="5HDDR">
                    
                </DemoVolume>
                <DemoVolume name="RETRO">
                    
                </DemoVolume>
                <DemoVolume name="OVRWRLD">
                    
                </DemoVolume>
                <DemoVolume name="ECSLANG">
                    
                </DemoVolume>
                
            </main>
        </>
    )
}