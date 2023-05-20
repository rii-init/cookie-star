import { useLayoutEffect } from "react";
import { Text } from "@react-three/drei";

import { Universe } from "../../0000_concept/universe";
import { Sequence } from "../../0100_element/200_sequence/sequence";
import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextH1 } from "../../0200_component/flat/typography/h1";
import { GroupMain } from "../../0200_component/flat/typography/main";
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere";
import { LinkSurface } from "../../0200_component/flat/scalar/LinkSurface";
import { TextSpan } from "../../0200_component/flat/typography/span";

export let Conference_centre = () => {

	Universe.user_controls.track.setCameraPosesToDefault();
	
    return (
        <group>
            <TextH1 position={[0,2.6,-1.5]}>Hi</TextH1>
            <GroupMain>
                <Sequence direction="z" polarity={-1}>
                    <TextDiv>
                        My name is Haven Darkmoon 
                    </TextDiv>
                    
                    <TextDiv>    
                        Let's chat!
                    </TextDiv>
                    
                    <TextDiv>    
                        Send funny questions to ultr7a@gmail.com
                    </TextDiv>

                    <TextDiv>    
                        I'll answer them as a song ♫
                    </TextDiv>

                    <TextDiv>    
                        Follow me on Twitter @ultr7A
                    </TextDiv>
                    
                    <TextDiv>
                        <Sequence direction="x" polarity={1} itemPadding={ 0.35 } >
                            <TextSpan>I like to make sounds</TextSpan>
                            <LinkSurface current={""} 
                                         location="https://soundcloud.com/ultr7a">
                                here.
                            </LinkSurface>
                        </Sequence >        
                        <Sequence direction="x" polarity={1} itemPadding={ 0.45 } >
                            <TextSpan>I love attaching things to</TextSpan> 
                            <LinkSurface 
                                current={""} 
                                location="https://github.com/ultr7A">
                                    stuff
                            </LinkSurface>.
                        </Sequence>
                    </TextDiv>    
                </Sequence>
            </GroupMain>
	    <Atmosphere />
        </group>       
    );
}

/* <Html><a href="">things</a></Html> */
/* <Html><a href="">here</a></Html> */
