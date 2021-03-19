import Vue from 'vue'
import Vuex from 'vuex'

import { LoadingState, WeatherForecastAPIState } from '@/definitions/interfaces'

Vue.use(Vuex)

export interface RootState {
  weatherForecastAPI: WeatherForecastAPIState;
  Loading: LoadingState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({})