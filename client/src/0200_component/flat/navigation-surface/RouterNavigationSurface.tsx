import { Html } from "@react-three/drei";
import { useLocation, Link } from "wouter";
import { Sequence } from "../../../0100_element/200_sequence/sequence";
import { LinkSurface } from "../scalar/LinkSurface";

export const RouterNavigationSurface = () => {
    const [location, setLocation] = useLocation();
  
    return (
      <group className="navigation">

        <Sequence direction="x">
          <LinkSurface location="/"     current={location}>🐈</LinkSurface>
          <LinkSurface location="/cv"   current={location}>CV</LinkSurface>
          <LinkSurface location="/tech" current={location}>Tech</LinkSurface>
          <LinkSurface location="/chat" current={location}>Chat</LinkSurface>
          <LinkSurface location="/meta" current={location}>Meta</LinkSurface>
        </Sequence>

      </group>
    );
  };