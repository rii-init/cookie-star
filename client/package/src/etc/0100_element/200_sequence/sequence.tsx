import React, { ReactElement, useEffect } from "react";

import { TextDiv } from "../../0200_component/flat/typography/div";
import { TextSpan } from "../../0200_component/flat/typography/span";
import { wrapText } from "../../0000_concept/responsive-document";
import { Universe } from "../../0000_concept/universe";
import { useLocation } from "wouter";
import { LinkSurface } from "../../0200_component/flat/navigation-surface/LinkSurface";

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

    staticLayout?: boolean
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
    return positionForDirection(
                props.direction==="x" 
                    ? (x)=> (props.xFunction ? props.xFunction(x) : 0) 
                    : (props.xFunction), 
                props.yFunction, props.zFunction,
                props.direction,
                props.polarity    || 1,
                props.itemPadding || 0, index);
}       

export const Sequence = (props: SequenceProps) => {
    const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait");

    useEffect(() => { 
        const orientationSub = Universe.state.responsiveDocument.$orientation.subscribe((orientation) => {
            setOrientation(orientation);
        })

        return () => {
            orientationSub.unsubscribe();
        }
    }, []);

    let dynamicIndex = 0;

    const groupRef = React.useRef<THREE.Group>(null);

    return (
        <SequenceContext.Provider value={{direction: props.direction}}>
        <group position={props.position || [0,0,0]}
               rotation={props.rotation || [0,0,0]} 
               ref={groupRef}
               userData={{direction: props.direction}}
        >
        {
            
            React.Children.map(props.children, (element, index) => {
            
            let textLines = null;
            if (element &&        (element as ReactElement<any>).type
                        && typeof (element as ReactElement<any>).type === 'function') 
            {                
                const componentType = ((element as ReactElement<any>).type as Function);

                if (([TextDiv, TextSpan] as Function[]).includes(componentType)) {
                    const lines = wrapText((element as any).props.children as string, "landscape"); //??? orientation);

                    if (lines && lines.length > 1) {
                        textLines = lines.map((line: string, index: number) => {
                            const lineElement = React.cloneElement(element as ReactElement<any>, {children: line});
                        
                            return (
                                <group key={dynamicIndex} 
                                       position={props.staticLayout ? getPosition(props, dynamicIndex++) : [0,0,0]}
                                       rotation={[
                                           props.xRotationFunction ? props.xRotationFunction(dynamicIndex) : 0,
                                           props.yRotationFunction ? props.yRotationFunction(dynamicIndex) : 0,
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
            
            return React.cloneElement(element as ReactElement<any>, 
                { ...((element as any).props),
                    position: getPosition(props, dynamicIndex++),                               
                    rotation: [
                            props.xRotationFunction ? props.xRotationFunction(dynamicIndex) : 0,
                            props.yRotationFunction ? props.yRotationFunction(dynamicIndex) : 0,
                            0
                        ]
                })

		
            })
        }
        </group>
        </SequenceContext.Provider>
    )
}
