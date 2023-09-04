import { EvalHTMLToReactElement } from './element';
import { htmlNodeFilter } from './filter';


interface TextChildNode {
    nodeName: '#text';
    nodeValue: string;
}

export function Evaluator (props: { location: string, update: number }) {

    return (
        <>
        {  
           Array.from(document.querySelector("body main")?.childNodes ?? [])
                .filter(htmlNodeFilter)    
                .map((node) => {
                    
                    return EvalHTMLToReactElement(
                        node as HTMLElement, 
                        node.nodeName !== "SEQUENCE" // currently the only custom container component
                    );
                })

        }
        </>
    )
}