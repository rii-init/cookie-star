import { Camera, Vector3 } from 'three';
import { CameraPose } from './camera-pose';

export class CameraTrack {
    public poses = [] as CameraPose[]
  
    public interpolate(camera: Camera, distance: number) {

		if (distance < 0) return;
		if (distance > this.poses.length - 1) return;

		const pointA = this.poses[Math.floor(distance)];
		const pointB = this.poses[Math.ceil(distance)];

		const t2 = distance - Math.floor(distance);

		camera.position.lerpVectors(pointA.position, pointB.position, t2);
		camera.lookAt(pointA.target.lerpVectors(pointA.target, pointB.target, t2));
   	}

   public init() {
	this.poses = [
		{
			position: new Vector3(0,  0.8,   3.5),
			target:   new Vector3(0,  0,   -20)
		},
		{
			position: new Vector3(1,  0.6,  -9),
			target:   new Vector3(0,  1.6, -20)
		},	
		{
			position: new Vector3(-1, 1.4, -13),
			target:   new Vector3(0,  1.6, -20)
		},	
		{
			position: new Vector3(0,  0.6, -20),
			target:   new Vector3(0,  1.6, -25)
		}
	];
   }
}
