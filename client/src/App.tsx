import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {  PointerLockControls,
          PerspectiveCamera
} from '@react-three/drei'

import { Route, Router, Switch } from "wouter";

import './App.css';

import { conference_centre } from './0400_scene/chat/conference_centre';
import { main }              from './0400_scene/home/main';
import { tools }             from './0400_scene/tool/lab';
import { nature }            from './0400_scene/elements/nature';
import { show_room }         from './0400_scene/cv/show_room';
import { RouterNavigationSurface } from './0200_component/flat/navigation-surface/RouterNavigationSurface';
import { ProgressiveEnhance } from './progressive-enhance';

import { Controllers, Hands, VRButton, XR } from '@react-three/xr';

import { Canvas, useFrame } from '@react-three/fiber';

import { TallBox } from './0300_entity/lilac-box';
import { ThreeJSContext } from './0000_api/three-ctx';
import { Universe } from './0000_concept/universe';
import { UserCTL } from './0700_life/control/control';
import { ResizeCanvas } from './0000_concept/resize-canvas';


const R3FCanvas = Canvas as any;


function App() {
  
  useEffect(() => {
      ProgressiveEnhance.LoadHeading();
      ProgressiveEnhance.LoadMain();
  }, []);

  return (
    <>
      <div className="fullScreen">
        <VRButton />
        <R3FCanvas        id="r3f-canvas"
                   className="fullScreen"
                  pixelRatio={window.devicePixelRatio}    
        >
          <color attach="background" 
                   args={Universe.colors.background} />
          <XR>

            <ThreeJSContext callback={
                (ctx)=> { 
                    Universe.ctx3 = ctx;
                    
                    ctx.gl.setPixelRatio(window.devicePixelRatio || 1)
                    Universe.canvas = document.querySelector("#r3f-canvas");
                    Universe.user_controls = new UserCTL(Universe.ctx3) 

                    useFrame((state, delta, xrFrame) => {
                      if (Universe.user_controls) {
                        Universe.user_controls.update(delta);
                      }
                    })
                }} 
            />
            <ResizeCanvas />
            
            <Controllers />
            <Hands />
            
            <gridHelper />
            <axesHelper />
            
            <pointLight   intensity={1.0} position={[5, 5, 5]} />
            <ambientLight intensity={0.5} />

            <TallBox position={[0, 1.6, 4.5]} />
          
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
              <Route      path="/"         component={main}   />
              <Route      path="/elements" component={nature} />
              <Route      path="/tools"    component={tools}  />
              <Route      path="/chat"     component={conference_centre} />
              <Route      path="/cv"       component={show_room}         />
            </Switch>
          </article>
        </Router>
      </div>
    </>
  );
}

export default App;
