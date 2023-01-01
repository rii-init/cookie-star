import React from 'react';
import { useLocation, Link, Route } from "wouter";

import './App.css';
import { conference_centre } from './400_scene/conference_centre/conference_centre';
import { main }              from './400_scene/home/main';
import { tools }             from './400_scene/lab/lab';
import { nature }            from './400_scene/nature/nature';
import { show_room }         from './400_scene/show_room/show_room';


const CurrentLocation = () => {
  const [location, setLocation] = useLocation();

  return (
    <div className="navigation">
      <a className={ location == "/"         ? "active" : "" } onClick={() => setLocation("/")}>🐈</a>
      <a className={ location == "/cv"       ? "active" : "" } onClick={() => setLocation("/cv")}>CV</a>
      <a className={ location == "/tools"    ? "active" : "" } onClick={() => setLocation("/tools")}>Tools</a>
      <a className={ location == "/contact"  ? "active" : "" } onClick={() => setLocation("/contact")}>Contact</a>
      <a className={ location == "/elements" ? "active" : "" } onClick={() => setLocation("/elements")}>Elements</a>
    </div>
  );
};


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CurrentLocation />
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
