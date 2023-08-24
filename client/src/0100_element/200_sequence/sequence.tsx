import React, { JSXElementConstructor, ReactElement, ReactNode, useContext, useEffect } from "react";
import { Group, Mesh } from "three";
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


function computeLayout(group: THREE.Object3D) {
    // check if each child is a mesh or group:
    // if it's a mesh, then we can just use the bounding box to compute the layout
    // if it's a group, then we need to compute the layout of the group, and then use that to compute the layout of the parent group
    let height = 0;

    group.children.forEach((child) => {
     
        if (child instanceof Mesh) {
            child.geometry.computeBoundingBox();
            const box = child.geometry.boundingBox;
            
            if (box.max.y !== -Infinity && box.min.y !== Infinity) {
                height += box.max.y - box.min.y;
            } else {
                console.log("computeLayout: box.max.y is Infinity");
            }
            

        } else if (child instanceof Group) {

            child.children.forEach((g_child) => {

                if (g_child instanceof Mesh) {
                    g_child.geometry.computeBoundingBox();
                    const box = g_child.geometry.boundingBox;
                    
                    
                    if (box.max.y !== -Infinity && box.min.y !== Infinity) {
                        height += box.max.y - box.min.y;
                    } else {
                        console.log("computeLayout: box.max.y is Infinity");
                    }

                } else if (g_child instanceof Group) {

                    height += computeLayout(g_child);
                }

                
            })

        }
    });

    group.position.y -= height * 0.5;
    group.updateMatrixWorld(true);

    return height;
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

    let elementCount = props.elements ? props.elements.length : React.Children.count(props.children);
    let dynamicIndex = 0;

    const groupRef = React.useRef<THREE.Group>(null);

    useEffect(() => {
        if (groupRef.current) {
            computeLayout(groupRef.current);
        }
    }, [groupRef]);

    return (
        <SequenceContext.Provider value={{direction: props.direction}}>
        <group position={props.position || [0,0,0]}
               rotation={props.rotation || [0,0,0]}
               ref={groupRef}
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
                                   position={getPosition(props, dynamicIndex++)}
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
            
		    return (
                <group key={dynamicIndex} 
                  position={getPosition(props, dynamicIndex++)}
                  rotation={[
                          props.xRotationFunction ? props.xRotationFunction(dynamicIndex) : 0,
                          props.yRotationFunction ? props.yRotationFunction(dynamicIndex) : 0,
                          0]}
                >
                    { element }
                </group>
                )
            })
        }
        
        </group>
        </SequenceContext.Provider>
    )
}
