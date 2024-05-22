import { Entity } from ".";
import { Content } from "../0700_life/system/content.system";



export interface ContentFrameProps {
    collection_url: string;
    batch_size:     number;

    position:       [number, number, number];
}

/**
 * 
 *  parsed as "Content" in HTML
 */
export const ContentFrame = (p: ContentFrameProps) => {

    return (
        <Entity position={p.position}>
            <Content params={p} />
        </Entity>
    )
}