import { EvalHTMLToReactElement } from './element';
import { htmlNodeFilter } from './filter';


export function Evaluator (props: { location: string, update: number }) {
    
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