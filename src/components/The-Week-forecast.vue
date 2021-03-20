<template>
  <div class="backgroundComponent selectComponent">
    <h3 style="text-align: center; margin-bottom: 20px;">You can see forecast for selected day</h3>
    <div v-for="(day, key) in getForecastOfWeek"
      :key="key"
      class="day"
    >
      <div v-if="day.dataTime === null"
        @click="setForecastForSelectedDay(day, key)"
        style="text-align: center; padding: 5px 0px;"
        :class="activeIndex === key ? 'active' : '' "
      >
        <p>{{ getTimeNow() }}</p>
      </div> 
      <div v-else @click="setForecastForSelectedDay(day, key)"
        class="timestamp"
        :class="activeIndex === key ? 'active' : '' "
      >
        <p>{{ getDay(day.dataTime) }}</p>
        <p>{{ getDate(day.dataTime) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'
  import { WholeWeatherForecastInterface } from '@/definitions/interfaces'
  import { timeStampToDay, timeStampToDate, getCurrentTime } from '@/services/operationsWithTime'

  @Component export default class TheWeekForecast extends Vue {
    //data
    private activeIndex = 0
    //computed
    get getForecastOfWeek(): Array<WholeWeatherForecastInterface> {
      this.activeIndex = 0
      return WeatherForecastAPIModule.forecastOfWeek
    }
    //methods
    setForecastForSelectedDay(day: WholeWeatherForecastInterface, index: number): void {
      this.activeIndex = index
      WeatherForecastAPIModule.setWholeWeatherForecast(day)
    }

    getDay(timeStamp: number): string {
      return timeStampToDay(timeStamp)
    }

    getDate(timeStamp: number): string {
      return timeStampToDate(timeStamp)
    }

    getTimeNow(): string {
      return getCurrentTime()
    }

  }
</script>

<style lang="scss">
  .selectComponent {
    width: 300px;
    height: 440px;
  }
  .day > div {
    font-size: 24px;
    padding: 5px 0 5px 12px;
    // padding: 5px auto;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0);
    border-radius: 6px;
    transition: ease-out 0.3s;
    &:hover {
      background: rgba(51, 133, 255, 0.3);

    }
    &.active {
      background: rgba(51, 133, 255, 0.7);
      // border-bottom: 1px solid 0066ff;
    }
  }
  .timestamp {
    display: flex;
    & > p:first-child {
      width: 75px;
    }
  }
</style>