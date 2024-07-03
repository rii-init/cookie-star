import { Camera, Vector3 } from 'three';
import { CameraPose } from './camera-pose';
export declare class CameraTrack {
    poses: CameraPose<Vector3>[];
    currentPosition: Vector3;
    private maxScroll;
    interpolate(camera: Camera, distance: number): void;
    getScrollDomain(): number;
    init(): void;
    setCameraPosesToDefault(): void;
    setCameraPoses: (poses: CameraPose<[number, number, number]>[]) => void;
    private calculateMaxScroll;
    private defaultCameraPoses;
}
//# sourceMappingURL=camera-track.d.ts.map