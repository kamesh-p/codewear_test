
import React from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three"; 
import { useRecoilValue } from "recoil"; 
import { defaultColorAtom } from "../../recoil/atom/color";

export function Shirts(props) {
  const defaultColor = useRecoilValue(defaultColorAtom); 

  const { nodes, materials } = useGLTF("./models/shirt_baked.glb");

  
  const shirtColor = new MeshStandardMaterial({ color: defaultColor });


  materials.lambert1 = shirtColor;

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      />
    </group>
  );
}

useGLTF.preload("./models/shirt_baked.glb");
