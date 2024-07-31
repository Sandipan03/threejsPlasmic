/**@format */
import { Canvas, useFrame} from '@react-three/fiber'
import { useRef,useState} from 'react'
import {OrbitControls,MeshWobbleMaterial} from '@react-three/drei'
const Cube=({position,size,color})=>{
    const [isHovered, setisHovered] = useState(false)
    const ref=useRef()
    useFrame((state,delta)=>{
        const speed=isHovered?2:1
        ref.current.rotation.x+=delta*speed
        // ref.current.rotation.y+=delta*speed
        ref.current.position.y=Math.sin(state.clock.elapsedTime)*2
        
    })
    return (
        <mesh position={position} 
        ref={ref}
        onPointerEnter={(event)=>(event.stopPropagation(),setisHovered(true))}
        onPointerLeave={()=>setisHovered(false)}
        scale={isHovered?1.2:1}
        >
            <boxGeometry args={size}/>
            {/* <meshStandardMaterial color={isHovered?"red":color} wireframe/> */}
            <MeshWobbleMaterial factor={isHovered?1:0.8} speed={isHovered?5:3} color={isHovered?"red":color}  />
        </mesh>
    )
}
export default function Block({className,propColor='yellow',propsize=[2,2,2]}){
    
    return (
        <Canvas className={className}>
            <directionalLight position={[0,0,2]}/>
            {/* <ambientLight intensity={0.5}/> */}
            <Cube position={[0,0,0]} size={propsize} color={propColor}/>
            <OrbitControls/>
        </Canvas>
    )
}