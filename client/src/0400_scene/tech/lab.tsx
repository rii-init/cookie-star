import { Sequence } from "../../0100_element/200_sequence/sequence"
import { DemoVolume }   from "../../0200_component/flat/vector/DemoVolume"
import { LabelSurface } from "../../0200_component/flat/scalar/LabelSurface"
import { TableOfContentsSurface } from "../../0200_component/flat/vector/TableOfContentsSurface"
import { GridOctaves } from "../../0300_entity/grid-octaves"
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere"
import { TextH1 } from "../../0200_component/flat/typography/h1"
import { GroupMain } from "../../0200_component/flat/typography/main"
import { Universe } from "../../0000_concept/universe"
import { Group, Vector3 } from "three"
import { useEffect } from "react"
export const Lab = () => {

    Universe.user_controls.track.setCameraPoses([
        { position: new Vector3( 0,    2, 4), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3( 0.25, 1, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3(-0.25,-2, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3( 0.25,-3, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3(-0.25,-4, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3( 0.25,-5, 3), target: new Vector3( 0,  2,  -22) },
    ])    

    return (
        <>
            <TextH1 position={[0,2.4,-1.5]}>Lab</TextH1>
	    <GroupMain>
		<group>
                <TableOfContentsSurface>
                    <group>
                        <LabelSurface>N0TE8</LabelSurface>
                    </group>
                    
                    <group>
                        <LabelSurface>MXT8P</LabelSurface>
                    </group>
                    
                    <group>
                        <LabelSurface>NCODE</LabelSurface>
                    </group>

                    <group>
                        <LabelSurface>5HDDR</LabelSurface>
                    </group>
                    
                    <group>
                        <LabelSurface>RETRO</LabelSurface>
                    </group>
                    
                    <group>
                        <LabelSurface>OVRWRLD</LabelSurface>
                    </group>

                    <group>
                        <LabelSurface>ECSLANG</LabelSurface>
                    </group>
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
