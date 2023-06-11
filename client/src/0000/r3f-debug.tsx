import { Text } from "@react-three/drei";
import React, { JSXElementConstructor, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { Color, Group, Mesh } from "three";


export class DiagnosticState {
    messages = new BehaviorSubject<string[]>([]);
    
    public addMessage(message: string)  {
        diagnosticState.messages.next([...diagnosticState.messages.value, message]);
    }

    public solo(message: string) {
        diagnosticState.messages.next([message]);
    }
}

export const diagnosticState = new DiagnosticState(); 


export const R3FDiagnosticText = () => {
    const [messages, setMessages] = React.useState<string[]>([]);
    
    useEffect(() => {
        const sub = diagnosticState.messages.subscribe((messages: string[]) => {
            setMessages(messages);
        });

        return () => {
            sub.unsubscribe();
        }
    }, []);

    return (
        window.location.search.includes("debug") 
            ? <group position={[ -4.5, 1, -3 ]} rotation={[0, Math.PI / 5, 0]} >
                    <mesh position={[0, 0.5, -1]}>
                        <boxBufferGeometry args={[6,5.2,0.2]} />
                        <meshBasicMaterial color="black" transparent={true} opacity={0.9} />
                    </mesh>
                    {
                        messages.length === 0 
                            ?   <group position={[0, 2, 0]} >
                                    <Text
                                        scale={[0.5, 0.5, 0.5]}
                                        color={new Color("#f26020")}>
                                        It's now safe to read 
                                    </Text>
                                    <Text   position={[0, -0.5, 0]}
                                            scale={[0.5, 0.5, 0.5]}
                                            color={new Color("#f26020")}>
                                        console messages. 
                                    </Text>
                                </group>
                            : null
                    }
                    {
                        messages.map((message: string, index: number) => {
                            return (
                                <Text
                                    key={index}
                                    scale={[0.35, 0.35, 0.35]}
                                    position={[-2.5, 2 - index * 0.5, 0.5]} 
                                    anchorX="left"
                                    color={new Color("#ffffff")} >
                                        { message }
                                </Text>
                            );
                        })
                    }
              </group>
            : null
    )
}