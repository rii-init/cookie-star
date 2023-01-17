import { Sequence } from "../../0100_element/200_sequence/sequence"
import { TextDiv } from "../../0200_component/flat/typography/div"
import { TextH1 } from "../../0200_component/flat/typography/h1"
import { TextH2 } from "../../0200_component/flat/typography/h2"
import { TextH3 } from "../../0200_component/flat/typography/h3"
import { TextH4 } from "../../0200_component/flat/typography/h4"
import { GroupMain } from "../../0200_component/flat/typography/main"
import { TextP } from "../../0200_component/flat/typography/p"

export const nature = () => {
    return (
        <>
        <TextH1 position={[0,2.4,-1.5]} >Design Language</TextH1>
        
            <GroupMain>
                
                <Sequence direction="z">
                
                    <TextP>Simple, orthogonal, composable elements.</TextP>

                    <TextH2>Visual Elements</TextH2>
                
                </Sequence>
                
                <group>
                    <TextDiv className="shape">
                        <TextH3>Point</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Dot</TextH4>
                            <TextDiv className="dot">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                            <TextH4>Pixel</TextH4>
                            <TextDiv className="pixel">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>


                    <TextDiv className="shape">
                        <TextH3>Line</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Segment</TextH4>
                            <TextDiv className="segment">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                            <TextH4>Ray</TextH4>
                            <TextDiv className="ray">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>

                    <TextDiv className="shape">
                        <TextH3>Circle</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Sphere</TextH4>
                            <TextDiv className="sphere">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                            <TextH4>Tube</TextH4>
                            <TextDiv className="tube">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>

                    <TextDiv className="shape">
                        <TextH3>Polygon</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Polyhedron</TextH4>
                            <TextDiv className="polyhedron">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                            <TextH4>Pyramid</TextH4>
                            <TextDiv className="pyramid">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                            <TextH4>Prism</TextH4>
                            <TextDiv className="cube">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>

                    <TextDiv className="shape">
                        <TextH3>Manifold</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Branch</TextH4>
                            <TextDiv className="branch">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>

                            <TextH4>Tree</TextH4>
                            <TextDiv className="tree">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>

                            <TextH4>Graph</TextH4>
                            <TextDiv className="graph">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>

                    <TextDiv className="shape">
                        <TextH3>Fluid</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Stream</TextH4>
                            <TextDiv className="stream">
                                <TextDiv className="illustration">
                                </TextDiv>
                            </TextDiv>
                            <TextH4>Flow</TextH4>
                            <TextDiv className="flow">
                                <TextDiv className="illustration">
                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>

                    <TextDiv className="shape">
                        <TextH3>Field</TextH3>

                        <TextDiv className="illustration">

                        </TextDiv>
                        <TextDiv className="ds_combination">
                            <TextH4>Surface</TextH4>
                            <TextDiv className="surface">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                            <TextH4>Volume</TextH4>
                            <TextDiv className="volume">
                                <TextDiv className="illustration">

                                </TextDiv>
                            </TextDiv>
                        </TextDiv>
                    </TextDiv>
                </group>
            </GroupMain>
        </>
    )
}