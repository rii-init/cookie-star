import React, { Suspense, useState } from "react";

import { Canvas, useThree } from "@react-three/fiber";
import { Loader, OrbitControls, softShadows } from "@react-three/drei";
import { useSpring }        from "react-spring";

// App components

const App = () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Canvas
          camera={{ position: [-5, 4, 4], fov: 40 }}>
          {/* <Lights /> */}
          <Suspense fallback={null}>
        
          </Suspense>
        </Canvas>
        
        <Loader />

      </>
    );
  };
  
  export default App;