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
import { TextSpan } from "../../0200_component/flat/typography/span"
import { LinkSurface } from "../../0200_component/flat/scalar/LinkSurface"
import { useLocation } from "wouter"
export const Lab = () => {

    Universe.user_controls.track.setCameraPoses([
        { position: new Vector3( 0,    2, 4), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3( 0.25, 1, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3(-0.25,-2, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3( 0.25,-3, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3(-0.25,-4, 3), target: new Vector3( 0,  2,  -22) },
        { position: new Vector3( 0.25,-5, 3), target: new Vector3( 0,  2,  -22) },
    ])    

    const [location, setLocation] = useLocation();

    return (
        <>
        <TextH1 position={[0,2.6,-1.5]}>Lab</TextH1>
	    <GroupMain>
		    <group>
                <Sequence direction="y" position={[-2, -4, 0]}>           

                    
                    <Sequence direction="x" itemPadding={2}>
                        <LabelSurface>NCODE</LabelSurface>
                        <Sequence direction="y" position={[0,+0.18, 0]}>                            
                            <LinkSurface location={"https://github.com/ultr7A/ncode"} current={location}>https://github.com/ultr7A/ncode</LinkSurface>
                        </Sequence> 
                    </Sequence>

                {/* <Sequence direction="x" itemPadding={2}>
                        <LabelSurface>CONVOLVR</LabelSurface>
                        <Sequence direction="y">
                            <LinkSurface location={"https://retro.ultr7a.com/convolvr"} current={location}>https://retro.ultr7a.com/convolvr</TextSpan>
                        </Sequence>
                    </Sequence> */}

                    <Sequence direction="x" itemPadding={2}>     
                        <LabelSurface>OVRWRLD</LabelSurface>
                        <Sequence direction="y" position={[0,+0.18, 0]}>
                            <LinkSurface location={"https://retro.ultr7a.com/ovrwrld"} current={location} >https://retro.ultr7a.com/ovrwrld</LinkSurface>
                        </Sequence>
                    </Sequence>

                    <Sequence direction="x" itemPadding={2}>
                        <LabelSurface>Meta.gl</LabelSurface>
                        <Sequence direction="y" position={[0,+0.18, 0]}>                            
                            <LinkSurface location="https://github.com/ultr7A/meta.gl" current={location}>https://github.com/ultr7A/meta.gl</LinkSurface>
                        </Sequence>
                    </Sequence> 

                    <Sequence direction="x" itemPadding={2}>
                        <LabelSurface>ECSLANG</LabelSurface>
                        <Sequence direction="y" position={[0,+0.18, 0]}>
                            <LinkSurface location="https://retro.ultr7a.com/ecslang" current={location}>https://retro.ultr7a.com/ecslang</LinkSurface>
                        </Sequence>
                    </Sequence>
                    
                    <Sequence direction="x" itemPadding={2}>
                        <LabelSurface>DATAHEXAGON</LabelSurface>
                        <Sequence direction="y" position={[0,+0.18, 0]}>
                            <LinkSurface location="https://retro.ultr7a.com/data" current={location}>https://retro.ultr7a.com/data</LinkSurface>
                        </Sequence>
                    </Sequence>
                    
                </Sequence>
            </group>
            <Atmosphere />
            <GridOctaves />
           </GroupMain>
        </>
    )
}
