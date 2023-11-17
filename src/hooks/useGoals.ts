import { useContext } from 'react'

import { GoalsContext } from '@contexts/HabitsContext'

export function useGoals() {
  const context = useContext(GoalsContext)
  return context
}