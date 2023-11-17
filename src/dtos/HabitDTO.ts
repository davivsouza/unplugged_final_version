export type HabitDTO = {
  id?: number
  userId?: string
  name: string
  color: string
  description: string
  daysOfWeek?: number[]
  completed?: boolean
  createdAt?: Date
  habitLogs?: HabitLogs[]
}

export type HabitLogs = {
  id: number
  habitId: number
  dayOfWeek: number
  completed: boolean
  date: Date

}