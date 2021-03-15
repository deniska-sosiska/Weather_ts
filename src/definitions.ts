type CityName = string
export interface SearchCity {
  cityName: CityName;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Wind {
  speed: number;
  deg: number;
}
interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface CurrentWeatherResponseObj {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: Coordinates; //my interface ↑↑↑
  dt: number;
  id: number;
  main: Main; //my interface ↑↑↑
  name: string;
  sys: Sys; //my interface ↑↑↑
  timezone: number;
  visibility: number;
  weather: Array<Weather>; //my interface ↑↑↑
  wind: Wind; //my interface ↑↑↑
}

export interface SuperficialForecastInterface {
  city: string;
  country: string;
  temp: number;
  weather: string;
}

export interface WholeWeatherForecastInterface {
  dataTime?: number | null;
  weather: string;
  description: string;
  humidity: number;
  temp: number;
  feelsLike: number;
}

const CurrentWeatherAPI = 'https://api.openweathermap.org/data/2.5/weather?'
const WeeklyWeatherAPI = 'https://api.openweathermap.org/data/2.5/onecall?exclude=current,minutely,hourly&'
const ServerWithCitiesListAPI = 'http://localhost:3000/data'
const API_KEY = 'c85cc44316d9af84b2fd5c78102b1e0f'

export {
  CurrentWeatherAPI,
  WeeklyWeatherAPI,
  ServerWithCitiesListAPI,
  API_KEY
}
