import { HabitsCard } from "./HabitsCard"
import { Loading } from "./Loading"

type Props = {
  completedHabitsList: { title: string, data: any[] }
}

export function CompletedHabitsList({ completedHabitsList }: Props) {
  return (
    <>
      {
        completedHabitsList.data ? (
          completedHabitsList.data.map((habit, idx) => (
            <HabitsCard habit={habit} key={habit.id} />
          ))
        ) : <Loading />
      }
    </>
  )
}