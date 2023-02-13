import { useLayoutEffect } from "react";
import { Universe } from "../../0000_concept/universe";
import { Sequence } from "../../0100_element/200_sequence/sequence";
import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextH1 } from "../../0200_component/flat/typography/h1";
import { GroupMain } from "../../0200_component/flat/typography/main";
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere";

export let Conference_centre = () => {

	Universe.user_controls.track.setCameraPosesToDefault();
	
    return (
        <group>
            <TextH1 position={[0,2.4,-1.5]}>Hi</TextH1>
            <GroupMain>
                <Sequence direction="z" polarity={-1}>
                    <TextDiv>
                        My name is ultr7a.com 
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
                        I like to make sounds here.
                        I love attaching things to stuff.
                    </TextDiv>    
                </Sequence>
            </GroupMain>
	    <Atmosphere />
        </group>       
    );
}

/* <Html><a href="https://github.com/ultr7A">things</a></Html> */
/* <Html><a href="https://soundcloud.com/ultr7a">here</a></Html> */
