import { useEffect } from "react"
import { Universe }    from "../../0000_concept/universe"
import { Sequence }    from "../../0100_element/200_sequence/sequence"

import { TextH1 }      from "../../0200_component/flat/typography/h1"
import { GroupMain }   from "../../0200_component/flat/typography/main"
import { TextSpan }    from "../../0200_component/flat/typography/span"

import { Atmosphere }  from "../../0300_entity/atmosphere/atmosphere"
import { Vector3 } from "three"

export const Show_room = () => {

	useEffect(() => {
        Universe.user_controls.track.setCameraPoses([
            { position: new Vector3( 0,    0,    4), target: new Vector3( 0,  4,  -22) },
            { position: new Vector3( 0.25, 1,    0), target: new Vector3( 0,  4,  -22) },
            { position: new Vector3(-0.25, 1.5, -2), target: new Vector3( 0,  4,  -22) },
            { position: new Vector3( 0.25, 3,   -4), target: new Vector3( 0,  4,  -22) },
            { position: new Vector3(-0.25, 5,   -6), target: new Vector3( 0,  4,  -22) },
            { position: new Vector3( 0.25, 9,   -10), target: new Vector3( 0,  4,  -22) },
        ])
    }, [])
	
    return (
        <>
            <TextH1 position={[0,2.6,-1.5]} >Timeline</TextH1>
    
            <GroupMain>
				<Atmosphere />

				<Sequence direction="z" polarity={-1} itemPadding={0.5}
					      xRotationFunction={(index: number) => Math.PI / -2}		
						  buffer={{ size: 16 }}
						  rotation={[Math.PI / 8, 0, 0]}
				>
					<TextSpan>
                	   Everyone has a story.
					</TextSpan>
					<TextSpan>
					   This is mine.
					</TextSpan>
					<TextSpan>
					   In the beginning, the universe exploded,
					   and intelligent life emerged.
					</TextSpan>
				
					{/* <Sequence direction="y" polarity={-1} itemPadding={-0.5}> */}
						<TextSpan>Haven Darkmoon was born at some point.</TextSpan>
						<TextSpan>From a young age, they were fascinated</TextSpan>
						<TextSpan>with water, pipes, electricity and wires.</TextSpan>
			        {/* </Sequence> */}
                            
					{/* <Sequence direction="y" polarity={-1} itemPadding={-0.5}> */}
                    	<TextSpan>Haven later took an interest in</TextSpan>
                    	<TextSpan>programming, gamedev, webdev, and visual arts.</TextSpan>
						<TextSpan> </TextSpan>
					{/* </Sequence> */}
                            
			    	{/* <Sequence direction="y" polarity={-1} itemPadding={-0.5}> */}
		        		<TextSpan>They went on to work for numerous startups, </TextSpan>
                	    <TextSpan>including Redeam and Mindbridge AI.</TextSpan>
		        	{/* </Sequence>                 */}
		               
					<TextSpan>** Singularity **</TextSpan>

					{/* <LinkSurface location="/cv/ultr7a.cv.pdf" current={""}>[(Download PDF)]</LinkSurface> */}
                
		    	</Sequence>
			</GroupMain>
        </>
    )
}
