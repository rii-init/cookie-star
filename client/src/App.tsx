import React, { useEffect } from 'react';
import { Route } from "wouter";

import './App.css';

import { conference_centre } from './400_scene/chat/conference_centre';
import { main }              from './400_scene/home/main';
import { tools }             from './400_scene/tool/lab';
import { nature }            from './400_scene/elements/nature';
import { show_room }         from './400_scene/cv/show_room';
import { RouterNavigationSurface } from './200_component/flat/navigation-surface/RouterNavigationSurface';
import { ProgressiveEnhance } from './progressive-enhance';

import { Controllers, Hands, VRButton, XR } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';

import { LilacBox } from './300_entity/lilac-box';
import { ThreeJSContext } from './000_api/three-ctx';

let ctx3: any = null;
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
        <R3FCanvas className="fullScreen"
                pixelRatio={window.devicePixelRatio}
        >
          <XR>
            <ThreeJSContext callback={
                (ctx)=> { 
                    ctx3 = ctx;
                    ctx3.gl.setPixelRatio(window.devicePixelRatio || 1)
                    console.log("ThreeJSContext: ", ctx);
                    
                }} 
            />
            <Controllers />
            <Hands />
            
            <gridHelper />
            <axesHelper />
            
            <pointLight intensity={1.0} position={[5, 5, 5]} />
            <ambientLight intensity={0.5} />

            <LilacBox />
          
          </XR>
        </R3FCanvas>
        <div className="App">  
          <header className="App-header">
            <RouterNavigationSurface />
          </header>
          <article>
            <Route      path="/"         component={main}   />
            <Route      path="/elements" component={nature} />
            <Route      path="/tools"    component={tools}  />
            <Route      path="/chat"     component={conference_centre} />
            <Route      path="/cv"       component={show_room}         />
          </article>
        </div>
      </div>
    </>
  );
}

export default App;
