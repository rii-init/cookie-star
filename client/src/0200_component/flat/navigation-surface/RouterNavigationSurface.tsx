import { useLocation, Link } from "wouter";

export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
  
    return (
      <div className="navigation">
        <a className={ location == "/"     ? "active" : "" } onClick={() => setLocation("/")}>🐈</a>
        <a className={ location == "/cv"   ? "active" : "" } onClick={() => setLocation("/cv")}>CV</a>
        <a className={ location == "/tech"  ? "active" : "" } onClick={() => setLocation("/tech")}>Tech</a>
        <a className={ location == "/chat" ? "active" : "" } onClick={() => setLocation("/chat")}>Chat</a>
        <a className={ location == "/meta" ? "active" : "" } onClick={() => setLocation("/meta")}>Meta</a>
      </div>
    );
  };