import React from 'react';
import { Link, Route } from "wouter";

import './App.css';
import { conference_centre } from './scene/conference_centre/conference_centre';
import { main } from './scene/home/main';
import { tools } from './scene/lab/lab';
import { nature } from './scene/nature/nature';
import { show_room } from './scene/show_room/show_room';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Link href="/">
        <a className="nav-item">🐈</a>
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
