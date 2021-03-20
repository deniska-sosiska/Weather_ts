<template>
  <div class="main">

    <div class="backgroundComponent superficialWindow">
      <h3 style="margin-bottom: 6px; text-align: center;">City: {{getSuperficialForecast.city}} ({{getSuperficialForecast.country}})</h3>
      <div class="superficialWindow__secondLine">
        <i class="fas fa-leaf" style="color: #006600"></i>
        <div style="text-align: end;">
          <p style="font-size: 50px">{{ Math.round(getSuperficialForecast.temp - 273.15) }} C°</p>
          <p>Weather: {{ getSuperficialForecast.weather }}</p>
        </div>
      </div>
    </div>

    <div class="backgroundComponent columns">
      <div class="column">
        <p>Weather <i class="fas fa-cloud" style="color: #00a3cc"></i></p>
        <p>{{ getWholeWeatherForecast.weather }}</p>
      </div>
      <div class="column">
        <p>Description <i class="fas fa-info" style="color: #b3b300"></i></p>
        <p>{{ getWholeWeatherForecast.description }}</p>
      </div>
      <div class="column">
         <p>Humidity <i class="fas fa-tint" style="color: #00b8e6;"></i></p>
         <p>{{ getWholeWeatherForecast.humidity }}%</p>
      </div>
      <div class="column">
        <p>Temperature <i class="fas fa-thermometer-three-quarters" style="color: #ff1a1a;"></i></p>
        <p>{{ convertTemperature(getWholeWeatherForecast.temp) }}</p>
      </div>
      <div class="column">
        <p>Feels like <i class="fas fa-thermometer-three-quarters" style="color: #ff1a1a;"></i></p>
        <p>{{  convertTemperature(getWholeWeatherForecast.feelsLike) }}</p>
      </div>
      <div class="column">
        <p>Forecast time <i class="far fa-clock" style="color: #996600;"></i></p>
        <p>{{ getDate(getWholeWeatherForecast.dataTime) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'
  import { SuperficialForecastInterface, WholeWeatherForecastInterface } from '@/definitions/interfaces'
  import { timeStampToDay, timeStampToDate, getCurrentTime } from '@/services/operationsWithTime'
  
  @Component export default class TheMainWindow extends Vue {
    // Computed
    get getSuperficialForecast(): SuperficialForecastInterface {
      return WeatherForecastAPIModule.superficialForecast
    }
    get getWholeWeatherForecast(): WholeWeatherForecastInterface {
      return WeatherForecastAPIModule.wholeWeatherForecast
    }
    // Methods
    convertTemperature(temp: number): string {
      const response = `${Math.round(temp - 273.15)} °C ( ${temp}K )`
      return response
    }
    getDate(timeStamp: number): string {
      if (timeStamp === null)
        return getCurrentTime()
      else
        return timeStampToDay(timeStamp) + timeStampToDate(timeStamp)
    }
  }
</script>

<style scoped lang="scss">
  .main {
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    height: 93vh;
  }
  .superficialWindow {
    width: 268px;
    & > p {
      text-align: end;
    }
    & > .superficialWindow__secondLine {
      display: flex;
      justify-content: space-between;
    }
    & > .superficialWindow__secondLine > i {
      font-size: 45px;
      margin-top: 10px;
    }
  }

  .columns {
    width: 380px;
    & > .column {
      display: flex;
      align-items: flex-end;
      padding: 5px 0 5px 8px;
      border-radius: 6px;
      &:hover {
        background: rgba(51, 133, 255, 0.3);
      }
      & > p:first-child {
        flex-shrink: 0;
        padding-right: 20px; 
        width: 170px;
      }
    }
  }
</style>