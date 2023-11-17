export function changeColorBySecondsTime(seconds: number) {
  if (seconds < 3600) {
    return 'yellow.500'
  }
  if (seconds > 4500 && seconds < 4700) {
    return 'red.500'
  }
  if (seconds > 4700 && seconds < 10000) {
    return 'green.500'
  }
  return 'purple.500'

}