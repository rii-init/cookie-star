import { useEffect, useLayoutEffect } from "react"
import { Universe } from "../../0000_concept/universe"
import { Sequence } from "../../0100_element/200_sequence/sequence"
import { TextH1 } from "../../0200_component/flat/typography/h1"
import { TextH2 } from "../../0200_component/flat/typography/h2"
import { GroupMain } from "../../0200_component/flat/typography/main"
import { TextP } from "../../0200_component/flat/typography/p"
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere"

export const Nature = () => {
	
	Universe.user_controls.track.setCameraPosesToDefault();

    return (
        <>
        <TextH1 position={[0,2.6,-1.5]} >Design Language</TextH1>
            <GroupMain>
                
                <Sequence direction="z" polarity={-1}>
                
			<TextH2 position={[0,0,0]} >Elements</TextH2>
                   
			<Sequence direction="y" polarity={-1}>
                    		<TextP>Simple, orthogonal, composable pieces</TextP>
		    		<TextP> make language robust and scalable.</TextP>
                	</Sequence>

                </Sequence>
               
		<Atmosphere />
     	    </GroupMain>
	</>
	);
}

