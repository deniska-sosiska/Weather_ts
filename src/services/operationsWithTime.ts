const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const  timeStampToDay = (timeStamp: number): string => {
  const date = new Date( timeStamp * 1000 )
  const response = dayOfWeek[date.getDay()].slice(0, 3)
  return response
}
const timeStampToDate = (timeStamp: number): string => {
  const date = new Date( timeStamp * 1000 )
  const response = ' ( ' + date.toLocaleDateString() + ' )'
  return response
}
const getCurrentTime = (): string => {
  let  hours: number|string = new Date().getHours(),
  /**/ min: number|string = new Date().getMinutes()
  hours = hours < 10 ? '0'+ hours: hours
  min = min < 10 ? '0'+ min : min 
  return "Right now: " + hours + ':' +  min
}

export {
  timeStampToDay,
  timeStampToDate,
  getCurrentTime
}