import { TextH1 }      from "../../0200_component/flat/typography/h1"
import { Atmosphere }  from "../../0300_entity/atmosphere/atmosphere"
import { SkyIsland }   from "../../0300_entity/sky-island/sky-island"
import { Tree }        from "../../0300_entity/sky-island/tree"
import { WaterFall }   from "../../0300_entity/sky-island/water.fall"
import { WaterStream } from "../../0300_entity/sky-island/water.stream"
import { themeIdx }    from "../../1000_aesthetic/visual-theme.manager"

import { GroupMain } from "../../0200_component/flat/typography/main"
import { Universe }  from "../../0000_concept/universe"

export const Main = () => {
    
	Universe.user_controls.track.setCameraPosesToDefault();
    
    return (
        <>
        <TextH1 position={[0,2.6,-1.5]} >Ultr7A</TextH1>
        <group>
            <GroupMain className={"App theme _"+themeIdx}>
                <Atmosphere />
                <SkyIsland position={[0,-2,0]}>
                    <WaterStream rotation={[0,Math.PI /2, 0]} position={[2.75, 1.15,  -6]} />
                    <WaterFall   rotation={[0,Math.PI /2, 0]} position={[1.5,  1.025, -6]} />
                    <Tree rotation={[0, -1.5/3*Math.PI, 0]} position={[-7, 1.5, -7]} /> 
                </SkyIsland>
            </GroupMain>
        </group>
        </>
    )
}