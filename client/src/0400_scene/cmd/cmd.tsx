import { useEffect, useLayoutEffect } from "react"
import { Universe }    from "../../0000_concept/universe"
import { Sequence }    from "../../0100_element/200_sequence/sequence"
import { InputSurface } from "../../0200_component/flat/scalar/InputSurface"
import { TextDiv } from "../../0200_component/flat/typography/div"

import { TextH1 }      from "../../0200_component/flat/typography/h1"
import { GroupMain }   from "../../0200_component/flat/typography/main"
import { TextSpan }    from "../../0200_component/flat/typography/span"

import { Atmosphere }  from "../../0300_entity/atmosphere/atmosphere"
import { GridOctaves } from "../../0300_entity/grid-octaves"

function onUserNameChange(event: any) {
    console.log(event);
}

function onPasswordChange(event: any) {
    console.log(event);
}

function onSubmit(event: any) {
    console.log(event);
}

function onRoleChange(event: any) {
    console.log(event);
}

const workspaces = [
    { 
        streams: [
            {
                elements: [

                ]
            }
        ]
    }
]

export const Shell = () => {

	useEffect(() => {
		Universe.user_controls.track.setCameraPosesToDefault();
	}, [])

    return (
        <>
            <TextH1 position={[0,2.4,-1.5]} >Shell</TextH1>
    
            <GroupMain>
				<Atmosphere />
				<GridOctaves />

                { Universe.xrMode 
                    /** X-axis: Workspaces **/
                    ? (
                        
                        <Sequence direction="x" polarity={-1} itemPadding={1}>
                            {
                                workspaces.map((workspace, index) => {
                                    /** Y-axis: Streams **/
                                    return (
                                        <Sequence direction="z" polarity={-1} itemPadding={1}>
                                            {
                                                /** Z-axis: Elements **/
                                                workspace.streams.map((stream, index) => {
                                                    return (
                                                        <Sequence direction="y" 
                                                                   polarity={-1 } 
                                                                itemPadding={ 1 } 
                                                                     buffer={ { size: 36 } }
                                                        >
                                                            {
                                                                stream.elements.map((element, index) => {
                                                                    return (
                                                                        <TextDiv>
                                                                            { element }
                                                                        </TextDiv>
                                                                    )
                                                                })
                                                            }
                                                        </Sequence>
                                                    )
                                                })
                                            }
                                        </Sequence>
                                    )
                                })
                            }        
                        </Sequence>    
                    )
                    : ( 

				        <Sequence direction="y" polarity={-1} itemPadding={1}>
                    
                    
					        <TextSpan>Login</TextSpan>

                            <TextSpan>User Role (client | server)</TextSpan>
                            <InputSurface variant="boolean"
                                        channelID="role" 
                                         onChange={(e) => { onRoleChange(e) }}></InputSurface>
                            
                            <TextSpan>User Name</TextSpan>
                            <InputSurface variant="text"
                                        channelID="username"  
                                         onChange={(e) => { onUserNameChange(e); }}></InputSurface>
                            
                            <TextSpan>User Password</TextSpan>
                            <InputSurface variant="text" 
                                        channelID="password"
                                         onChange={(e) => { onPasswordChange(e); }}></InputSurface>
                            <InputSurface variant="boolean"
                                        channelID="submit" 
                                         onChange={(e) => { onSubmit(e); }}></InputSurface>
		    	        
                        </Sequence>
                    )
                }
			</GroupMain>
        </>
    )
}
