import THREE, { BackSide, Mesh } from "three"
import { Universe } from "../../0000_concept/universe"
import { themeIdx } from "../../1000_aesthetic/visual-theme.manager"
import { CloudFormation } from "./cloud.formation"
import { Galaxy } from "./galaxy"
import { useLayoutEffect, useRef } from "react"


const fragmentShader = /* glsl */ `
precision highp float;

uniform vec3 skyColor;
uniform vec3 skyColor2;
uniform vec3 ambientLight;
uniform vec3 celestiaLight;

varying vec2 vUv;

void main( void ) {
	float color = 0.232; 
    vec3 blendedSky = skyColor;

	//if (vUv.y < 0.65 && vUv.y > 0.35) {
		color = -0.4 + ( 1.0-(2.54*abs(vUv.y-0.5)) );
        // blend sky color with sky color 2 based on vUv.y
        blendedSky = skyColor - mix(skyColor, skyColor2, 0.5-abs(vUv.y/2.0 -0.5)) * (1.0 -vUv.y * 2.0);
        
	//}

	gl_FragColor = vec4( max(
                                vec3( color * celestiaLight.x /2.0 + blendedSky.x*0.9, 
                                      color * celestiaLight.y /2.0 + blendedSky.y*0.9, 
                                      color * celestiaLight.z /2.0 + blendedSky.z*0.9),
                                vec3( skyColor ) 
                            ),
                         1.0
    );

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
        skyColor2:      [number, number, number],
        celestialLight: [number, number, number],
        ambientLight:   [number, number, number]
    }) => {
    const uniforms = {
        skyColor:      { value: p.skyColor       },
        skyColor2:     { value: p.skyColor2      },
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
                                         skyColor2={Universe.skyColor2}
                                   celestialLight={Universe.colors.celestialLightColor} 
                                     ambientLight={Universe.colors.ambientLightColor}
                />
                <sphereGeometry attach="geometry" args={[900, 32, 32]} />
                { themeIdx == 1 
                ? (
                    <Galaxy />
                  )
                : null
                }
            </mesh>
            
            <CloudFormation />
        </group>
    )
}
