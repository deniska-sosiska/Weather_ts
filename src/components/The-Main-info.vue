<template>
  <div class="main">

    <div class="backgroundComponent superficialWindow">
      <h3 style="margin-bottom: 6px; text-align: center;">City: {{getSuperficialForecast.city}} ({{getSuperficialForecast.country}})</h3>
      <div class="superficialWindow__secondLine">
        <i class="fas fa-leaf"></i>
        <div style="text-align: end;">
          <p style="font-size: 50px">{{ Math.round(getSuperficialForecast.temp - 273.15) }} C°</p>
          <p>Weather: {{ getSuperficialForecast.weather }}</p>
        </div>
      </div>
    </div>

    <div class="backgroundComponent columns">
      <div class="column">
        <p>Weather <i class="fas fa-cloud"></i></p>
        <p>{{ getWholeWeatherForecast.weather }}</p>
      </div>
      <div class="column">
        <p>Description <i class="fas fa-info"></i></p>
        <p>{{ getWholeWeatherForecast.description }}</p>
      </div>
      <div class="column">
         <p>Humidity <i class="fas fa-tint"></i></p>
         <p>{{ getWholeWeatherForecast.humidity }}%</p>
      </div>
      <div class="column">
        <p>Temperature <i class="fas fa-thermometer-three-quarters"></i></p>
        <p>{{ Math.round(getWholeWeatherForecast.temp - 273.15) }} C°</p>
      </div>
      <div class="column">
        <p>Feels like <i class="fas fa-thermometer-three-quarters"></i></p>
        <p>{{ Math.round(getWholeWeatherForecast.feelsLike - 273.15) }} °C</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Getter } from 'vuex-class'
  
  import { SuperficialForecastInterface, WholeWeatherForecastInterface } from '@/definitions'
  
  @Component
  export default class TheMainWindow extends Vue {
    //computed
    @Getter getSuperficialForecast!: SuperficialForecastInterface
    @Getter getWholeWeatherForecast!: WholeWeatherForecastInterface  
  }
  
</script>

<style scoped lang="scss">
  .main {
    display:flex;
    flex-direction: column;
    justify-content:space-between;
    height: 90vh;
  }
  .superficialWindow {
    width: 260px;
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
    width: 365px;
    & > .column {
      display: flex;
      align-items: flex-end;
      padding: 5px 0px;
      
      & > p:first-child {
        flex-shrink: 0;
        padding-right: 20px; 
        width: 170px;
      }
    }
  }
</style>