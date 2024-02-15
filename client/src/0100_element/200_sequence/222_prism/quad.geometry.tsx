import React from "react";
function Quad(props: { width: number, height: number }) {
   // Define vertices of the quad
   const vertices = React.useMemo(() => new Float32Array([
    -props.width / 2,  props.height / 2, 0,  // top left
    -props.width / 2, -props.height / 2, 0, // bottom left
     props.width / 2, -props.height / 2, 0,  // bottom right
     props.width / 2,  props.height / 2, 0    // top right
    ]), [props.height, props.width]);

// Define indices of the quad
const indices = React.useMemo(() => new Uint16Array([
    0, 1, 1, 2, 2, 3, 3, 0 // Edges of the quad
]), []);

return (
    <bufferGeometry attach="geometry">
        <bufferAttribute
            attach='attributes-position'
            count={vertices.length / 3}
            array={vertices}
            itemSize={3}
        />
        <bufferAttribute
            attach='index'
            count={indices.length}
            array={indices}
            itemSize={1}
        />
    </bufferGeometry>
);
}

export default Quad;