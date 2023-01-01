import { useLocation, Link } from "wouter";

export const RouterNavigationSurface = () => {
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