import React, { useEffect, useRef } from 'react';

import { Route, Router, Switch } from "wouter";

import './App.css';

import { conference_centre } from './0400_scene/chat/conference_centre';
import { main }              from './0400_scene/home/main';
import { lab }               from './0400_scene/tech/lab';
import { nature }            from './0400_scene/meta/nature';
import { show_room }         from './0400_scene/cv/show_room';
import { RouterNavigationSurface } from './0200_component/flat/navigation-surface/RouterNavigationSurface';
import { ProgressiveEnhance } from './progressive-enhance';

import { Controllers, Hands, VRButton, XR } from '@react-three/xr';

import { Canvas } from '@react-three/fiber';

import { TallBox } from './0300_entity/lilac-box';
import { ThreeJSContext } from './0000_api/three-ctx';
import { Universe } from './0000_concept/universe';
import { ResizeCanvas } from './0000_concept/resize-canvas';
import { VisualThemeManager } from './1000_aesthetic/visual-theme.manager';
import { BasicElectromagnetism } from './0700_life/control/basic-electromagnetism';


const R3FCanvas = Canvas as any;


function App() {
  
  useEffect(() => {
      ProgressiveEnhance.LoadHeading();
      ProgressiveEnhance.LoadMain();
  }, []);

  return (
    <>
      <div className="fullScreen">
        
        <div id="ui_2d__button_container">
          <VisualThemeManager />  
          <VRButton className="ui_2d__button" />
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
            
            <Controllers />
            <Hands />
            
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[32, 32, 32]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[16, 16, 16]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[8,  8,  8]} />
            <gridHelper args={[8,  8,  0xe0e0e0, "#e0e0e0"]} scale={[4,  4,  4]} />
            
            <pointLight   intensity={1.0} position={[0, 5, 0]} />
            <ambientLight intensity={0.5} />

            <TallBox position={[0, 1.6, -4.0]} />
          
          </XR>
        </R3FCanvas>
      </div>
      <div className="App">  
        <Router>
            <header className="App-header">
            <RouterNavigationSurface />
          </header>
          <article>
            <Switch>
              <Route      path="/"     component={main}   />
              <Route      path="/meta" component={nature} />
              <Route      path="/tech" component={lab}  />
              <Route      path="/chat" component={conference_centre} />
              <Route      path="/cv"   component={show_room}         />
            </Switch>
          </article>
        </Router>
      </div>
    </>
  );
}

export default App;
