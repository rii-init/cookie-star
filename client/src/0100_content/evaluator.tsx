import { useEffect } from 'react';
import { Universe } from '../0000_concept/universe';
import { EvalHTMLToReactElement } from './element';
import { htmlNodeFilter } from './filter';
import { Parser } from './parser';
import { RunCommands } from './configure';


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
                    return EvalHTMLToReactElement(node as HTMLElement)
                })

        }
        </>
    )
}