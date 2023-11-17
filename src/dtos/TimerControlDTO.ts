import { SvgProps } from "react-native-svg"

export type TimerControlDTO = {
  appName: string
  limitTime: number
  iconURL: React.FC<SvgProps>
}