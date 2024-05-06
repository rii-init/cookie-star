import { useEffect, useState } from "react";
import { BehaviorSubject, Observable, Subject, debounceTime, of } from "rxjs";
import { Vector3 } from "three";

/**
 * Example usage for logging spatial data in the 3D scene:
 * 
 * ```ts
 * spatialVisualInstrumentState.add(
 *              new Vector3(...this.camera.matrix.elements.slice(12, 15) as [number, number, number]), 0xccff00);
 * ```
 *  This assumes the view component (SpatialVisualInstrument) is mounted in the scene.
 */

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


export const SpatialVisualInstrument = (p: {axisOrigin: number[], grid?: boolean}) => {

    const [instrumentState, setState] = useState(spatialVisualInstrumentState.state.value);

    useEffect(() => {
        const subscription = spatialVisualInstrumentState.state.subscribe(setState);
        return () => subscription.unsubscribe();
    }, []);


    return (
        window.location.search.includes("debug")
            ? (
                <group>
                    { p.grid ? 
                        <gridHelper position={p.axisOrigin ? new Vector3().fromArray(p.axisOrigin) : undefined} 
                                        args={[50, 50, 0xffffff, 0xa555a5]}  /> 
                        : null
                    }
                    <group>
                        {
                            instrumentState.map((state, i) => (
                                <mesh key={i} position={state.position} >
                                        <sphereGeometry args={[0.1, 16, 16]} />
                                        <meshBasicMaterial color={state.color} />
                                </mesh>        
                            ))
                        }
                    </group>
                </group>
            )
            : null
    );
}