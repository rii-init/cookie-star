import * as THREE from 'three';
import { Object3DNode } from '@react-three/fiber';

export declare type PerspectiveCameraProps = Object3DNode<THREE.PerspectiveCamera, typeof THREE.PerspectiveCamera> & { makeDefault?: boolean; };