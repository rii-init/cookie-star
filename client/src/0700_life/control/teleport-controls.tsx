import { useThree } from "@react-three/fiber";
import { XRController } from "@react-three/xr";
import { createContext, useEffect, useState } from "react";
import { Group, Intersection, Matrix4, Object3D, PerspectiveCamera, Raycaster } from "three";
import { Universe } from "../../0000_concept/universe";


export interface ExternalTeleportControlsProviders {
    gl?: any;
    scene?: any;
    intersections?: Intersection[];
    controller?: Group;
    grip?: Group;
    raycaster?: Raycaster;
}

export interface TeleportControlsProps {
    children?: React.ReactNode;
    
    api?: any // (api: { methods?: any }) => ExternalTeleportControlsProviders;
}


// based on https://codesandbox.io/s/r3f-vr-controllers-forked-kgv77q?file=/src/use-controller.tsx:1216-1224


interface XRInputSource {
    handedness: "left" | "right" | "none";
    gamepad: Gamepad;
}
  
  
export interface XRControllerMap {
    [key: string]: IXRController;
}

export interface IXRController {
    squeezing: boolean;
    selecting: boolean;
    inputSource: XRInputSource;
    grip: Group;
    // we can always get the world position etc. from the controller
    // TODO: add targetray, so that rays can be precisely positioned
    // https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource/targetRayMode
    // controllere actually returns the targetRaySpace!
    controller: Group;
    raycaster: Raycaster;
    getIntersects: (objects: any[]) => Intersection[];
}


const ControllersContext = createContext<any>([]);


function setUpController(
        idx: number, 
        gl:  any, 
        setState: (p: Function) => void,
        raycaster: Raycaster
    ): IXRController {
    
    const controller = gl.xr.getController(idx);
    const grip = gl.xr.getControllerGrip(idx);

  const getIntersects = (objects: Object3D[]) => {
    const tempMatrix = new Matrix4();
    tempMatrix.identity().extractRotation(controller.matrix);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrix);
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
    return raycaster.intersectObjects(objects, true);
  };

  const root: IXRController = {
    squeezing: false,
    selecting: false,
    inputSource: undefined as any,
    grip,
    controller,
    raycaster,
    getIntersects,
  };

  controller.addEventListener("connected", (e: any) =>
    setState(() => {
      root.inputSource = e.data;
      return root;
    })
  );
  controller.addEventListener("selectstart", () => {
    setState((controller: XRController) => {
      root.selecting = true;
      return controller;
    });
  });
  controller.addEventListener("selectend", () => {
    setState((controller: XRController) => {
        root.selecting = false;
      return controller;
    });
  });
  controller.addEventListener("squeezestart", () => {
    setState((controller: XRController) => {
        root.squeezing = true;
      return controller;
    });
  });
  controller.addEventListener("squeezeend", () => {
    setState((controller: XRController) => {
        root.squeezing = true;
      return controller;
    });
  });

  return root;
}




export const TeleportControls = (props: TeleportControlsProps) => {
    const [cursorVisible, setCursorVisible] = useState(false);
    const [intersection, setIntersection] = useState(null);
    const camera = Universe.ctx3.camera;

    let gl: any = null;
    
    // use external provider if possible... (basically, during testing)
    

    const three  = useThree();

    if (!gl) {
        gl = three.gl;
    }



    const [controllerStates, setControllerStates] = useState<XRControllerMap>();
    
    const setControllerState = (index: string | number) => (fn: any): void =>
    setControllerStates((prevTotalState: XRControllerMap | undefined) => {
      // this should mutate the controller instance specific state
      // @ts-ignore
      prevTotalState[index] = fn(prevTotalState[index]);
      return prevTotalState;
    });


    useEffect(() => { });
       

    return (
        <ControllersContext.Provider key="xr-ctrl-context" value={[]}>
          {props.children}
        </ControllersContext.Provider>
      );
};
