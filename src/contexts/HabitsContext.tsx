import { createContext, useEffect, useState } from "react";
import { HabitDTO } from "../dtos/HabitDTO";
import { api } from "../services/api";
import { useAuth } from "@hooks/useAuth";

export type GoalsContextData = {
  goals: HabitDTO[]
  isLoadingHabits: boolean
  loadTodayHabits: () => void
}
type GoalsProviderProps = {
  children: React.ReactNode
}
export const GoalsContext = createContext<GoalsContextData>({} as GoalsContextData)

export function GoalsContextProvider({ children }: GoalsProviderProps) {
  const [goals, setGoals] = useState<HabitDTO[]>([])
  const { user } = useAuth()
  const [isLoadingHabits, setIsLoadingHabits] = useState(false)




  async function loadTodayHabits() {
    try {

      setIsLoadingHabits(true)
      const { data } = await api.get(`/habits/today/${user.id}`)
      setGoals(data)

    } catch (err) {
      return
    } finally {
      setIsLoadingHabits(false)
    }
  }

  useEffect(() => {
    loadTodayHabits()
  }, [])

  return (
    <GoalsContext.Provider value={{
      goals,
      isLoadingHabits,
      loadTodayHabits,
    }}>

      {children}
    </GoalsContext.Provider>
  )
}