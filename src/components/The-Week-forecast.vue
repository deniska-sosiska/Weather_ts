<template>
  <div class="backgroundComponent selectComponent">
    <h3 style="text-align: center; margin-bottom: 20px;">You can see forecast for selected day</h3>
    <div class="current">
      <!-- <h4>forecast right now</h4> -->
    </div>
    <div v-for="(day, key) in getForecastOfWeek" :key="key" class="day">
      <p v-if="day.dataTime === null" @click="setForecastForSelectedDay(day)">
        Right now: {{ getCurrentTime()  }}
      </p> 
      <p v-else @click="setForecastForSelectedDay(day)">
        {{ new Date( day.dataTime * 1000 ).toDateString() }}
      </p> 
    </div>
  </div>
</template>

<script lang="ts">
  import {  Component, Vue  } from 'vue-property-decorator'

  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'
  import {  WholeWeatherForecastInterface  } from '@/definitions'

  @Component
  export default class TheWeekForecast extends Vue {
    get getForecastOfWeek() {
      console.log(WeatherForecastAPIModule.forecastOfWeek)
      return WeatherForecastAPIModule.forecastOfWeek
    }

    setForecastForSelectedDay(day: WholeWeatherForecastInterface) {
      WeatherForecastAPIModule.setWholeWeatherForecast(day)
    }

    getCurrentTime(): string {
      let  hours: number|string = new Date().getHours();
      let  min: number|string = new Date().getMinutes()

      hours = hours < 10 ? '0'+ hours: hours;
      min = min < 10 ? '0'+ min : min 

      return hours + ':' +  min
    }
  }
</script>

<style lang="scss">
  .selectComponent {
    width: 300px;
    height: 440px;
  }
  .day > p {
    font-size: 24px;
    padding: 5px 0;
    margin-left: 10px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0);

    &:hover {
      border-bottom: 1px solid;
    }
  }
</style>