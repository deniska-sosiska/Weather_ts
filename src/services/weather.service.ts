import request from './generic.service'
import { 
  RequestObject,
  Coordinates,
  WholeWeatherForecastInterface,
  SuperficialForecastInterface
} from '@/definitions/interfaces'


const fetchCurrent = async ({ url, options }: RequestObject) => {
  try {
    const res = await request({  url, options  })
    console.log(res)
    const whole: WholeWeatherForecastInterface = {
      dataTime: null,
      weather: res.weather[0].main,
      description: res.weather[0].description,
      humidity: res.main.humidity,
      temp: res.main.temp,
      feelsLike: res.main.feels_like
    }
    const superficial: SuperficialForecastInterface = {
      city: res.name,
      country: res.sys.country,
      temp: res.main.temp,
      weather: res.weather[0].main
    }
    const coordsObj: Coordinates = {
      lat: res.coord.lat,
      lon: res.coord.lon
    }
    
    return { whole, superficial, coordsObj }
  }
  catch(err) {
    console.error("Service/fetchCurrent: ", err)
  }
}

const fetchWeekly = async ({ url, options }: RequestObject) => {
  try {
    const res = await request({  url, options  })
    const forecastOfWeek: Array<WholeWeatherForecastInterface> = []

    await res.daily.forEach((elem: any) => {
      const obj: WholeWeatherForecastInterface = {
        dataTime: elem.dt,
        weather: elem.weather[0].main,
        description: elem.weather[0].description,
        humidity: elem.humidity,
        temp: elem.temp.day,
        feelsLike: elem.feels_like.day
      }
      forecastOfWeek.push(obj)
    })

    return forecastOfWeek
  }
  catch(err) {
    console.error("Service/fetchWeekly: ", err)
  }
}

export {
  fetchCurrent,
  fetchWeekly
}