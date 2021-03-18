import Vue from 'vue'
import Vuex from 'vuex'

// import Loading from './modules/Loading'
// import InitialGeolocation from './modules/InitialGeolocation'
// import WeatherForecastAPI from './modules/WeatherForecastAPI'

import {  LoadingState  } from './modules/Loading'
import {  WeatherForecastAPIState  } from './modules/WeatherForecastAPI'

Vue.use(Vuex)

export interface RootState {
  weatherForecastAPI: WeatherForecastAPIState;
  Loading: LoadingState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({})





// const store = new Vuex.Store({
//   modules: {
//     Loading,
//     InitialGeolocation,
//     WeatherForecastAPI
//   }
// })

// export default store