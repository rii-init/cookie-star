/* Inspired by https://codesandbox.io/s/9ryxq?file=/src/index.tsx:441-1683
/* which in turn was inspired by
/* inspired by https://twitter.com/yeemachine/status/1414993821583118341 */

import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Object3D } from "three"
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
// import { VRM, VRMSchema, VRMUtils } from '@pixiv/three-vrm'
/**
const VRMAvatar = () => {
  
    const { scene, camera } = useThree()
    const gltf = useGLTF('/vrm/three-vrm-girl.vrm')
    const avatar = useRef<VRM>()
    const [bonesStore, setBones] = useState<{ [part: string]: Object3D }>({})
  
    useEffect(() => {
      if (gltf) {
        VRMUtils.removeUnnecessaryJoints(gltf.scene)
        VRM.from(gltf as GLTF).then((vrm) => {
          avatar.current = vrm
          vrm.lookAt.target = camera
          vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips).rotation.y = Math.PI
  
          const bones = {
            neck: vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Neck),
            hips: vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.Hips),
            LeftShoulder: vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.LeftShoulder),
            RightShoulder: vrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName.RightShoulder)
          }
  
          // bones.RightShoulder.rotation.z = -Math.PI / 4
  
          setBones(bones)
        })
      }
    }, [scene, gltf, camera])
  
    useFrame(({ clock }, delta) => {
      if (avatar.current) {
        avatar.current.update(delta)
      }
      
    })
    return <primitive object={gltf.scene}></primitive>
  } */