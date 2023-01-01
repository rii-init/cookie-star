import React from 'react';
import { Route } from "wouter";

import './App.css';
import { conference_centre } from './400_scene/conference_centre/conference_centre';
import { main }              from './400_scene/home/main';
import { tools }             from './400_scene/lab/lab';
import { nature }            from './400_scene/nature/nature';
import { show_room }         from './400_scene/show_room/show_room';
import { RouterNavigationSurface } from './200_component/flat/navigation-surface/RouterNavigationSurface';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ultr7A!</h1>
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
  );
}

export default App;
