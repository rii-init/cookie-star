import THREE, { BackSide, Mesh, MeshBasicMaterial, SphereGeometry, Vector2 } from "three"
import { Universe } from "../../0000_concept/universe"
import { themeIdx } from "../../1000_aesthetic/visual-theme.manager"
import { CloudFormation } from "./cloud.formation"
import { Galaxy } from "./galaxy"
import { useLayoutEffect, useRef } from "react"


const fragmentShader = /* glsl */ `
precision highp float;

uniform vec3 skyColor;
uniform vec3 ambientLight;
uniform vec3 celestiaLight;

varying vec2 vUv;

void main( void ) {
	float color = 0.532; 
	
	if (vUv.y < 0.65 && vUv.y > 0.35) {
		color = -0.1 + ( 1.0-(2.54*abs(vUv.y-0.5)) );
        
	}

	gl_FragColor = vec4( vec3( color * celestiaLight.x  +  skyColor.x*0.9, 
                                   color * celestiaLight.y  +  skyColor.y*0.9, 
                                   color * celestiaLight.z  +  skyColor.z*0.9), 1.0 );

}
`;

const vertexShader = /* glsl */`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;


export const SkySphereMaterial = (p: { 
        skyColor:       [number, number, number],
        celestialLight: [number, number, number],
        ambientLight:   [number, number, number]
    }) => {
    const uniforms = {
        skyColor:      { value: p.skyColor       },
        celestiaLight: { value: p.celestialLight },
        ambientLight:  { value: p.ambientLight   } 
    };

    return (
        <shaderMaterial
            uniforms={uniforms}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            side={BackSide}
            attach="material"
        />
    )
}

export const Atmosphere = () => {
    const skyRef = useRef<Mesh>(null);

    useLayoutEffect(() => {
        if (skyRef.current) {
            Universe.sky = skyRef.current;
        }
    }, [skyRef])


    return (
        <group>
            <mesh ref={skyRef}>
                <SkySphereMaterial       skyColor={Universe.skyColor} 
                                   celestialLight={Universe.colors.celestialLightColor} 
                                     ambientLight={Universe.colors.ambientLightColor}
                />
                <sphereBufferGeometry attach="geometry" args={[900, 32, 32]} />
            </mesh>
            { themeIdx == 1 
                ? (
                    <Galaxy />
                  )
                : null
            }
            <CloudFormation />
        </group>
    )
}
