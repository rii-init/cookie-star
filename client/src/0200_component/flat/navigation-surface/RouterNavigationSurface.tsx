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

function getTextWidth(text: string) {
  return Math.max(text.length * 0.12, 0.4);
}

function calculateXOffset(
  pages: {
    title: string;
    path: string;
  }[]
) {
  let xOffset = 0;
  pages.forEach((page) => {
    xOffset += getTextWidth(page.title);
  });
  return xOffset;
}


export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
    const offset = [0,-0.1, 0.4] as [number, number, number];
    
    let previousXOffset = 0,
                xOffset = 0;
    
    const groupXOffset = calculateXOffset(siteMap.pages) / 1.45;

    return (
      <group position={[0,4,-1]} 
             rotation={[Math.PI / 8, 0, 0]}>
          
          {
            siteMap.pages.map( (page, index) => {
              xOffset = previousXOffset;
              previousXOffset += getTextWidth(page.title) + 0.25;
              
                return <LinkSurface location={page.path}  
                                    position={[offset[0] +xOffset - groupXOffset, offset[1], offset[2]]} 
                                         key={index}
                                     justify="left"
                                linkPosition={[getTextWidth(page.title)/2, 0, -0.35]}>{ page.path != "/" 
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
