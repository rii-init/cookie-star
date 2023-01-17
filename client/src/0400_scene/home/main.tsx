import { TextH1 } from "../../0200_component/flat/typography/h1"
import { Atmosphere } from "../../0300_entity/atmosphere/atmosphere"
import { SkyIsland } from "../../0300_entity/sky-island/sky-island"
import { Tree } from "../../0300_entity/sky-island/tree"
import { WaterFall } from "../../0300_entity/sky-island/water.fall"
import { WaterStream } from "../../0300_entity/sky-island/water.stream"
import { SyntaxHighlight } from "../../1000_aesthetic/syntax-highlight"
import { themeIdx } from "../../1000_aesthetic/visual-theme.manager"

import { GroupMain } from "../../0200_component/flat/typography/main"

export const main = () => {
    
    return (
        <>
        <TextH1 position={[0,2.4,-1.5]} >Ultr7A</TextH1>
        <group>
            <GroupMain className={"App theme _"+themeIdx}>
                {/* <GridOctaves></GridOctaves> */}
                {/* <Atmosphere /> */}
                <SkyIsland position={[0,-1.5,0]}>
                    <WaterStream position={[0, 0.1, 0]} />
                    <WaterFall position={[5, 0.1, 5]} />
                    <Tree rotation={[0, -2/3*Math.PI, 0]} position={[-3, 0.5, -5]} /> 
                </SkyIsland>
            </GroupMain>
        </group>
        </>
    )
}