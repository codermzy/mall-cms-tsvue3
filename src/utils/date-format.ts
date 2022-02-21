import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATA_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  value: string,
  format: string = DATA_TIME_FORMAT
) {
  return dayjs.utc(value).utcOffset(8).format(format)
}
