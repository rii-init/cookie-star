/* Inspired by https://codesandbox.io/s/9ryxq?file=/src/index.tsx:441-1683
/* which in turn was inspired by
/* inspired by https://twitter.com/yeemachine/status/1414993821583118341 */

import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Object3D } from "three"
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMUtils } from '@pixiv/three-vrm'

const VRMAvatar = () => {
  
    const { scene, camera } = useThree()
  
    return (
      <group>
      </group>
    )
  } 