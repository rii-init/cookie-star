import { Universe } from '../0000_concept/universe';
import { EvalHTMLToReactElement } from './element';
import { htmlNodeFilter } from './filter';
import { Parser } from './parser';


// extend({ TextSpan, TextDiv, TextP, TextH1, TextH2, TextH3, LinkSurface, Sequence, Atmosphere });

interface TextChildNode {
    nodeName: '#text';
    nodeValue: string;
}

export function Evaluator (props: { location: string }) {

    console.log("the page changed. Time to load the content! :D",
    "btw: the page is:  ", props.location);

    // parse the config file:
    const config = Parser.parseConfig();

    if (config.call !== undefined && config.call.length > 0) {
        config.call.forEach((call) => {
            switch (call[0]) {
                case "Universe.user_controls.track.setCameraPosesToDefault":
                    Universe.user_controls.track.setCameraPosesToDefault();
                break;
                case "Universe.user_controls.track.setCameraPoses":
                    Universe.user_controls.track.setCameraPoses(call[1]);
                break;

                default:
                    // No-op
            }
        });
    } 

    return (
        <>
        {  
           Array.from(document.body.childNodes)
                .filter(htmlNodeFilter)    
                .map((node) => {
                    return EvalHTMLToReactElement(node as HTMLElement)
                })

        }
        </>
    )
}