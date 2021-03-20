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
  import { SearchCity } from '@/definitions/interfaces'
  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'

  @Component
  export default class TheSearch extends Vue{
    // data
    search = ''

    // methods
    sliceSpace(text: string): string {
    // sliceSpace => Рекурсия, для удаления лишних пробелов в конце,
    // поскольку название: "Kyiv  " выдаст нам ошибку, вместо результата  
      if (text[text.length-1] === ' ') 
        return this.sliceSpace(text.slice(0, text.length - 1))

      else return text
    }

    searchCity(): void {
      if (this.search) {
        const cityName = this.sliceSpace(this.search)

        const payload: SearchCity = {
          coords: { lat : 0, lon: 0 }, //
          cityName: cityName
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