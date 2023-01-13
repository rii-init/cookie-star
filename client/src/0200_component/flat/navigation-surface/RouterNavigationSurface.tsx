import { Html } from "@react-three/drei";
import { useLocation, Link } from "wouter";

export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
  
    return (
      <group className="navigation">
        <Html onClick={() => setLocation("/")}>
          <a className={ location == "/"     ? "active" : "" }>🐈</a>
        </Html>
        <Html onClick={() => setLocation("/cv")}>
          <a className={ location == "/cv"   ? "active" : "" }>CV</a>
        </Html>
        <Html onClick={() => setLocation("/tech")}>
          <a className={ location == "/tech"  ? "active" : "" }>Tech</a>
        </Html>
        <Html onClick={() => setLocation("/chat")}>
          <a className={ location == "/chat" ? "active" : "" }>Chat</a>
        </Html>
        <Html onClick={() => setLocation("/meta")}>
          <a className={ location == "/meta" ? "active" : "" }>Meta</a>
        </Html>
      </group>
    );
  };