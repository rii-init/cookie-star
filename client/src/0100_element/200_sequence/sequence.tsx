import React, { JSXElementConstructor, ReactElement, ReactNode, useContext, useEffect } from "react";
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight";
import { text } from "stream/consumers";
import { DiagnosticState, diagnosticState } from "../../0000/r3f-debug";
import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextSpan } from "../../0200_component/flat/typography/span";
import { wrapText } from "../../0000_concept/responsive-document";
import { Universe } from "../../0000_concept/universe";

// Structural Sequence:

export interface SequenceProps {
    elements?: string[]
    children?: React.ReactNode,
    
    direction: "x" | "y" | "z",
    polarity?:  1  | -1,

    buffer?: { size: number }

    xFunction?: (d: number) => number
    yFunction?: (d: number) => number
    zFunction?: (d: number) => number
    xRotationFunction?: (d: number) => number
    yRotationFunction?: (d: number) => number
    itemPadding?: number,
    
    position?: [number, number, number]
    rotation?: [number, number, number]

    color?: [number, number, number]
    border?: boolean,
    afterItem?: (position: [number, number, number],
                    scale: [number, number, number], 
                direction: "x" | "y" | "z") => React.ReactNode,
}

export function calculateBufferedItemVisibility(
    direction: "x" | "y" | "z",
    position: [number, number, number],
    bufferSize:     number,
    itemPosition:   number, 
    spacing:        number, 
    scrollDistance: number
) {
    const scrollingWindowSize = bufferSize * spacing;
    const absolute_itemPosition = itemPosition + position[ "xyz".indexOf(direction) ]; 

    return absolute_itemPosition > scrollDistance &&
           absolute_itemPosition < scrollDistance + scrollingWindowSize; 
}


function backgroundShapeForDirection(direction: "x" | "y" | "z"): [number, number, number] {
    switch (direction) {
        case "x":
            return [0.1,3,4];
        case "y":
            return [4,0.1,3];
        case "z":
            return [4,3,0.1];
    }
}

function backgroundPositionForDirection(direction: "x" | "y" | "z", position: [number, number, number]): [number, number, number] {
    switch (direction) {
        case "x":
            return [position[0]*0.5-0.25, -0.5, 0];
        case "y":
            return [-0.5, position[1]*0.5-0.25, 0];
        case "z":
            return [0, -0.5, position[2]*0.5-0.25];
    }
}

function positionForDirection(xFunction = (x: number)=>0, yFunction=(y: number)=>0, zFunction = (z: number)=>0,
	                      direction: "x" | "y" | "z", polarity: 1 | -1, padding: number, index: number): [number, number, number] {
    switch (direction) {
        case "x":
            return [polarity * index * (1+padding), yFunction(index),  zFunction(index)];
        case "y":
            return [xFunction(index), polarity * index * (1+padding),  zFunction(index)];
        case "z":
            return [xFunction(index), yFunction(index), polarity * index * (1+padding)];
    }
}
export const SequenceContext = React.createContext({});

function getPosition(props: SequenceProps, index: number) { 
    return positionForDirection(props.xFunction, props.yFunction, props.zFunction,
        props.direction,
        props.polarity    || 1,
        props.itemPadding || 0, index);
}

export const Sequence = (props: SequenceProps) => {
    
    let elementCount = props.elements ? props.elements.length : React.Children.count(props.children);
    let dynamicIndex = 0;

    const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait");

    useEffect(() => { 
        const orientationSub = Universe.state.responsiveDocument.$orientation.subscribe((orientation) => {
            setOrientation(orientation);
        })

        return () => {
            orientationSub.unsubscribe();
        }
    }, []);

    return (
        <SequenceContext.Provider value={{direction: props.direction}}>
        <group position={props.position || [0,0,0]}
               rotation={props.rotation || [0,0,0]}
        >
        {
            React.Children.map(props.children, (element, index) => {
            let textLines = null;
            if (element &&        (element as ReactElement<any>).type
                        && typeof (element as ReactElement<any>).type === 'function') 
            {                
                const componentType = ((element as ReactElement<any>).type as Function);

                if (([TextDiv, TextSpan] as Function[]).includes(componentType)) {
                    const lines = wrapText((element as any).props.children as string, orientation);

                    if (lines && lines.length > 1) {
                        textLines = lines.map((line: string, index: number) => {
                        const lineElement = React.cloneElement(element as ReactElement<any>, {children: line});
                        return (
                            <group key={index} 
                                   position={getPosition(props, dynamicIndex++)}
                                   rotation={[
                                       props.xRotationFunction ? props.xRotationFunction(index) : 0,
                                       props.yRotationFunction ? props.yRotationFunction(index) : 0,
                                       0]}
                            >
                                { lineElement }
                            </group>
                        )
                        });
                    }
                }
                
            }

            if (textLines) {
                return (<> { textLines } </>)
            } 
            
		    return (
                <group key={index} 
                  position={getPosition(props, dynamicIndex++)}
                  rotation={[
                          props.xRotationFunction ? props.xRotationFunction(index) : 0,
                          props.yRotationFunction ? props.yRotationFunction(index) : 0,
                          0]}
                >
                    { element }
                </group>
                )
            })
        }
        { props.border ? 
            <mesh position={positionForDirection(undefined, undefined, undefined, props.direction, 
		                             props.polarity || 1,
		                             props.itemPadding || 0, 0)}
		          rotation={[
                        props.xRotationFunction ? props.xRotationFunction(0) : 0, 
                        props.yRotationFunction ? props.yRotationFunction(0) : 0, 
                           0]}
		    >
                <boxGeometry args={[0.1,1,1]} />
                <meshBasicMaterial color={props.color || SyntaxHighlight.Sequence} />
            </mesh> 
            : null 
        }
        { props.border ?
            <mesh position={positionForDirection(undefined, undefined, undefined, props.direction, 
					     props.polarity || 1,
		              props.itemPadding || 0,
                                  props.elements 
                                     ? props.elements.length-1
                                     : React.Children.count(props.children)-1
                                     )}
		    rotation={[props.xRotationFunction ? props.xRotationFunction(elementCount - 1) : 0, 
                       props.yRotationFunction ? props.yRotationFunction(elementCount - 1) : 0, 
                     0]}
		    >
                <boxGeometry args={[0.1,1,1]} />
                <meshBasicMaterial color={props.color || SyntaxHighlight.Sequence} />
            </mesh>
            : null 
        }
        </group>
        </SequenceContext.Provider>
    )
}
