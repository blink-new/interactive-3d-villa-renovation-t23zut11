import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Box, Plane } from '@react-three/drei'
import { useRenovation } from '../context/RenovationContext'
import * as THREE from 'three'
import woodTextureImg from '../assets/textures/wood.jpg'
import roofTextureImg from '../assets/textures/roof.jpg'
import glassTextureImg from '../assets/textures/glass.png'

const Villa3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const { renovationState, setSelectedElement, setHoveredElement } = useRenovation()

  // Load textures
  const woodTexture = useLoader(THREE.TextureLoader, woodTextureImg)
  const roofTexture = useLoader(THREE.TextureLoader, roofTextureImg)
  const glassTexture = useLoader(THREE.TextureLoader, glassTextureImg)

  // Configure textures
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping
  woodTexture.repeat.set(1, 1)
  roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping
  roofTexture.repeat.set(2, 2)

  // Animation douce
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  const handleClick = (elementName: string) => {
    setSelectedElement(elementName)
  }

  const handlePointerOver = (elementName: string) => {
    setHoveredElement(elementName)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHoveredElement(null)
    document.body.style.cursor = 'auto'
  }

  return (
    <group ref={groupRef}>
      {/* Sol/Terrain */}
      <Plane
        args={[30, 30]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#4a7c59" />
      </Plane>

      {/* Allée */}
      <Box
        args={[12, 0.05, 2]}
        position={[0, 0, 6]}
        receiveShadow
      >
        <meshStandardMaterial color="#666666" />
      </Box>

      {/* Murs principaux */}
      <group>
        {/* Mur avant */}
        <Box
          args={[8, 3, 0.3]}
          position={[0, 1.5, 0]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.walls.color} metalness={0.1} roughness={0.7} />
        </Box>

        {/* Mur arrière */}
        <Box
          args={[8, 3, 0.3]}
          position={[0, 1.5, -4]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.walls.color} metalness={0.1} roughness={0.7} />
        </Box>

        {/* Mur gauche */}
        <Box
          args={[0.3, 3, 4]}
          position={[-4, 1.5, -2]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.walls.color} metalness={0.1} roughness={0.7} />
        </Box>

        {/* Mur droit */}
        <Box
          args={[0.3, 3, 4]}
          position={[4, 1.5, -2]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.walls.color} metalness={0.1} roughness={0.7} />
        </Box>
      </group>

      {/* Toit */}
      <group>
        <Box
          args={[8.5, 0.2, 4.5]}
          position={[0, 3.2, -2]}
          castShadow
          onClick={() => handleClick('roof')}
          onPointerOver={() => handlePointerOver('roof')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={roofTexture} color={renovationState.roof.tiles} metalness={0.3} roughness={0.8} />
        </Box>

        {/* Velux (si activé) */}
        {renovationState.roof.skylights && (
          <Box
            args={[1.2, 0.05, 1]}
            position={[1, 3.3, -1]}
            castShadow
            onClick={() => handleClick('roof')}
            onPointerOver={() => handlePointerOver('skylights')}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial map={glassTexture} color="#87CEEB" transparent opacity={0.7} metalness={0.9} roughness={0.1} />
          </Box>
        )}
      </group>

      {/* Porte d'entrée */}
      <Box
        args={[1, 2.2, 0.1]}
        position={[0, 1.1, 0.2]}
        castShadow
        onClick={() => handleClick('door')}
        onPointerOver={() => handlePointerOver('door')}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial map={woodTexture} color={renovationState.door.color} metalness={0.2} roughness={0.6} />
      </Box>

      {/* Poignée de porte */}
      <Box
        args={[0.05, 0.05, 0.15]}
        position={[0.4, 1.1, 0.25]}
        castShadow
      >
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.2} />
      </Box>

      {/* Fenêtres */}
      <group>
        {/* Fenêtre gauche */}
        <Box
          args={[1.5, 1.2, 0.1]}
          position={[-2, 1.8, 0.2]}
          castShadow
          onClick={() => handleClick('windows')}
          onPointerOver={() => handlePointerOver('windows')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial color={renovationState.windows.frame} metalness={0.3} roughness={0.5} />
        </Box>

        {/* Verre fenêtre gauche */}
        <Box
          args={[1.3, 1, 0.05]}
          position={[-2, 1.8, 0.25]}
        >
          <meshStandardMaterial map={glassTexture} color="#87CEEB" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
        </Box>

        {/* Fenêtre droite */}
        <Box
          args={[1.5, 1.2, 0.1]}
          position={[2, 1.8, 0.2]}
          castShadow
          onClick={() => handleClick('windows')}
          onPointerOver={() => handlePointerOver('windows')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial color={renovationState.windows.frame} metalness={0.3} roughness={0.5} />
        </Box>

        {/* Verre fenêtre droite */}
        <Box
          args={[1.3, 1, 0.05]}
          position={[2, 1.8, 0.25]}
        >
          <meshStandardMaterial map={glassTexture} color="#87CEEB" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
        </Box>
      </group>

      {/* Volets */}
      <group>
        {/* Volets fenêtre gauche */}
        <Box
          args={[0.6, 1.2, 0.05]}
          position={[-2.8, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.shutters.color} metalness={0.2} roughness={0.6} />
        </Box>
        <Box
          args={[0.6, 1.2, 0.05]}
          position={[-1.2, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.shutters.color} metalness={0.2} roughness={0.6} />
        </Box>

        {/* Volets fenêtre droite */}
        <Box
          args={[0.6, 1.2, 0.05]}
          position={[1.2, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.shutters.color} metalness={0.2} roughness={0.6} />
        </Box>
        <Box
          args={[0.6, 1.2, 0.05]}
          position={[2.8, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial map={woodTexture} color={renovationState.shutters.color} metalness={0.2} roughness={0.6} />
        </Box>
      </group>

      {/* Véranda (si activée) */}
      {renovationState.veranda.enabled && (
        <group>
          {/* Structure véranda */}
          <Box
            args={[6, 2.5, 3]}
            position={[0, 1.25, 3]}
            castShadow
            onClick={() => handleClick('veranda')}
            onPointerOver={() => handlePointerOver('veranda')}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial 
              color="#FFFFFF" 
              transparent 
              opacity={0.2} 
            />
          </Box>
          {/* Toit véranda */}
          <Box
            args={[6.2, 0.1, 3.2]}
            position={[0, 2.55, 3]}
            castShadow
          >
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
          </Box>
        </group>
      )}

      {/* Pergola (si activée) */}
      {renovationState.pergola.enabled && (
        <group>
          {/* Poteaux pergola */}
          <Box args={[0.2, 2.5, 0.2]} position={[-3, 1.25, -5]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.2, 2.5, 0.2]} position={[3, 1.25, -5]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.2, 2.5, 0.2]} position={[-3, 1.25, -7]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box args={[0.2, 2.5, 0.2]} position={[3, 1.25, -7]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          
          {/* Traverse pergola */}
          <Box 
            args={[6.4, 0.15, 0.15]} 
            position={[0, 2.4, -5]} 
            castShadow
            onClick={() => handleClick('pergola')}
            onPointerOver={() => handlePointerOver('pergola')}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial color="#8B4513" />
          </Box>
          <Box 
            args={[6.4, 0.15, 0.15]} 
            position={[0, 2.4, -7]} 
            castShadow
            onClick={() => handleClick('pergola')}
            onPointerOver={() => handlePointerOver('pergola')}
            onPointerOut={handlePointerOut}
          >
            <meshStandardMaterial color="#8B4513" />
          </Box>
        </group>
      )}

      {/* Terrasse */}
      <Box
        args={[10, 0.15, 5]}
        position={[0, 0.075, -6.5]}
        castShadow
        receiveShadow
        onClick={() => handleClick('terrace')}
        onPointerOver={() => handlePointerOver('terrace')}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial color="#D2B48C" />
      </Box>

      {/* Portail */}
      <group>
        {/* Piliers portail */}
        <Box args={[0.3, 2, 0.3]} position={[-3, 1, 8]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[0.3, 2, 0.3]} position={[3, 1, 8]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        
        {/* Grille portail */}
        <Box
          args={[6, 1.5, 0.05]}
          position={[0, 0.75, 8]}
          castShadow
          onClick={() => handleClick('gate')}
          onPointerOver={() => handlePointerOver('gate')}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial color="#2C2C2C" />
        </Box>
      </group>
    </group>
  )
}

export default Villa3D
