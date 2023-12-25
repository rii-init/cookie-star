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
    
    let xOffset = 0;
    function xFunction(n: number) {
      return n + xOffset;
    }
    function getTextWidth(text: string) {
      return text.length * 0.2;
    }
    return (
      <group position={[-1.32,4,-1]} 
             rotation={[Math.PI / 8, 0, 0]}>
          
          {
            siteMap.pages.map( (page, index) => {
              
              xOffset += getTextWidth(page.title) + 0.2;
              console.log("index, xOffset", index, xOffset);

                return <LinkSurface location={page.path}  
                                    position={[offset[0] +xOffset, offset[1], offset[2]]} 
                                         key={index}
                                     justify="center"
                                linkPosition={[0,0, -0.35]}>{ page.path != "/" 
                                                  ? page.title
                                                  : location=="/" 
                                                      ? "./" 
                                                      : "../" }
                       </LinkSurface>
            })
          }

      </group>
    );
  };
