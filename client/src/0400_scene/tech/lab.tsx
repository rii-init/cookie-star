import { Html } from "@react-three/drei"
import { Sequence } from "../../0100_element/200_sequence/sequence"
import { DemoVolume }   from "../../0200_component/flat/vector/DemoVolume"
import { LabelSurface } from "../../0200_component/flat/scalar/LabelSurface"
import { TableOfContentsSurface } from "../../0200_component/flat/vector/TableOfContentsSurface"

export const lab = () => {
    return (
        <>
            <Html><h1>Lab</h1></Html>
            <group>
                <TableOfContentsSurface>
                    <LabelSurface>N0TE8</LabelSurface>
                    <LabelSurface>MXT8P</LabelSurface>
                    <LabelSurface>NCODE</LabelSurface>
                    <LabelSurface>5HDDR</LabelSurface>
                    <LabelSurface>RETRO</LabelSurface>
                    <LabelSurface>OVRWRLD</LabelSurface>
                    <LabelSurface>ECSLANG</LabelSurface>
                </TableOfContentsSurface>
                <group>
                    <Sequence direction="y">
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

                    </Sequence>
                </group>
                               
            </group>
        </>
    )
}