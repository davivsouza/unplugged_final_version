import { createContext, useEffect, useState } from "react";

import { timerControlGetApps, timerControlStorageRemoveSpecificAppTimer, timerControlStorageSave } from "../storage/storageTimerControl";


export type AppTimer = {
  appName: string
  limitTime: number
  iconUrl: string
}
type TimerControlContextData = {
  timers: AppTimer[]
  saveAppTimer: ({ appName, limitTime }: AppTimer) => void
  removeTimerControl: (app: AppTimer) => void
}

type TimerControlProviderProps = {
  children: React.ReactNode
}

export const TimerControlContext = createContext<TimerControlContextData>({} as TimerControlContextData)
export function TimerControlProvider({ children }: TimerControlProviderProps) {
  const [timers, setTimers] = useState<AppTimer[]>([])


  async function saveAppTimer({ appName, iconUrl, limitTime }: AppTimer) {
    await timerControlStorageSave({ appName, iconUrl, limitTime })
    loadTimers()
  }

  async function removeTimerControl(app: AppTimer) {
    await timerControlStorageRemoveSpecificAppTimer(app)
    loadTimers()

  }
  async function loadTimers() {
    const appTimers = await timerControlGetApps()
    setTimers(appTimers);
  }

  useEffect(() => {
    loadTimers()


  }, [])
  return (
    <TimerControlContext.Provider value={{ timers, saveAppTimer, removeTimerControl }}>
      {children}
    </TimerControlContext.Provider>
  )
}