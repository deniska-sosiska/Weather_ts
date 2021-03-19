export interface WeatherForecastAPIState {
  superficialForecast: SuperficialForecastInterface ;
  wholeWeatherForecast: WholeWeatherForecastInterface;
  forecastOfWeek: Array<WholeWeatherForecastInterface>;
}

export interface LoadingState {
  loadingSelectDayWindow: boolean;
  loadingMainWindow: boolean;
}

export interface RequestObject {
  url: string;
  options: string;
  method?: string;
}

type CityName = string
export interface SearchCity {
  coords: Coordinates
  cityName?: CityName;
}

export interface Coordinates {
  lat: number;
  lon: number;
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
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<Weather>; //my interface ↑↑↑
  wind: {
    speed: number;
    deg: number;
  }
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