import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Palette, Home, Sun, Fence, Building, Wrench, X } from 'lucide-react'
import { useRenovation } from '../context/RenovationContext'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const RenovationPanel: React.FC = () => {
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
      <motion.button
        onClick={togglePanel}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={togglePanel}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Rénovation 3D</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePanel}
                    className="p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <Tabs defaultValue="walls" className="space-y-4">
                  <TabsList className="grid grid-cols-2 gap-1 p-1">
                    <TabsTrigger value="walls" className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Murs
                    </TabsTrigger>
                    <TabsTrigger value="openings" className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Ouvertures
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="walls" className="space-y-4">
                    {/* Murs */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Palette className="w-5 h-5" />
                          Couleur des murs
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-5 gap-2">
                          {colorOptions.walls.map((color) => (
                            <button
                              key={color}
                              onClick={() => updateRenovation('walls', { color })}
                              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                                renovationState.walls.color === color 
                                  ? 'border-blue-500 ring-2 ring-blue-200' 
                                  : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Toit */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="w-5 h-5" />
                          Toiture
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Couleur tuiles
                          </label>
                          <div className="grid grid-cols-5 gap-2">
                            {colorOptions.roof.map((color) => (
                              <button
                                key={color}
                                onClick={() => updateRenovation('roof', { tiles: color })}
                                className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                                  renovationState.roof.tiles === color 
                                    ? 'border-blue-500 ring-2 ring-blue-200' 
                                    : 'border-gray-300'
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Velux</span>
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
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="openings" className="space-y-4">
                    {/* Volets */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sun className="w-5 h-5" />
                          Volets
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-5 gap-2">
                          {colorOptions.shutters.map((color) => (
                            <button
                              key={color}
                              onClick={() => updateRenovation('shutters', { color })}
                              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                                renovationState.shutters.color === color 
                                  ? 'border-blue-500 ring-2 ring-blue-200' 
                                  : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Porte */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building className="w-5 h-5" />
                          Porte d'entrée
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-5 gap-2">
                          {colorOptions.door.map((color) => (
                            <button
                              key={color}
                              onClick={() => updateRenovation('door', { color })}
                              className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                                renovationState.door.color === color 
                                  ? 'border-blue-500 ring-2 ring-blue-200' 
                                  : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Extensions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="w-5 h-5" />
                          Extensions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
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
                      </CardContent>
                    </Card>

                    {/* Portail */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Fence className="w-5 h-5" />
                          Portail
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Automatisation</span>
                          <button
                            onClick={() => updateRenovation('gate', { automation: !renovationState.gate.automation })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              renovationState.gate.automation ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                renovationState.gate.automation ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Info sélection */}
                {selectedElement && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <h3 className="font-semibold text-blue-900 mb-2">Élément sélectionné</h3>
                    <p className="text-blue-700 text-sm capitalize">{selectedElement.replace('_', ' ')}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default RenovationPanel