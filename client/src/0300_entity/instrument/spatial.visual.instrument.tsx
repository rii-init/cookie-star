import { useEffect, useState } from "react";
import { BehaviorSubject, Observable, Subject, debounceTime, of } from "rxjs";
import { Vector3 } from "three";

export class SpatialVisualInstrumentState {

    public state: BehaviorSubject<{ position: Vector3, color: number }[]>;

    private addSubject = new Subject<{ position: Vector3, color: number }>();

    constructor() {
        this.state = new BehaviorSubject([] as { position: Vector3, color: number }[]);
        
        this.addSubject.pipe(debounceTime(15))
                        .subscribe(({ position, color }) => {
                            this.state.next(
                                this.state.value.concat([{ 
                                    position: position.clone(), 
                                    color 
                                }])
                            );

                        });
        
    }

    public clear() {
        this.state.next([]);
    }

    public add(position: Vector3, color: number) {
        // validation:
        if (!window.location.search.includes("debug")) return;
        // action:
        this.addSubject.next({ position, color });
    }
}


export const spatialVisualInstrumentState = new SpatialVisualInstrumentState();


export const SpatialVisualInstrument = (p: {axisOrigin: number[]}) => {

    const [instrumentState, setState] = useState(spatialVisualInstrumentState.state.value);

    useEffect(() => {
        const subscription = spatialVisualInstrumentState.state.subscribe(setState);
        return () => subscription.unsubscribe();
    }, []);


    return (
        window.location.search.includes("debug")
            ? (
                <group>
                    <group position={p.axisOrigin ? new Vector3().fromArray(p.axisOrigin) : undefined}>
                        <axesHelper args={[1]} />
                        <gridHelper args={[50, 50, 0xffffff, 0xa555a5]}  />
                    </group>
                    <group>
                        {
                            instrumentState.map((state, i) => (
                                <group key={i}>
                                    <mesh position={state.position} >
                                        <sphereGeometry args={[0.1, 16, 16]} />
                                        <meshBasicMaterial color={state.color} />
                                    </mesh>
                                </group>
                            ))
                        }
                    </group>
                </group>
            )
            : null
    );
}