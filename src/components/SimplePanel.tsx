import React, { useState } from 'react'
import { useRenovation } from '../context/RenovationContext'

const SimplePanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { renovationState, updateRenovation, selectedElement } = useRenovation()

  const togglePanel = () => setIsOpen(!isOpen)

  const colorOptions = {
    walls: ['#F5F5DC', '#E6E6FA', '#FFE4E1', '#F0F8FF', '#FFF8DC'],
    shutters: ['#8B4513', '#2F4F4F', '#800080', '#008B8B', '#228B22'],
    door: ['#654321', '#8B0000', '#2F4F4F', '#191970', '#006400'],
    roof: ['#8B4513', '#A0522D', '#CD853F', '#2F4F4F', '#800000']
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={togglePanel}
          />
          
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Rénovation 3D</h2>
                <button
                  onClick={togglePanel}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Murs */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Couleur des murs</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.walls.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateRenovation('walls', { color })}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        renovationState.walls.color === color 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Volets */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Couleur des volets</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.shutters.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateRenovation('shutters', { color })}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        renovationState.shutters.color === color 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Porte */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Couleur de la porte</h3>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.door.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateRenovation('door', { color })}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        renovationState.door.color === color 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Toit */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Couleur du toit</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {colorOptions.roof.map((color) => (
                    <button
                      key={color}
                      onClick={() => updateRenovation('roof', { tiles: color })}
                      className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                        renovationState.roof.tiles === color 
                          ? 'border-blue-500 ring-2 ring-blue-200' 
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Ajouter des velux</span>
                  <button
                    onClick={() => updateRenovation('roof', { skylights: !renovationState.roof.skylights })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      renovationState.roof.skylights ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        renovationState.roof.skylights ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Extensions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Extensions</h3>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Véranda</span>
                  <button
                    onClick={() => updateRenovation('veranda', { enabled: !renovationState.veranda.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      renovationState.veranda.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        renovationState.veranda.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Pergola</span>
                  <button
                    onClick={() => updateRenovation('pergola', { enabled: !renovationState.pergola.enabled })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      renovationState.pergola.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        renovationState.pergola.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Info sélection */}
              {selectedElement && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Élément sélectionné</h3>
                  <p className="text-blue-700 text-sm capitalize">{selectedElement.replace('_', ' ')}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SimplePanel