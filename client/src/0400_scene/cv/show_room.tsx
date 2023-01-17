import { Sequence } from "../../0100_element/200_sequence/sequence"
import { TextH1 } from "../../0200_component/flat/typography/h1"
import { GroupMain } from "../../0200_component/flat/typography/main"
import { TextP } from "../../0200_component/flat/typography/p"
import { TextSpan } from "../../0200_component/flat/typography/span"

export const show_room = () => {
    return (
        <>
            <TextH1 position={[0,2.4,-1.5]} >Timeline</TextH1>
        
                <GroupMain>
                    <Sequence direction="z">

                    <TextSpan>
                        Everyone has a story. 
                        This is mine.    
                    </TextSpan>
                    <TextSpan>
                        In the beginning the universe exploded, 
                        and intelligent life emerged. 
                    </TextSpan>
                    <TextSpan>Ultr7A.com was born at some point.</TextSpan>
                    <TextSpan> </TextSpan> 

                    <TextSpan>From a young age, they were fascinated</TextSpan> 
                    <TextSpan>with water, pipes, electricity and wires.</TextSpan>
                    <TextSpan> </TextSpan>
                    
                    <TextSpan>Ultr7A later took an interest in</TextSpan>
                    <TextSpan>programming, gamedev, webdev, and visual arts.</TextSpan>
                    <TextSpan> </TextSpan>
                    
                    <TextSpan>They went on to work for numerous startups, </TextSpan>
                    <TextSpan>including Redeam and Mindbridge AI.</TextSpan>

                    <TextSpan>** Singularity **</TextSpan>
                </Sequence>
                </GroupMain>               
        </>
    )
}