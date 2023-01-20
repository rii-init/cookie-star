import React, { createContext, useEffect, useRef } from 'react';

import { Route, Router, Switch } from "wouter";

import './App.css';

import { conference_centre } from './0400_scene/chat/conference_centre';
import { main }              from './0400_scene/home/main';
import { lab }               from './0400_scene/tech/lab';
import { nature }            from './0400_scene/meta/nature';
import { show_room }         from './0400_scene/cv/show_room';

import { Controllers, Hands, useXR, VRButton, XR, XREvent, XRManagerEvent } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';

import { ThreeJSContext } from './0000_api/three-ctx';
import { Universe } from './0000_concept/universe';
import { ResizeCanvas } from './0000_concept/resize-canvas';
import { themeIdx, VisualThemeManager } from './1000_aesthetic/visual-theme.manager';

import { RouterNavigationSurface } from './0200_component/flat/navigation-surface/RouterNavigationSurface';
import { InfiniteUniverse } from './0200_component/infinite-universe';
import { Cursor } from './0200_component/hud/cursor';
import { R3FDebug } from './0000/r3f-debug';
import { NoToneMapping } from 'three';
import { GenderExpressionButton } from './0200_component/flat/2d/gender-expression-button';


const R3FCanvas = Canvas as any;

export const UniverseContext = createContext(Universe);

function App() {
  
  return (
      <div className={"fullScreen theme _"+themeIdx}>
        
        <div id="ui_2d__button_container">
          <GenderExpressionButton />
          <VisualThemeManager />  
          <VRButton className="ui_2d__button" />
        </div>

        <R3FCanvas        id="r3f-canvas"
                   className="fullScreen"
                  pixelRatio={window.devicePixelRatio} 
                          gl={{ alpha: false, toneMapping: NoToneMapping }}
        >
          <color attach="background" 
                   args={Universe.colors.background} />
          <XR
            onInputSourcesChange={(event: XREvent<XRSessionEvent>) => {
              console.log("onInputSourcesChange", event);
            }}

            onSessionStart={(event) => {
              console.log("onSessionStart", event);
              Universe.xrMode = true;

            }}
            onSessionEnd={(event: XREvent<XRManagerEvent>) => {
              console.log("onSessionEnd", event);
              Universe.xrMode = false;
            }}
          >

            <ThreeJSContext />
            <ResizeCanvas />
            
            <Cursor hide={false} 
               activated={0.05 || Universe?.user_controls?.cursorActivated}
                position={[0,0,-1]}
            />  
            
            <Controllers 
              hideRaysOnBlur={true}
            />
            <Hands />
            
            <pointLight   position={[2, 10, 10]} 
                          intensity={Universe.colors.celestialLight.intensity} 
                          color={Universe.colors.celestialLight.color} />
            <ambientLight intensity={Universe.colors.ambientLight.intensity} 
                          color={Universe.colors.ambientLight.color} />

            
            <InfiniteUniverse>
            </InfiniteUniverse>
          

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
          </XR>
          
        </R3FCanvas>
      </div>
  );
}

export default App;
