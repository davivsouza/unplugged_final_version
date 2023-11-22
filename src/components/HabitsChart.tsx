import { Box, HStack, Progress, ScrollView, Text, VStack } from "native-base";
import { HabitsChartItem } from "./HabitsChartItem";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "@hooks/useAuth";
import { useGoals } from "@hooks/useGoals";
type Props = {
  weekDay: string;
  dayNumber: number;
};
export function HabitsChart({ weekDay, dayNumber }: Props) {
  const { user } = useAuth();
  const [habitDayLength, setHabitDayLength] = useState(0);
  const [totalHabitsDayLength, setTotalHabitsDayLength] = useState(0);

  async function fetchHabitsLog() {
    const {data : habitsOfTheDayWeek} = await api.get(`habits/${user.id}/dayOfWeek/${dayNumber}`)
    
    const { data: habitsCompletedByDayWeek } = await api.get(
      `/habits/completed-habits/${user.id}/dayOfWeek/${dayNumber}`
    );
    setHabitDayLength(habitsCompletedByDayWeek.length);
    setTotalHabitsDayLength(habitsOfTheDayWeek.length)
  }

  useEffect(() => {
    fetchHabitsLog();
  }, []);
  return (
    <HabitsChartItem weekDay={weekDay} maxTask={totalHabitsDayLength} taskCompleted={habitDayLength} w={20} />
  );
}
