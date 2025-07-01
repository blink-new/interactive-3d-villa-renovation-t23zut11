import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRenovation } from '../context/RenovationContext'
import * as THREE from 'three'

const SimpleVilla: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const { renovationState, setSelectedElement, setHoveredElement } = useRenovation()

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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshLambertMaterial color="#4a7c59" />
      </mesh>

      {/* Allée */}
      <mesh position={[0, 0, 6]} receiveShadow>
        <boxGeometry args={[12, 0.05, 2]} />
        <meshLambertMaterial color="#666666" />
      </mesh>

      {/* Murs principaux */}
      <group>
        {/* Mur avant */}
        <mesh
          position={[0, 1.5, 0]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[8, 3, 0.3]} />
          <meshLambertMaterial color={renovationState.walls.color} />
        </mesh>

        {/* Mur arrière */}
        <mesh
          position={[0, 1.5, -4]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[8, 3, 0.3]} />
          <meshLambertMaterial color={renovationState.walls.color} />
        </mesh>

        {/* Mur gauche */}
        <mesh
          position={[-4, 1.5, -2]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.3, 3, 4]} />
          <meshLambertMaterial color={renovationState.walls.color} />
        </mesh>

        {/* Mur droit */}
        <mesh
          position={[4, 1.5, -2]}
          castShadow
          receiveShadow
          onClick={() => handleClick('walls')}
          onPointerOver={() => handlePointerOver('walls')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.3, 3, 4]} />
          <meshLambertMaterial color={renovationState.walls.color} />
        </mesh>
      </group>

      {/* Toit */}
      <group>
        <mesh
          position={[0, 3.2, -2]}
          castShadow
          onClick={() => handleClick('roof')}
          onPointerOver={() => handlePointerOver('roof')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[8.5, 0.2, 4.5]} />
          <meshLambertMaterial color={renovationState.roof.tiles} />
        </mesh>

        {/* Velux (si activé) */}
        {renovationState.roof.skylights && (
          <mesh
            position={[1, 3.3, -1]}
            castShadow
            onClick={() => handleClick('roof')}
            onPointerOver={() => handlePointerOver('skylights')}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[1.2, 0.05, 1]} />
            <meshLambertMaterial color="#87CEEB" transparent opacity={0.7} />
          </mesh>
        )}
      </group>

      {/* Porte d'entrée */}
      <mesh
        position={[0, 1.1, 0.2]}
        castShadow
        onClick={() => handleClick('door')}
        onPointerOver={() => handlePointerOver('door')}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1, 2.2, 0.1]} />
        <meshLambertMaterial color={renovationState.door.color} />
      </mesh>

      {/* Poignée de porte */}
      <mesh position={[0.4, 1.1, 0.25]} castShadow>
        <boxGeometry args={[0.05, 0.05, 0.15]} />
        <meshLambertMaterial color="#FFD700" />
      </mesh>

      {/* Fenêtres */}
      <group>
        {/* Fenêtre gauche */}
        <mesh
          position={[-2, 1.8, 0.2]}
          castShadow
          onClick={() => handleClick('windows')}
          onPointerOver={() => handlePointerOver('windows')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[1.5, 1.2, 0.1]} />
          <meshLambertMaterial color={renovationState.windows.frame} />
        </mesh>

        {/* Verre fenêtre gauche */}
        <mesh position={[-2, 1.8, 0.25]}>
          <boxGeometry args={[1.3, 1, 0.05]} />
          <meshLambertMaterial color="#87CEEB" transparent opacity={0.3} />
        </mesh>

        {/* Fenêtre droite */}
        <mesh
          position={[2, 1.8, 0.2]}
          castShadow
          onClick={() => handleClick('windows')}
          onPointerOver={() => handlePointerOver('windows')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[1.5, 1.2, 0.1]} />
          <meshLambertMaterial color={renovationState.windows.frame} />
        </mesh>

        {/* Verre fenêtre droite */}
        <mesh position={[2, 1.8, 0.25]}>
          <boxGeometry args={[1.3, 1, 0.05]} />
          <meshLambertMaterial color="#87CEEB" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Volets */}
      <group>
        {/* Volets fenêtre gauche */}
        <mesh
          position={[-2.8, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.6, 1.2, 0.05]} />
          <meshLambertMaterial color={renovationState.shutters.color} />
        </mesh>
        <mesh
          position={[-1.2, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.6, 1.2, 0.05]} />
          <meshLambertMaterial color={renovationState.shutters.color} />
        </mesh>

        {/* Volets fenêtre droite */}
        <mesh
          position={[1.2, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.6, 1.2, 0.05]} />
          <meshLambertMaterial color={renovationState.shutters.color} />
        </mesh>
        <mesh
          position={[2.8, 1.8, 0.15]}
          castShadow
          onClick={() => handleClick('shutters')}
          onPointerOver={() => handlePointerOver('shutters')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[0.6, 1.2, 0.05]} />
          <meshLambertMaterial color={renovationState.shutters.color} />
        </mesh>
      </group>

      {/* Véranda (si activée) */}
      {renovationState.veranda.enabled && (
        <group>
          {/* Structure véranda */}
          <mesh
            position={[0, 1.25, 3]}
            castShadow
            onClick={() => handleClick('veranda')}
            onPointerOver={() => handlePointerOver('veranda')}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[6, 2.5, 3]} />
            <meshLambertMaterial 
              color="#FFFFFF" 
              transparent 
              opacity={0.2} 
            />
          </mesh>
          {/* Toit véranda */}
          <mesh position={[0, 2.55, 3]} castShadow>
            <boxGeometry args={[6.2, 0.1, 3.2]} />
            <meshLambertMaterial color="#87CEEB" transparent opacity={0.6} />
          </mesh>
        </group>
      )}

      {/* Pergola (si activée) */}
      {renovationState.pergola.enabled && (
        <group>
          {/* Poteaux pergola */}
          <mesh position={[-3, 1.25, -5]} castShadow>
            <boxGeometry args={[0.2, 2.5, 0.2]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
          <mesh position={[3, 1.25, -5]} castShadow>
            <boxGeometry args={[0.2, 2.5, 0.2]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
          <mesh position={[-3, 1.25, -7]} castShadow>
            <boxGeometry args={[0.2, 2.5, 0.2]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
          <mesh position={[3, 1.25, -7]} castShadow>
            <boxGeometry args={[0.2, 2.5, 0.2]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
          
          {/* Traverse pergola */}
          <mesh 
            position={[0, 2.4, -5]} 
            castShadow
            onClick={() => handleClick('pergola')}
            onPointerOver={() => handlePointerOver('pergola')}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[6.4, 0.15, 0.15]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
          <mesh 
            position={[0, 2.4, -7]} 
            castShadow
            onClick={() => handleClick('pergola')}
            onPointerOver={() => handlePointerOver('pergola')}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[6.4, 0.15, 0.15]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
        </group>
      )}

      {/* Terrasse */}
      <mesh
        position={[0, 0.075, -6.5]}
        castShadow
        receiveShadow
        onClick={() => handleClick('terrace')}
        onPointerOver={() => handlePointerOver('terrace')}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[10, 0.15, 5]} />
        <meshLambertMaterial color="#D2B48C" />
      </mesh>

      {/* Portail */}
      <group>
        {/* Piliers portail */}
        <mesh position={[-3, 1, 8]} castShadow>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshLambertMaterial color="#666666" />
        </mesh>
        <mesh position={[3, 1, 8]} castShadow>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <meshLambertMaterial color="#666666" />
        </mesh>
        
        {/* Grille portail */}
        <mesh
          position={[0, 0.75, 8]}
          castShadow
          onClick={() => handleClick('gate')}
          onPointerOver={() => handlePointerOver('gate')}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[6, 1.5, 0.05]} />
          <meshLambertMaterial color="#2C2C2C" />
        </mesh>
      </group>
    </group>
  )
}

export default SimpleVilla