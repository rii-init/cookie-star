import { useEffect } from 'react';
import { EvalHTMLToReactElement } from './element';
import { htmlNodeFilter } from './filter';
import { systems } from '../0700_life/system';


export function Evaluator (props: { location: string }) {
    console.log("evaluator render/update: ", props.location);

    useEffect(() => {
        // clear all ECS entities and ECS components from registry:
        // (unless entity is exempted (like the user/camera, during scene change))
        return () => {
            console.log("evaluator::clearing systems state");
            systems.clear();
        }
    }, [props.location]);

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