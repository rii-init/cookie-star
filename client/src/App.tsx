import React from 'react';
import { useLocation, Link, Route } from "wouter";

import './App.css';
import { conference_centre } from './400_scene/conference_centre/conference_centre';
import { main }              from './400_scene/home/main';
import { tools }             from './400_scene/lab/lab';
import { nature }            from './400_scene/nature/nature';
import { show_room }         from './400_scene/show_room/show_room';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Link href="/">
        <a className="nav-item">🐈 </a>
      </Link>
      <Link href="/elements">
        <a className="nav-item">Elements</a>
      </Link>
      <Link href="/">
        <a className="nav-item">Tools</a>
      </Link>
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
