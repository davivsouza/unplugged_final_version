import { TimerControlContext } from "@contexts/TimerControlContext";
import { useContext } from "react";

export function useTimerControl() {
  const context = useContext(TimerControlContext)

  return context
}