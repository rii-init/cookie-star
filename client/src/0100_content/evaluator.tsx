import { EvalHTMLToReactElement } from './element';
import { htmlNodeFilter } from './filter';


export function Evaluator (props: { location: string }) {
    console.log("evaluator render/update: ", props.location);

    return (
        <>
        {  
           Array.from(document.querySelector("body main")?.childNodes ?? [])
                .filter(htmlNodeFilter)    
                .map((node, index) => {
                    
                    return EvalHTMLToReactElement(
                        node as HTMLElement, 
                        node.nodeName !== "SEQUENCE", // currently the only custom container component
                        true,
                        index
                    );
                })

        }
        </>
    )
}