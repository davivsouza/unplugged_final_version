import { createContext, useEffect } from "react";
import * as Notifications from 'expo-notifications'

type scheduleProps = {
  title: string
  body: string
  seconds: number
}
import { Alert } from "react-native";

type NotificationContextData = {
  handleCallNotification: () => Promise<void>
  scheduleHabitsReminderNotification: ({ body, seconds, title }: scheduleProps) => Promise<void>
  dismissNotification(identifier: string): Promise<void>

}
type NotificationProviderProps = {
  children: React.ReactNode
}

export const NotificationContext = createContext<NotificationContextData>({} as NotificationContextData)


export function NotificationContextProvider({ children }: NotificationProviderProps) {

  Notifications.setNotificationHandler({

    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    })
  })

  async function dismissNotification(identifier: string) {
    await Notifications.dismissNotificationAsync(identifier)
  }

  async function scheduleHabitsReminderNotification({
    title,
    body,
    seconds
  }: scheduleProps) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        seconds
      },
      identifier: 'HabitsReminder'
    })
  }
  async function handleCallNotification() {
    await Notifications.getPermissionsAsync();
  }

  useEffect(() => {
    handleCallNotification()
  })
  return (
    <NotificationContext.Provider value={{
      handleCallNotification,
      scheduleHabitsReminderNotification,
      dismissNotification
    }}>
      {children}
    </NotificationContext.Provider>
  )
}