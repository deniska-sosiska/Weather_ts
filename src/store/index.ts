import Vue from 'vue'
import Vuex from 'vuex'

import Loading from './modules/Loading'
import InitialGeolocation from './modules/InitialGeolocation'
import WeatherForecastAPI from './modules/WeatherForecastAPI'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Loading,
    InitialGeolocation,
    WeatherForecastAPI
  }
})

export default store