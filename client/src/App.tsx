import React, { createContext, useEffect, useRef } from 'react';

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

import { RouterNavigationSurface } from './0200_component/flat/navigation-surface/RouterNavigationSurface';
import { InfiniteUniverse } from './0200_component/infinite-universe';
import { Cursor } from './0200_component/hud/cursor';


const R3FCanvas = Canvas as any;

export const UniverseContext = createContext(Universe);

function App() {
  
  useEffect(() => {
      ProgressiveEnhance.LoadHeading();
      ProgressiveEnhance.LoadMain();
  }, []);

  return (
      <div className={"fullScreen theme _"+themeIdx}>
        
        <div id="ui_2d__button_container">
          <VisualThemeManager />  
          <VRButton className="ui_2d__button" />
        </div>

        <R3FCanvas        id="r3f-canvas"
                   className="fullScreen"
                  pixelRatio={window.devicePixelRatio} 
                          gl={{ alpha: false }}
        >
          <color attach="background" 
                   args={Universe.colors.background} />
          <XR>

            <ThreeJSContext />
            <ResizeCanvas />
            <Cursor hide={false} 
               activated={0.05 || Universe?.user_controls?.cursorActivated}
                position={[0,0,-1]}
            />  
            <Controllers />
            <Hands />
            
            <pointLight   intensity={1.3} position={[0, 5, 0]} />
            <ambientLight intensity={0.6} />

            
            <InfiniteUniverse>

            </InfiniteUniverse>
          
          </XR>
          <UniverseContext.Provider value={Universe}>
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
          </UniverseContext.Provider>
          
        </R3FCanvas>
      </div>
  );
}

export default App;
