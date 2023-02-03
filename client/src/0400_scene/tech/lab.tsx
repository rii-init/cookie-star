import { Sequence } from "../../0100_element/200_sequence/sequence"
import { DemoVolume }   from "../../0200_component/flat/vector/DemoVolume"
import { LabelSurface } from "../../0200_component/flat/scalar/LabelSurface"
import { TableOfContentsSurface } from "../../0200_component/flat/vector/TableOfContentsSurface"
import { GridOctaves } from "../../0300_entity/grid-octaves"
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere"
import { DocumentScene } from "../../0300_entity/document.scene"
import { TextH1 } from "../../0200_component/flat/typography/h1"
import { GroupMain } from "../../0200_component/flat/typography/main"
import { Universe } from "../../0000_concept/universe"
import { Vector3 } from "three"

export const lab = () => {

    Universe.user_controls.track.setCameraPoses([
        { position: new Vector3(0,0,0), target: new Vector3(0,0,0) },
        { position: new Vector3(0,0,0), target: new Vector3(0,0,0) },
        { position: new Vector3(0,0,0), target: new Vector3(0,0,0) },
        { position: new Vector3(0,0,0), target: new Vector3(0,0,0) },
        { position: new Vector3(0,0,0), target: new Vector3(0,0,0) },
        { position: new Vector3(0,0,0), target: new Vector3(0,0,0) },
    ])

    return (
        <>
            <TextH1 position={[0,2.4,-1.5]}>Lab</TextH1>
	    <GroupMain>
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
                    <Sequence direction="z" polarity={-1}>
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
            <Atmosphere />
            <GridOctaves />
           </GroupMain>
        </>
    )
}
