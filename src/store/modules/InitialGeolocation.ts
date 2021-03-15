import axios from 'axios'
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import { SearchCity } from '@/definitions'


@Module
// @Module({ namespaced: true, name: 'InitialGeolocation' })
class InitialGeolocation extends VuexModule {
  @Action
  fetchCurrentGeolocation(): void {
    axios.get('https://geolocation-db.com/json/')
      .then(res => {
        this.context.dispatch('fetchCurrentWeatherForecast', {  cityName: res.data.city  })
      })
      .catch(err => {
        console.error("geolocationError: ", err.message)
        const fallBackCity: SearchCity = { // default: Vilnius, Lithuania
          cityName: "Vilnius"
        }
        this.context.dispatch('fetchCurrentWeatherForecast', {  cityName: fallBackCity  })
      })
  }
}
export default InitialGeolocation