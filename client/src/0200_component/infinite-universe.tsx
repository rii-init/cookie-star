import { InfiniteUniverseChunk } from "./infinite-universe.chunk";
import { InfiniteUniverseContext } from "./infinite-universe.context";

const chunks = [] as InfiniteUniverseChunk[];
const chunksById = {};

export interface InfiniteUniverseProps {
    children: React.ReactNode;
}

export const InfiniteUniverse = (props: InfiniteUniverseProps) => {
    
    return (
        <InfiniteUniverseContext.Provider value={{}}>
            <group>
            </group>
        </InfiniteUniverseContext.Provider>
        
    )
}