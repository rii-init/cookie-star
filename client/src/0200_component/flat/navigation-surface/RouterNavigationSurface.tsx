import { Html } from "@react-three/drei";
import { useLocation, Link } from "wouter";
import { LinkSurface } from "../scalar/LinkSurface";

export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
  
    return (
      <group className="navigation">

        <LinkSurface location="/" current={location}>🐈</LinkSurface>
        <LinkSurface location="/cv" current={location}>CV</LinkSurface>
        <LinkSurface location="/tech" current={location}>Tech</LinkSurface>
        <LinkSurface location="/chat" current={location}>Chat</LinkSurface>
        <LinkSurface location="/meta" current={location}>Meta</LinkSurface>
        
      </group>
    );
  };