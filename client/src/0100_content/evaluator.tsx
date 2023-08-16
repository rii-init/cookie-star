import * as React from 'react';
import { extend } from '@react-three/fiber'

import { Parser } from "./parser";

import { TextSpan } from '../0200_component/flat/typography/span';
import { TextH1 } from '../0200_component/flat/typography/h1';

import { Atmosphere } from '../0300_entity/atmosphere/atmosphere';
import { LinkSurface } from '../0200_component/flat/scalar/LinkSurface';
import { TextH3 } from '../0200_component/flat/typography/h3';
import { TextH2 } from '../0200_component/flat/typography/h2';
import { TextDiv } from '../0200_component/flat/typography/div';


extend({ TextSpan, TextDiv, TextH1, TextH2, TextH3, LinkSurface, Atmosphere });

interface TextChildNode {
    nodeName: '#text';
    nodeValue: string;
}

function evaluate (element: HTMLElement | TextChildNode, components: React.ReactNode[]) {

    // check if text node:
    if (element.nodeName === '#text') {
        
        components.push(
            React.createElement('TextSpan', {}, element.nodeValue)
        )
    } else {
        // It's not uncommon for there to be attributes:
        // They might be a data structure that has to be parsed:
        const attrs = Parser.parse(element as HTMLElement)

        // I got some attributes.. i think?? let me double check
        console.log("Attributes? Can has?", attrs);

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

            components.push(
                React.createElement('Sequence', attrs, listItemComponents)
            );
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

    const components = [] as React.ReactNode[];
    const body = document.body;

    if (body) {
        // iterate over body:
        for (let i = 0; i < body.childNodes.length; i++) {
            const node = body.childNodes[i];

            // ignore stuff that isn't static html content:
            if  (   node instanceof HTMLElement && 
                    (    
                        node.nodeName           === "SCRIPT" ||
                        node.getAttribute("id") === "root" 
                    )
                )
            { continue; }

            evaluate(node as HTMLElement, components)
        }
    }

    return (
        <>{ components }</>
    )
}