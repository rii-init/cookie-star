import { Html } from "@react-three/drei"
import { useEffect } from "react"
import { Universe } from "../../0000_concept/universe"
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere"
import { GridOctaves } from "../../0300_entity/grid-octaves"
import { SkyIsland } from "../../0300_entity/sky-island/sky-island"
import { Tree } from "../../0300_entity/sky-island/tree"
import { WaterFall } from "../../0300_entity/sky-island/water.fall"
import { WaterStream } from "../../0300_entity/sky-island/water.stream"
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"
import { themeIdx } from "../../1000_aesthetic/visual-theme.manager"

export const main = () => {
    useEffect(() => {
        Universe.skyColor = SyntaxHighlight.Sequence;
    }, [])
    
    return (
        <Html>
            <div className={"App theme _"+themeIdx}> 
            <h1>Ultr7A</h1>
            <main>
                <GridOctaves></GridOctaves>
                <Atmosphere />
                <SkyIsland position={[0,-1.5,0]}>
                    {/* <WaterStream position={[0, 0.1, 0]} />
                    <WaterFall position={[5, 0.1, 5]} />
                    <Tree position={[-3, 0.1, 5]} /> */}
                </SkyIsland>
            </main>
            </div>
        </Html>
    )
}