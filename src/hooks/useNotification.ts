import { useContext } from "react";
import { NotificationContext } from "@contexts/NotificationsContext";


export function useNotification() {
  const context = useContext(NotificationContext);

  return context
}