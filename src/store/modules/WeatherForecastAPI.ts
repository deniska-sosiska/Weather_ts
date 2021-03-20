import store from '@/store'
import { LoadingModule } from './Loading'
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { fetchCurrent, fetchWeekly } from "@/services/weather.service"

import { 
  WeatherForecastAPIState,
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


@Module({ dynamic: true, store, name: 'WeatherForecastAPI' })
class WeatherForecastAPI extends VuexModule implements WeatherForecastAPIState {
  // State
  superficialForecast: SuperficialForecastInterface = {
    city: '',
    country: '',
    temp: 0,
    weather: ''
  }
  wholeWeatherForecast: WholeWeatherForecastInterface = { 
    dataTime: 0,
    weather: '',
    description: '',
    humidity: 0,
    temp: 0,
    feelsLike: 0
  } 
  forecastOfWeek: Array<WholeWeatherForecastInterface> = []
  
  // Mutation
  @Mutation setSuperficialForecast(payload: SuperficialForecastInterface): void {
    this.superficialForecast = payload
  }
  @Mutation setWholeWeatherForecast(payload: WholeWeatherForecastInterface): void {
    this.wholeWeatherForecast = payload
  }
  @Mutation setForecastOfWeek(payload: Array<WholeWeatherForecastInterface>): void {
    this.forecastOfWeek = payload
  }

  // Actions
  @Action async fetchCurrentWeatherForecast(payload: SearchCity): Promise<void> {
    try {
      let options: string
      if (!payload.cityName) {
        options = `lat=${payload.coords.lat}&lon=${payload.coords.lon}&appid=${API_KEY}`
      } else {
        options = `q=${payload.cityName}&appid=${API_KEY}`
      }
    
      const res = await fetchCurrent({
        url: CurrentWeatherAPI,
        options: options,
        cityName: payload.cityName
      })
      
      if (res) {
        this.setWholeWeatherForecast(res.whole)
        this.setSuperficialForecast(res.superficial)
        this.fetchWeeklyWeatherForecast(res.coordsObj)
        LoadingModule.loadingMainTrue()
      }

    } catch(err) {
      console.error("store/fetchCurrentWeatherForecast: ", err)
    }
  }

  @Action async fetchWeeklyWeatherForecast(payload: Coordinates): Promise<void> {
    try {
      const resArray = await fetchWeekly({
        url: WeeklyWeatherAPI,
        options: `lat=${payload.lat}&lon=${payload.lon}&appid=${API_KEY}`
      })

      if (resArray) {
        resArray.unshift(this.wholeWeatherForecast) // forecast right now 
        this.setForecastOfWeek(resArray)
        LoadingModule.loadingSelectTrue()
      }
    } catch(err) {
      console.error("store/fetchWeeklyWeatherForecast: ", err)
    }
  }
}

export const WeatherForecastAPIModule = getModule(WeatherForecastAPI)
// export default WeatherForecastAPI