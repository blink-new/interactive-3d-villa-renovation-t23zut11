import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#6366f1" wireframe />
    </mesh>
  )
}

export default LoadingSpinner