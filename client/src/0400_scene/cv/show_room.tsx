import { useEffect, useLayoutEffect } from "react"
import { Universe }    from "../../0000_concept/universe"
import { Sequence }    from "../../0100_element/200_sequence/sequence"

import { TextH1 }      from "../../0200_component/flat/typography/h1"
import { GroupMain }   from "../../0200_component/flat/typography/main"
import { TextSpan }    from "../../0200_component/flat/typography/span"

import { Atmosphere }  from "../../0300_entity/atmosphere/atmosphere"
import { GridOctaves } from "../../0300_entity/grid-octaves"

export const Show_room = () => {

	useEffect(() => {
		Universe.user_controls.track.setCameraPosesToDefault();
	}, [])

    return (
        <>
            <TextH1 position={[0,2.4,-1.5]} >Timeline</TextH1>
    
            <GroupMain>
				<Atmosphere />
				<GridOctaves />

				<Sequence direction="z" polarity={-1} itemPadding={1}
						  buffer={{ size: 16 }}
						  afterItem={(position: [number, number, number], 
							             scale: [number, number, number], 
								     direction: "x" | "y" | "z") => {
							  return (
								  <mesh position={[position[0], position[1]+0.25, position[2]]} scale={scale}>
									  <boxBufferGeometry attach="geometry" args={[2,0.25,0.1]}/>
									  <meshLambertMaterial attach="material" 
									                        color={Universe.colors.background2} 
									 				  transparent={true}
														  opacity={0.5}
									  />
								  </mesh>
							  )
						  }}>
				
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
						<TextSpan>Ultr7A.com was born at some point.</TextSpan>
						<TextSpan>From a young age, they were fascinated</TextSpan>
						<TextSpan>with water, pipes, electricity and wires.</TextSpan>
			        {/* </Sequence> */}
                            
					{/* <Sequence direction="y" polarity={-1} itemPadding={-0.5}> */}
                    	<TextSpan>Ultr7A later took an interest in</TextSpan>
                    	<TextSpan>programming, gamedev, webdev, and visual arts.</TextSpan>
						<TextSpan> </TextSpan>
					{/* </Sequence> */}
                            
			    	{/* <Sequence direction="y" polarity={-1} itemPadding={-0.5}> */}
		        		<TextSpan>They went on to work for numerous startups, </TextSpan>
                	    <TextSpan>including Redeam and Mindbridge AI.</TextSpan>
		        	{/* </Sequence>                 */}
		               
					<TextSpan>** Singularity **</TextSpan>
                
		    	</Sequence>
			</GroupMain>
        </>
    )
}
