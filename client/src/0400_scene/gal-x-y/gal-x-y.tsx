import { useEffect, useLayoutEffect } from "react"
import { Universe }    from "../../0000_concept/universe"
import { Sequence }    from "../../0100_element/200_sequence/sequence"

import { TextH1 }      from "../../0200_component/flat/typography/h1"
import { GroupMain }   from "../../0200_component/flat/typography/main"
import { TextSpan }    from "../../0200_component/flat/typography/span"

import { Atmosphere }  from "../../0300_entity/atmosphere/atmosphere"
import { GridOctaves } from "../../0300_entity/grid-octaves"

export const show_room = () => {
	
	Universe.user_controls.track.setCameraPosesToDefault();
	
    return (
        <>
            <TextH1 position={[0,2.4,-1.5]} >Timeline</TextH1>
    
            <GroupMain>
				<Atmosphere />
				<GridOctaves />

				<Sequence direction="z" polarity={-1} itemPadding={1}
						  buffer={{ size: 16 }}
				>
				
					<TextSpan>
                     🌠 G A L X Y
					</TextSpan>
					
		    	</Sequence>
			</GroupMain>
        </>
    )
}
