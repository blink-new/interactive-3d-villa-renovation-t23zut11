import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import SimpleVilla from './components/SimpleVilla'
import SimplePanel from './components/SimplePanel'
import LoadingSpinner from './components/LoadingSpinner'
import { RenovationProvider } from './context/RenovationContext'

function App() {
  return (
    <RenovationProvider>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-50 relative overflow-hidden">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Villa 3D Rénovation
                </h1>
                <p className="text-sm text-gray-600">
                  Explorez les options de rénovation en temps réel
                </p>
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Mode Interactif
              </div>
            </div>
          </div>
        </header>

        {/* Main 3D Scene */}
        <div className="h-screen pt-20">
          <Canvas
            camera={{ 
              position: [10, 8, 10], 
              fov: 60,
              near: 0.1,
              far: 1000
            }}
            shadows
            className="bg-gradient-to-t from-green-50 to-sky-200"
          >
            <Suspense fallback={<LoadingSpinner />}>
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              
              {/* Sky and Environment */}
              <Sky
                distance={450000}
                sunPosition={[10, 10, 0]}
                inclination={0}
                azimuth={0.25}
              />
              
              {/* Villa Model */}
              <SimpleVilla />
              
              {/* Camera Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={25}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
                autoRotate={false}
                autoRotateSpeed={0.5}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Renovation Panel */}
        <SimplePanel />

        {/* Instructions */}
        <div className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200 max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Cliquez et glissez pour tourner la vue</li>
            <li>• Molette pour zoomer/dézoomer</li>
            <li>• Cliquez sur les éléments pour les sélectionner</li>
            <li>• Utilisez le panneau pour personnaliser</li>
          </ul>
        </div>
      </div>
    </RenovationProvider>
  )
}

export default App