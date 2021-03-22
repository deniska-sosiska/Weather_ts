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
  import { WeatherForecastAPIModule } from '@/store/modules/WeatherForecastAPI'

  @Component
  export default class TheSearch extends Vue{
    // Data
    private search = ''

    // Methods
    sliceSpace(text: string): string {
    // sliceSpace => Рекурсия, для удаления лишних пробелов в конце,
    // поскольку название: "Kyiv  " выдаст нам ошибку, вместо желаемого результата.
      if (text[text.length - 1] === ' ') 
        return this.sliceSpace(text.slice(0, text.length - 1))

      else return text
    }

    searchCity(): void {
      if (this.search) {
        WeatherForecastAPIModule.fetchCurrentWeatherForecast({
          cityName: this.sliceSpace(this.search)
        })
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