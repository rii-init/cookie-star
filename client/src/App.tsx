import React, { createContext, useEffect, useRef } from 'react';

import { Route, Router, Switch } from "wouter";

import './App.css';

import { Conference_centre } from './0400_scene/chat/conference_centre';
import { Main }              from './0400_scene/home/main';
import { Lab }               from './0400_scene/tech/lab';
import { Nature }            from './0400_scene/meta/nature';
import { Show_room }         from './0400_scene/cv/show_room';

import { Controllers, Hands, useController, useXR, VRButton, XR, XREvent, XRManagerEvent } from '@react-three/xr';
import { Canvas, useFrame } from '@react-three/fiber';

import { ResizeObserver } from '@juggle/resize-observer';

import { ThreeJSContext } from './0000_api/three-ctx';
import { Universe } from './0000_concept/universe';
import { ResizeCanvas } from './0000_concept/resize-canvas';
import { themeIdx, VisualThemeManager } from './1000_aesthetic/visual-theme.manager';

import { RouterNavigationSurface } from './0200_component/flat/navigation-surface/RouterNavigationSurface';

import { NoToneMapping } from 'three';
import { ClimbingControls, xRControllerState } from './0700_life/control/climbing-controls';
import { ScrollingBuffer } from './0200_component/meta/scrolling-buffer';
import { Settings } from './0200_component/flat/2d/settings';
import { settingsState } from './0000/settings-state';
import { HudPortal } from './0200_component/hud/hud.portal';
import { setXRControllerBaseMatrixFromInputSources } from './0700_life/control/xr-controller-state';


const R3FCanvas = Canvas as any;

export const UniverseContext = createContext(Universe);
export const MagnetismContext = createContext(Universe.magnetism);



function App() {
  
  return (
      <div className={"fullScreen theme _"+themeIdx}>
        
        <div id="ui_2d__button_container">
          <Settings />
          <VRButton className="ui_2d__button" />
        </div>

        <R3FCanvas        id="r3f-canvas"
                   className="fullScreen"
                      resize={{ polyfill: ResizeObserver }} 
                          gl={{ alpha: false, toneMapping: NoToneMapping, antialias: settingsState.controls.aa.state }}
                   frameloop={ settingsState.controls.animation.state ? "always" : "demand" }
        >
          <color attach="background" 
                   args={Universe.colors.background} />
          <XR
            onInputSourcesChange={(event) => {
              // if ((event?.target as any)?.inputSources.length > 0) {
              //   setXRControllerBaseMatrixFromInputSources((event?.target as any).inputSources);
              // }
            }}

            onSessionStart={(event) => {

              Universe.xrMode = true;
              Universe.state.cursor.$parent.next(Universe.ctx3.scene);
             
            }}
            onSessionEnd={(event: XREvent<XRManagerEvent>) => {
              Universe.state.cursor.$parent.next(Universe.ctx3.camera);
              Universe.xrMode = false;
            }}
          >

            <ThreeJSContext />
            <ResizeCanvas />
            
            <Controllers 
              hideRaysOnBlur={true}
            />
            <Hands />
            
            <pointLight   position={[0, 15, 10]} 
                          intensity={Universe.colors.celestialLight.intensity}
                          distance={100000} 
                          color={Universe.colors.celestialLight.color} />
            <ambientLight intensity={Universe.colors.ambientLight.intensity} 
                          color={Universe.colors.ambientLight.color} />

            <UniverseContext.Provider value={Universe}>
              
              <ClimbingControls />

                {
                  <HudPortal hide={false}
                         position={Universe?.user_controls?.cursorPosition || [0, 0, -1]}                
                  />
                }     
                <MagnetismContext.Provider value={Universe.magnetism}>
                <ScrollingBuffer>
                    <Router>
                        <group className="App-header">
                            <RouterNavigationSurface />
                        </group>
                        <Switch>
                          <Route path="/"     component={Main}   />
                          <Route path="/meta" component={Nature} />
                          <Route path="/tech" component={Lab}  />
                          <Route path="/chat" component={Conference_centre} />
                          <Route path="/cv"   component={Show_room}         />
                        </Switch>
                    </Router>
                </ScrollingBuffer>
	          	  </MagnetismContext.Provider>
              
              

            </UniverseContext.Provider>

          </XR>
          
        </R3FCanvas>
      </div>
  );
}

export default App;
