import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three"; 
import { useRecoilValue } from "recoil"; 
import { defaultColorAtom } from "../../recoil/atom/color";

export function CupsModel(props) {
  const { nodes, materials } = useGLTF(
    "./models/uploads_files_2727432_mug.glb"
  );
  const selectedColor =   useRecoilValue(defaultColorAtom); 

  const mugColor = new MeshStandardMaterial({ color: selectedColor }); 


  materials["Material.001"] = mugColor; 

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle.geometry}
        material={mugColor} 
        position={[-0.07, 0, 2.232]}
        scale={0.621}
      />
    </group>
  );
}

useGLTF.preload("./models/uploads_files_2727432_mug.glb");
