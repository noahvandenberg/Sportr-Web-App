export function getFormattedDateTime(datetime) {

  const date = new Date();
  date.setTime(Date.parse(datetime));

  const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(date)
  const dayOfMonth = date.getDate()
  const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(date)
  const hour = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12
  const minute = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
  const ampm = date.getHours() <= 12 ? 'AM' : 'PM'

  return `${dayOfWeek.toUpperCase()} ${month.toUpperCase()} ${dayOfMonth}, ${hour}:${minute} ${ampm}`
}

export const isToday = (datetime) => {
  const date = new Date();
  date.setTime(Date.parse(datetime));
  const today = new Date()
  return date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
}