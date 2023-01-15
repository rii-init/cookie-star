import React, { useEffect, useRef } from 'react';

import { Route, Router, Switch } from "wouter";

import './App.css';

import { conference_centre } from './0400_scene/chat/conference_centre';
import { main }              from './0400_scene/home/main';
import { lab }               from './0400_scene/tech/lab';
import { nature }            from './0400_scene/meta/nature';
import { show_room }         from './0400_scene/cv/show_room';

import { ProgressiveEnhance } from './progressive-enhance';

import { Controllers, Hands, VRButton, XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';

import { ThreeJSContext } from './0000_api/three-ctx';
import { Universe } from './0000_concept/universe';
import { ResizeCanvas } from './0000_concept/resize-canvas';
import { themeIdx, VisualThemeManager } from './1000_aesthetic/visual-theme.manager';

import { TallBox }     from './0300_entity/lilac-box';
import { GridOctaves } from './0300_entity/grid-octaves';
import { RouterNavigationSurface } from './0200_component/flat/navigation-surface/RouterNavigationSurface';
import { Enter3DButton }    from './0200_component/flat/2d/enter-3d-button';
import { InfiniteUniverse } from './0200_component/infinite-universe';
import { Cursor } from './0200_component/hud/cursor';


const R3FCanvas = Canvas as any;


function App() {
  
  useEffect(() => {
      ProgressiveEnhance.LoadHeading();
      ProgressiveEnhance.LoadMain();
  }, []);

  return (
    <>
      <div className={"fullScreen theme _"+themeIdx}>
        
        <div id="ui_2d__button_container">
          <VisualThemeManager />  
          <Enter3DButton className="ui_2d__button" 
               controllersAttached={Universe.user_controls?.controllersAttached} />
          
          <VRButton className="ui_2d__button" 
                        style={{
                          display: Universe.user_controls?.controllersAttached ? "inline-block" : "none"
                        }}
          />
        </div>

        <R3FCanvas        id="r3f-canvas"
                   className="fullScreen"
                  pixelRatio={window.devicePixelRatio}    
        >
          <color attach="background" 
                   args={Universe.colors.background} />
          <XR>

            <ThreeJSContext />
            <ResizeCanvas />
            <Cursor hide={false} 
               activated={0.1 || Universe?.user_controls?.cursorActivated}
               position={[0,0,-1]}
            />  
            <Controllers />
            <Hands />
            
            <pointLight   intensity={1.0} position={[0, 5, 0]} />
            <ambientLight intensity={0.5} />

            
            <InfiniteUniverse>

            </InfiniteUniverse>
          
          </XR>
          
          <Router>
              <group className="App-header">
                <RouterNavigationSurface />
              </group>
              <Switch>
                <Route path="/"     component={main}   />
                <Route path="/meta" component={nature} />
                <Route path="/tech" component={lab}  />
                <Route path="/chat" component={conference_centre} />
                <Route path="/cv"   component={show_room}         />
              </Switch>
          </Router>
          
        </R3FCanvas>
      </div>
    </>
  );
}

export default App;
