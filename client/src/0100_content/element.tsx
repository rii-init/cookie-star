import { ReactNode } from "react"
import { Sequence } from "../0100_element/200_sequence/sequence"
import { LinkSurface } from "../0200_component/flat/navigation-surface/LinkSurface"
import { TextDiv } from "../0200_component/flat/typography/div"
import { TextH1 } from "../0200_component/flat/typography/h1"
import { TextH2 } from "../0200_component/flat/typography/h2"
import { TextH3 } from "../0200_component/flat/typography/h3"
import { TextH4 } from "../0200_component/flat/typography/h4"
import { TextP } from "../0200_component/flat/typography/p"
import { TextSpan } from "../0200_component/flat/typography/span"
import { Atmosphere } from "../0300_entity/atmosphere/atmosphere"
import { SkyIsland } from "../0300_entity/sky-island/sky-island"
import { Tree } from "../0300_entity/sky-island/tree"
import { WaterFall } from "../0300_entity/sky-island/water.fall"
import { WaterStream } from "../0300_entity/sky-island/water.stream"
import { htmlNodeFilter } from "./filter"
import { Parser } from "./parser"


export function filterAndEvalNodes(nodes: NodeListOf<ChildNode>, 
                              cssLayout?: boolean,
                              layoutCoords?: [number, number, number]): ReactNode[] 
{
    return Array.from(nodes)
                .filter(htmlNodeFilter)
                .map((node) => {
                    return EvalHTMLToReactElement(node as HTMLElement, cssLayout, layoutCoords)
                })
}

function convertDOMCoordinatesToGLCoordinates(boundingBox: DOMRect): [number, number, number] {
    return [
        ( (boundingBox.left + boundingBox.width / 2) - window.innerWidth  / 2) / 156,
        (window.innerHeight / 2 -(boundingBox.top + boundingBox.height / 2))       / 156,
        0 // Now that layout is more generalised, 
          // Specifying the coordinate system needs to be reworked.
    ]
}

export function EvalHTMLToReactElement(node: HTMLElement, cssLayout?: boolean, relativeTo?: [number, number, number]): React.ReactNode {
    // It's not uncommon for there to be attributes:
    // They might be a data structure that has to be parsed:
    if (node.nodeName === '#text') {
        return (
            <TextSpan>{(node as HTMLElement).textContent}</TextSpan>
        )
    }    
                    
        const attrs = Parser.parse(node as HTMLElement)

        let layoutCoords: [number, number, number] | undefined = undefined;

        if (cssLayout) {
            const boundingBox = node.getBoundingClientRect();

            layoutCoords = convertDOMCoordinatesToGLCoordinates(boundingBox);


            if (relativeTo) {
                layoutCoords[0] -= relativeTo[0];
                layoutCoords[1] -= relativeTo[1];
                layoutCoords[2] -= relativeTo[2];
            }
        }


        switch (node.nodeName) {
            case "SPAN":
                return <TextSpan {...attrs} position={layoutCoords}>
                            { filterAndEvalNodes(node.childNodes, cssLayout, layoutCoords) }
                       </TextSpan>
                
            case "H1":
                return <TextH1 {...attrs} position={layoutCoords}>{(node as HTMLElement).textContent}</TextH1>
            case "H2":
                return <TextH2 {...attrs} position={layoutCoords}>{(node as HTMLElement).textContent}</TextH2>
            case "H3":
                return <TextH3 {...attrs} position={layoutCoords}>{(node as HTMLElement).textContent}</TextH3>
            case "H4":
                return <TextH4 {...attrs} position={layoutCoords}>{(node as HTMLElement).textContent}</TextH4>

            case "A":
                return <LinkSurface location={attrs.href || (node as HTMLElement).textContent}
                                    position={layoutCoords}
                       >
                    {(node as HTMLElement).textContent}
                       </LinkSurface>

            // If someone has the audacity to use a p tag or a div, they might be doing something complicated,
            // so we're going to check if there's more elements inside of it:
            case "P":
                if (node.childNodes.length === 1) {
                    if (node.childNodes[0].nodeName === 'ATMOSPHERE') {
                        return <Atmosphere></Atmosphere>
                    }
                }
                
                return  <TextP {...attrs} position={layoutCoords}>
                            { filterAndEvalNodes(node.childNodes, cssLayout, layoutCoords) }
                        </TextP>
                            
            case "DIV":
                return <TextDiv { ...attrs} position={layoutCoords}>
                            { filterAndEvalNodes(node.childNodes, cssLayout, layoutCoords) }
                       </TextDiv>
            
            case "UL":
                return <group {...attrs} position={layoutCoords}>
                        {
                            filterAndEvalNodes(node.childNodes, cssLayout, layoutCoords)
                        }
                      </group>

            case "OL":
                return <group position={layoutCoords} {...attrs}>
                        {
                            Array.from(node.childNodes)
                            .filter(htmlNodeFilter)
                            .map((childNode, idx: number) => {
                                const listItemContents = filterAndEvalNodes(childNode.childNodes, cssLayout, layoutCoords);

                                return listItemContents.length > 1 
                                    ? <group>
                                        { <TextSpan>{ idx + 1 }</TextSpan> } 
                                        { listItemContents                 }
                                      </group>
                                    : listItemContents[0]

                            })
                        }
                       </group>


            case "LI":
                const listItemContents = filterAndEvalNodes(node.childNodes, cssLayout, layoutCoords);

                return listItemContents.length > 1
                    ? (
                        <group position={layoutCoords}>
                            { listItemContents }
                        </group>
                    )
                    : listItemContents[0];

            // Cool and awesome components:   
            // Going to generate this part of the file, in v2:
            case "SEQUENCE":
                return <Sequence direction={attrs.direction || "y"} position={layoutCoords} {...attrs}>
                            { 
                                Array.from(node.childNodes)
                                .filter(htmlNodeFilter)
                                .flatMap((childNode) => {
                                    if (["UL", "OL"].includes(childNode.nodeName)) {
                                        
                                        return filterAndEvalNodes(childNode.childNodes, false)
                                    }

                                    return EvalHTMLToReactElement(childNode as HTMLElement, false)
                                })
                            }
                       </Sequence>

            case "ATMOSPHERE":
                return <Atmosphere {...attrs}></Atmosphere>

            case "SKYISLAND":
                return <SkyIsland position={attrs.position} {...attrs}>
                    { filterAndEvalNodes(node.childNodes, false) }
                </SkyIsland>

            case "WATERSTREAM":
                return <WaterStream rotation={attrs.rotation} position={attrs.position} {...attrs}></WaterStream>
            
            case "WATERFALL":
                return <WaterFall rotation={attrs.rotation} position={attrs.position} {...attrs}></WaterFall>

            case "TREE":
                return <Tree rotation={attrs.rotation} position={attrs.position} {...attrs}></Tree>


            default:
                console.log("OwO ..what's dis? ", node);
                return  null
        }
}