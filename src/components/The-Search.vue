<template>
  <div class="backgroundComponent searchComponent">
    <input type="search" v-model="search" @change="searchCity()">
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import {  SearchCity  } from '@/definitions'

  @Component
  export default class TheSearch extends Vue{
    search = ''

    searchCity(): void {
      const payload: SearchCity = {
        cityName: this.search
      }
      this.$store.dispatch("fetchCurrentWeatherForecast", payload)
    }
  }
</script>

<style lang="scss">
  .searchComponent {
    height: 80px;
    margin-top: 230px;
    & > input {
      width: 400px  ;
      padding : 10px;
    }
  }
  
</style>