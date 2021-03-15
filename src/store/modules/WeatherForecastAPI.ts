import axios from 'axios'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import { Coordinates, SearchCity, WholeWeatherForecastInterface, SuperficialForecastInterface } from '@/definitions'
import { CurrentWeatherAPI, WeeklyWeatherAPI, API_KEY } from '@/definitions'

@Module
class WeatherForecastAPI extends VuexModule {
  //state
  superficialForecast!: SuperficialForecastInterface
  wholeWeatherForecast!: WholeWeatherForecastInterface
  forecastOfWeek!: Array<WholeWeatherForecastInterface>
  
  @Mutation setSuperficialForecast(payload: SuperficialForecastInterface): void {
    this.superficialForecast = payload
  }
  @Mutation setWholeWeatherForecast(payload: WholeWeatherForecastInterface): void {
    // console.log("mutation: ", payload)
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
          lat: res.data.coord.lat, lon: res.data.coord.lon
        }
        this.context.commit('setWholeWeatherForecast', whole)
        this.context.commit('setSuperficialForecast', Superficial)
        this.context.dispatch('fetchWeeklyWeatherForecast', coordsObj)
        this.context.commit('loadingMainTrue')
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

        forecastOfWeek.unshift(this.getWholeWeatherForecast) // forecast right now 

        this.context.commit('setForecastOfWeek', forecastOfWeek)
        this.context.commit('loadingSelectTrue')
      })
      .catch(err => {
        console.error("Error axios: ", err)
      })
  }

  //Getters
  get getSuperficialForecast(): SuperficialForecastInterface {
    return this.superficialForecast
  }
  get getWholeWeatherForecast(): WholeWeatherForecastInterface {
    // console.log("getter")
    return this.wholeWeatherForecast
  }
  get getForecastOfWeek(): Array<WholeWeatherForecastInterface> {
    return this.forecastOfWeek
  }
}

export default WeatherForecastAPI