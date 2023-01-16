import { TextH1 } from "../../0200_component/flat/typography/h1"
import { DocumentScene } from "../document.scene"

export const show_room = () => {
    return (
        <>
            <TextH1 position={[0,2.4,-1.5]} >Timeline</TextH1>
            <DocumentScene>
                <main>
                    <p>
                        Everyone has a story. <br/>
                        This is mine.
                        <br/>
                    </p>
                    
                    <p>
                        In the beginning the universe exploded, 
                        and intelligent life emerged. <br/>
                    </p>
                    <p>Ultr7A.com was born at some point.</p>
                    <p>From a young age, they were fascinated with water, pipes, electricity and wires.</p>
                    <p>
                        Ultr7A later took an interest in programming, gamedev, webdev, and visual arts.   
                        They went on to work for numerous startups, 
                        including Redeam and Mindbridge AI.
                        <br/>
                    </p>

                    <p>** Singularity **</p>
                </main>
            </DocumentScene>
        </>
    )
}