<template>
  <div id="app" class="container flex" v-if="getLoadingMainWindow && getLoadingSelectTrue">
    <TheMainInfo />
    <TheSearch />
    <TheWeekForecast />
  </div>

</template>

<script lang="ts">
  import { LoadingModule } from '@/store/modules/Loading'
  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'
  import { Component, Vue } from 'vue-property-decorator'

  import TheMainInfo from './components/The-Main-info.vue'
  import TheSearch from './components/The-Search.vue'
  import TheWeekForecast from './components/The-Week-forecast.vue'
  
  import request from '@/services/generic.service'

  @Component({
    components: {  TheMainInfo, TheSearch, TheWeekForecast  }
  })
  export default class App extends Vue {
    // Date
    private readonly fallBack = "Vilnius" // default: Vilnius, Lithuania

    // Computed
    get getLoadingMainWindow() {
      return LoadingModule.loadingMainWindow
    }
    get getLoadingSelectTrue() {
      return LoadingModule.loadingSelectDayWindow
    }

    // Lifecycle Hooks
    created() {
      this.fetchCurrentGeolocation()
    }

    // Methods
    async fetchCurrentGeolocation(): Promise<void> {
      try {
        const res = await request({
          url: 'https://geolocation-db.com/json/'
        })
        WeatherForecastAPIModule.fetchCurrentWeatherForecast({  cityName: res.city  })
      }
      catch(err) {
        WeatherForecastAPIModule.fetchCurrentWeatherForecast({  cityName: this.fallBack  })
        console.error("App/fetchCurrentGeolocation : ", err)
      }
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'Comfortaa';
    src:url('./assets/Comfortaa-Regular.ttf');
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Comfortaa';
    color: #2c3e50;
    margin-top: 20px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: url('./assets/back.jpg') no-repeat 100% 100%;
    background-attachment: fixed;
    background-size: cover;
  }

  .container {
    max-width: 90vw;
    margin: 0 auto;
  }
  .backgroundComponent {
    background: rgb(246, 250, 251, 0.85);
    border-radius: 20px;
    padding: 20px 30px;
    // max-width: 300px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
</style>
