import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface RenovationState {
  shutters: {
    color: string
    material: string
    style: string
  }
  door: {
    color: string
    material: string
    style: string
  }
  windows: {
    frame: string
    glass: string
    style: string
  }
  roof: {
    tiles: string
    color: string
    skylights: boolean
  }
  veranda: {
    enabled: boolean
    material: string
    roofType: string
  }
  pergola: {
    enabled: boolean
    material: string
    style: string
  }
  terrace: {
    material: string
    railings: string
    size: string
  }
  gate: {
    material: string
    style: string
    automation: boolean
  }
  walls: {
    color: string
    texture: string
    coating: string
  }
}

interface RenovationContextType {
  renovationState: RenovationState
  updateRenovation: (category: keyof RenovationState, updates: Record<string, unknown>) => void
  selectedElement: string | null
  setSelectedElement: (element: string | null) => void
  hoveredElement: string | null
  setHoveredElement: (element: string | null) => void
}

const defaultState: RenovationState = {
  shutters: {
    color: '#8B4513',
    material: 'wood',
    style: 'traditional'
  },
  door: {
    color: '#654321',
    material: 'wood',
    style: 'classic'
  },
  windows: {
    frame: '#FFFFFF',
    glass: 'clear',
    style: 'french'
  },
  roof: {
    tiles: '#8B4513',
    color: 'terracotta',
    skylights: false
  },
  veranda: {
    enabled: false,
    material: 'glass',
    roofType: 'glass'
  },
  pergola: {
    enabled: false,
    material: 'wood',
    style: 'modern'
  },
  terrace: {
    material: 'stone',
    railings: 'glass',
    size: 'medium'
  },
  gate: {
    material: 'iron',
    style: 'modern',
    automation: false
  },
  walls: {
    color: '#F5F5DC',
    texture: 'smooth',
    coating: 'paint'
  }
}

const RenovationContext = createContext<RenovationContextType | undefined>(undefined)

export const RenovationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [renovationState, setRenovationState] = useState<RenovationState>(defaultState)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  const updateRenovation = (category: keyof RenovationState, updates: Record<string, unknown>) => {
    setRenovationState(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...updates
      }
    }))
  }

  return (
    <RenovationContext.Provider
      value={{
        renovationState,
        updateRenovation,
        selectedElement,
        setSelectedElement,
        hoveredElement,
        setHoveredElement
      }}
    >
      {children}
    </RenovationContext.Provider>
  )
}

export const useRenovation = () => {
  const context = useContext(RenovationContext)
  if (context === undefined) {
    throw new Error('useRenovation must be used within a RenovationProvider')
  }
  return context
}