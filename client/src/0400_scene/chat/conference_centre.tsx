import { useEffect, useLayoutEffect } from "react";
import { Text } from "@react-three/drei";

import { Universe } from "../../0000_concept/universe";
import { Sequence } from "../../0100_element/200_sequence/sequence";
import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextH1 } from "../../0200_component/flat/typography/h1";
import { GroupMain } from "../../0200_component/flat/typography/main";
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere";
import { Vector3 } from "three";

export let Conference_centre = () => {

    useEffect(() => {
        Universe.user_controls.track.setCameraPoses([
            { position: new Vector3( 0,    2, 4), target: new Vector3( 0,  2,  -22) },
            { position: new Vector3( 0.25, 1, 3), target: new Vector3( 0,  2,  -22) },
            { position: new Vector3(-0.25,-2, 3), target: new Vector3( 0,  2,  -22) },
            { position: new Vector3( 0.25,-3, 3), target: new Vector3( 0,  2,  -22) },
        ])
    }, [])
	
    return (
        <group>
            <TextH1 position={[0,2.6,-1.5]}>Hi</TextH1>
            <GroupMain>
                <Sequence direction="y" polarity={-1} itemPadding={-0.4} >
                    <TextDiv>
                        My name is Haven Darkmoon 
                    </TextDiv>
                    
                    <TextDiv>    
                        Send funny questions to ultr7a@gmail.com
                    </TextDiv>

                    <TextDiv>    
                        I'll answer them as a song :) 
                    </TextDiv>

                    <TextDiv>    
                        Follow me on Twitter @ultr7A
                    </TextDiv>
                    
                    {/* <Sequence direction="y" position={[-0.35, 0, 0]} itemPadding={-0.35}>
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
                    </Sequence>     */}
                </Sequence>
            </GroupMain>
	    <Atmosphere />
        </group>       
    );
}
