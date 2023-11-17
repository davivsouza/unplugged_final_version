import dayjs from 'dayjs'
import "dayjs/locale/pt-br"

export function dateDifference(date1: Date) {
  const initialDate = dayjs(date1)
  const currentDate = dayjs()

  const diffSec = currentDate.diff(initialDate, 'seconds')
  const diffMin = currentDate.diff(initialDate, 'minute')
  const diffHour = currentDate.diff(initialDate, 'hour')
  const diffDay = currentDate.diff(initialDate, 'day')
  const diffMonth = currentDate.diff(initialDate, 'month')

  if (diffSec < 60) {
    return `${diffSec} segundos atrás`
  }
  if (diffMin < 60) {
    if (diffMin === 1) {

      return `${diffMin} minuto atrás`
    }
    return `${diffMin} minutos atrás`
  }
  if (diffHour < 24) {
    return `${diffHour} horas atrás`
  }
  if (diffDay <= 31) {
    if (diffDay === 1) {
      return `${diffDay} dia atrás`

    }
    return `${diffDay} dias atrás`
  }
  if (diffMonth <= 12) {
    if (diffMonth === 1) {
      return `${diffMonth} mês atrás`
    }
    return `${diffMonth} meses atrás`
  }
}