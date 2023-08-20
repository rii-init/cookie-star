import { Camera, Vector3 } from 'three';
import { CameraPose } from './camera-pose';
import { Universe } from '../../../0000_concept/universe';

export class CameraTrack {
    public poses = [] as CameraPose[];
	public currentPosition = new Vector3(0,0,0);
	
	private maxScroll = 1;

  
    public interpolate(camera: Camera, distance: number) {

		if (distance < 0) return;
		if (distance >= this.poses.length - 1) return;

		const pointA = this.poses[Math.floor(distance)];
		const pointB = this.poses[Math.ceil(distance)];

		const t2 = distance - Math.floor(distance);

		camera.position.lerpVectors(pointA.position, pointB.position, t2);
		camera.lookAt(pointA.target.lerpVectors(pointA.target, pointB.target, t2));
		
		this.currentPosition = camera.position;
   	}

	public getScrollDomain() {
		return this.poses.length - 1;
	}

   	public init() {
		this.poses = this.defaultCameraPoses();
   	}

	public setCameraPosesToDefault() {
		this.poses = this.defaultCameraPoses();
		this.calculateMaxScroll();
	}

	public setCameraPoses(poses: CameraPose<[number, number, number]>[]) {

		this.poses = poses.map(pose => {
			return {
				position: new Vector3(...pose.position),
				target:   new Vector3(...pose.target)
			}
		});
		
		this.calculateMaxScroll();
	}

	private calculateMaxScroll() {
		this.maxScroll = this.getScrollDomain();
		Universe.state.scrolling.$scrollDomain.next(this.maxScroll);
	}

    private defaultCameraPoses(): CameraPose[] {
		return [
			{
				position: new Vector3(0,  0.8,   4.5),
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
		]
	}
}
