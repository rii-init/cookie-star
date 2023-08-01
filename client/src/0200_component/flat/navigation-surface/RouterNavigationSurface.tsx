import { useLocation, Link } from "wouter";
import { Sequence } from "../../../0100_element/200_sequence/sequence";
import { LinkSurface } from "../scalar/LinkSurface";
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
      <group className="navigation">

        <Sequence direction="x" polarity={1} 
                                position={[-1.32,1.6,-1]} 
                                   color={[250,250,250]} 
                             itemPadding={-0.333}>
          {
            siteMap.pages.map( (page, index) =>
  	        <LinkSurface location={page.path}     
                          current={location} 
                         position={offset} 
                     linkPosition={[0,0,0]}>{ page.path != "/" 
                                                ? page.title
                                                : location=="/" 
                                                    ? "./" 
                                                    : "../" }
            </LinkSurface>)
          }
        </Sequence>

      </group>
    );
  };
