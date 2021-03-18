import axios from 'axios'
import store from '@/store'
import { LoadingModule } from './Loading'
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'

import { 
  Coordinates,
  SearchCity,
  WholeWeatherForecastInterface,
  SuperficialForecastInterface
} from '@/definitions/interfaces'

import { 
  CurrentWeatherAPI,
  WeeklyWeatherAPI,
  API_KEY
} from '@/definitions/config'

export interface WeatherForecastAPIState {
  superficialForecast: SuperficialForecastInterface ;
  wholeWeatherForecast: WholeWeatherForecastInterface;
  forecastOfWeek: Array<WholeWeatherForecastInterface>;
}

@Module({ dynamic: true, store, name: 'WeatherForecastAPI' })
class WeatherForecastAPI extends VuexModule implements WeatherForecastAPIState {
  //state
  superficialForecast: SuperficialForecastInterface = {
    city: '',
    country: '',
    temp: 0,
    weather: ''
  }
  wholeWeatherForecast: WholeWeatherForecastInterface = { 
    dataTime: 2000,
    weather: '',
    description: '',
    humidity: 0,
    temp: 0,
    feelsLike: 0
  } 
  forecastOfWeek: Array<WholeWeatherForecastInterface> = []
  
  @Mutation setSuperficialForecast(payload: SuperficialForecastInterface): void {
    this.superficialForecast = payload
  }
  @Mutation setWholeWeatherForecast(payload: WholeWeatherForecastInterface): void {
    this.wholeWeatherForecast = payload
  }
  @Mutation setForecastOfWeek(payload: Array<WholeWeatherForecastInterface>): void {
    this.forecastOfWeek = payload
  }

  @Action fetchCurrentWeatherForecast(payload: SearchCity): void {
    axios.get(`${CurrentWeatherAPI}q=${payload.cityName}&appid=${API_KEY}`)
      .then((res) => {
        const whole: WholeWeatherForecastInterface = {
          dataTime: null,
          weather: res.data.weather[0].main,
          description: res.data.weather[0].description,
          humidity: res.data.main.humidity,
          temp: res.data.main.temp,
          feelsLike: res.data.main.feels_like
        }
        const Superficial: SuperficialForecastInterface = {
          city: res.data.name,
          country: res.data.sys.country,
          temp: res.data.main.temp,
          weather: res.data.weather[0].main
        }
        const coordsObj: Coordinates = {
          lat: res.data.coord.lat,
          lon: res.data.coord.lon
        }
        this.setWholeWeatherForecast(whole)
        this.setSuperficialForecast(Superficial)
        this.fetchWeeklyWeatherForecast(coordsObj)
        LoadingModule.loadingMainTrue()
      })
      .catch(err => {
        console.error("Error axios: ", err)
      })
  }

  @Action fetchWeeklyWeatherForecast(payload: Coordinates) {
    axios.get(`${WeeklyWeatherAPI}lat=${payload.lat}&lon=${payload.lon}&appid=${API_KEY}`)
      .then((res) => {
        const forecastOfWeek: Array<WholeWeatherForecastInterface> = []

        res.data.daily.forEach((elem: any) => {
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

        forecastOfWeek.unshift(this.wholeWeatherForecast) // forecast right now 
        this.setForecastOfWeek(forecastOfWeek)
        LoadingModule.loadingSelectTrue()
      })
      .catch(err => {
        console.error("Error axios: ", err)
      })
  }
}

export const WeatherForecastAPIModule = getModule(WeatherForecastAPI)
// export default WeatherForecastAPI