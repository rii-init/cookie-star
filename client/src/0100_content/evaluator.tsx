import * as React from 'react';

import { Parser } from "./parser";
import { TextSpan } from '../0200_component/flat/typography/span';
import { LinkSurface } from '../0200_component/flat/scalar/LinkSurface';
import { TextH1 } from '../0200_component/flat/typography/h1';
import { TextH2 } from '../0200_component/flat/typography/h2';
import { TextH3 } from '../0200_component/flat/typography/h3';
import { TextH4 } from '../0200_component/flat/typography/h4';
import { TextP } from '../0200_component/flat/typography/p';
import { TextDiv } from '../0200_component/flat/typography/div';
import { Atmosphere } from '../0300_entity/atmosphere/atmosphere';


// extend({ TextSpan, TextDiv, TextP, TextH1, TextH2, TextH3, LinkSurface, Sequence, Atmosphere });

interface TextChildNode {
    nodeName: '#text';
    nodeValue: string;
}

function evaluate (element: HTMLElement | TextChildNode, components: React.ReactNode[]) {

    console.log("element: ", element);

    // check if text node:
    if (element.nodeName === '#text') {
        if (/^\n+$/.test(element.nodeValue || "")) { return; /** naw... **/ }
        
        // otherwise, it's delicious bytes of text:
        components.push(
            React.createElement('TextSpan', {}, element.nodeValue)
        )
    } else {
        // It's not uncommon for there to be attributes:
        // They might be a data structure that has to be parsed:
        const attrs = Parser.parse(element as HTMLElement)


        // Check if it's a text label of some kind:
        if (element.nodeName === 'SPAN') {
            components.push(
                React.createElement('TextSpan', attrs, element.textContent)
            );
        }

        // Even a fancy label:
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.nodeName)) {
            components.push(
                React.createElement('Text' + element.nodeName, attrs, (element as HTMLElement).textContent)
            );
        }   

        // It could be a link:
        if (element.nodeName === 'A') {
            components.push(
                React.createElement('LinkSurface', attrs, element.textContent)
            );
        }

        //    ..Maybe it's a paragraph, with some weird stuff in it, because of the markdown renderer:
        // ..or maybe it's just normal paragraph of text:
        if (['P', 'DIV'].includes(element.nodeName)) {
            // let's check if there's multiple things in there, because that seems reasonable :)
            const p_children = [] as React.ReactNode[];

            for (let i = 0; i < (element as HTMLElement).childNodes.length; i++) {
                evaluate((element as HTMLElement).childNodes[i] as HTMLElement, p_children);
            }
            
            components.push(
                React.createElement('Text'+element.nodeName, attrs, p_children)
            );
        }

        // It could be a list:
        if (['UL', 'OL'].includes(element.nodeName)) {
            // create a Sequence component: 
            const listItemComponents = [] as React.ReactNode[];

            
            for (let i = 0; i < (element as HTMLElement).childNodes.length; i++) {
                const child = (element as HTMLElement).childNodes[i];

                // Where there's smoke, there's list items:
                if (child.nodeName === 'LI') {
                    evaluate(child as HTMLElement, listItemComponents)
                }
                
            }
           
             
            console.log("Adding <Sequence> with attrs: ", attrs, " and children: ", listItemComponents);

            components.push(
                React.createElement('Sequence', attrs, listItemComponents)
            );
        }
        
        if (element.nodeName === 'LI') {
            // check child nodes for anything that can be rendered:

            for (let i = 0; i < (element as HTMLElement).childNodes.length; i++) {
                const child = (element as HTMLElement).childNodes[i];

                evaluate(child as HTMLElement, components)
            }
        }

        // UwU Ultr7A CompOwOnents:
        if (element.nodeName === "SEQUENCE") {
            const sequenceItemComponents = [] as React.ReactNode[];

            for (let i = 0; i < (element as HTMLElement).childNodes.length; i++) {
                const child = (element as HTMLElement).childNodes[i];

                if (['UL', 'OL'].includes(child.nodeName)) {
                    for (let l = 0; l < (child as HTMLElement).childNodes.length; l++) {
                        const grandchild = (child as HTMLElement).childNodes[l];

                        if (grandchild.nodeName === 'LI') {
                            evaluate(grandchild as HTMLElement, sequenceItemComponents)
                        }
                    }
                } else {
                    evaluate(child as HTMLElement, sequenceItemComponents)
                }
            }

            components.push(
                React.createElement('Sequence', attrs, sequenceItemComponents)
            );
        } else if (element.nodeName === "ATMOSPHERE") {

            components.push(
                React.createElement('Atmosphere', attrs, [])
            )
        }


    }
}


export function Evaluator (props: { location: string }) {

    console.log("the page changed. Time to load the content! :D",
    "btw: the page is:  ", props.location);

    return (
        <>
        {  
           Array.from(document.body.childNodes)
                .filter((node) => {
                    return  (
                                node instanceof HTMLElement && 
                                !(    
                                    node.nodeName           === "SCRIPT" ||
                                    node.getAttribute("id") === "root" 
                                 )
                            )
                            ||
                            !/^\n+$/.test(node.nodeValue || "");
                })    
                .map((node) => {

                    // It's not uncommon for there to be attributes:
                    // They might be a data structure that has to be parsed:
                    if (node.nodeName === '#text') {
                        return (
                            <TextSpan>(node as HTMLElement).textContent</TextSpan>
                        )
                    }    
                    
                    const attrs = Parser.parse(node as HTMLElement)

                    switch (node.nodeName) {
                        case "SPAN":
                            return (
                                <TextSpan {...attrs}>{(node as HTMLElement).textContent}</TextSpan>
                            )

                        case "H1":
                            return (<TextH1 {...attrs}>{(node as HTMLElement).textContent}</TextH1>)
                        case "H2":
                            return (<TextH2 {...attrs}>{(node as HTMLElement).textContent}</TextH2>)
                        case "H3":
                            return (<TextH3 {...attrs}>{(node as HTMLElement).textContent}</TextH3>)
                        case "H4":
                            return (<TextH4 {...attrs}>{(node as HTMLElement).textContent}</TextH4>)

                        case "A":
                            return <LinkSurface location={attrs.location}>{(node as HTMLElement).textContent}</LinkSurface>

                        // If someone has the audacity to use a p tag or a div, they might be doing something complicated,
                        // so we're going to check if there's more elements inside of it:
    
                        case "P":
                                // testing...
                                return  node.childNodes.length > 0 
                                                        ?  node.childNodes[0].nodeName === "ATMOSPHERE" 
                                                            ? <Atmosphere /> 
                                                            : <TextP { ...attrs}>{(node as HTMLElement).textContent}</TextP> 
                                                        : <TextP { ...attrs}>{(node as HTMLElement).textContent}</TextP>

                                    // Array.from((node as HTMLElement).childNodes)
                                    //     .filter((node) => {
                                    //         return  (
                                    //                     node instanceof HTMLElement && 
                                    //                     !(    
                                    //                         node.nodeName           === "SCRIPT" ||
                                    //                         node.getAttribute("id") === "root" 
                                    //                     )
                                    //                 )
                                    //                 ||
                                    //                 !/^\n+$/.test(node.nodeValue || "");
                                    //     })
                                    //     .map((node) => {

                                    //     })

                                    // Oh wait haha.. i need another component for this to be recursive :p
                                
                                

                        case "DIV":
                            return <TextDiv { ...attrs}>
                                { /*** one thing at a time.. ***/}
                            </TextDiv>
                            
                    }
                })

        }
        </>
    )
}