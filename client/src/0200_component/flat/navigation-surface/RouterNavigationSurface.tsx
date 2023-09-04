import { useLocation, Link } from "wouter";
import { Sequence } from "../../../0100_element/200_sequence/sequence";
import { LinkSurface } from "../navigation-surface/LinkSurface";
import { siteMap } from "../../../sitemap";

export interface SiteMap {
  pages: { path: string, title: string }[],
  lists: {
    [directory: string]: { path: string, title: string }[]
  } 
}


export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
    const offset = [0,-0.1, 0.4] as [number, number, number];

    return (
      <Sequence direction="x" polarity={1} 
                                position={[-1.32,4,-1]} 
                             itemPadding={-0.333}
                             staticLayout={true}>
          {
            siteMap.pages.map( (page, index) =>
  	        <LinkSurface location={page.path}  
                         position={offset} 
                     linkPosition={[0,0, -0.35]}>{ page.path != "/" 
                                                ? page.title
                                                : location=="/" 
                                                    ? "./" 
                                                    : "../" }
            </LinkSurface>)
          }
      </Sequence>
    );
  };
