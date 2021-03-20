<template>
  <div class="backgroundComponent searchComponent">
    <form @submit.prevent="searchCity()">
      <input type="search" v-model="search" placeholder='Example: "Kyiv"/"Киев"'>
      <input type="submit" value="OK" style="width: auto; margin-left: 10px;">
    </form>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {  SearchCity  } from '@/definitions/interfaces'
  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'

  @Component
  export default class TheSearch extends Vue{
    search = ''

    searchCity(): void {
      if (this.search) {
        const payload: SearchCity = {
          coords: { lat : 0, lon: 0 }, //
          cityName: this.search
        }
        WeatherForecastAPIModule.fetchCurrentWeatherForecast(payload)
        this.search = ''
      }
    }
  }
</script>

<style lang="scss">
  .searchComponent {
    height: 90px;
    margin-top: 230px;
    & > form > input {
      font-size: 20px;
      width: 250px  ;
      padding : 10px;
    }
  }
  
</style>