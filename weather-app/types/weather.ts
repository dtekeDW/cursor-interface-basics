export type CityId = 'koeln' | 'frankfurt' | 'hannover' | 'bremen' | 'san-francisco'

export interface WeatherCity {
  id: CityId
  name: string
  localTime: string
  temperature: number
  condition: string
  icon: string
}

export interface CurrentWeather {
  locationLabel: string
  timeLabel: string
  temperature: number
  high: number
  low: number
  condition: string
  icon: string
  heroImageUrl: string
  heroImageAlt: string
}

export interface HourlyForecastItem {
  id: string
  time: string
  temperature: number
  icon: string
  isNow?: boolean
}

export interface WeeklyForecastItem {
  id: string
  day: string
  high: number
  low: number
  icon: string
}

export interface WeatherMetric {
  id: string
  label: string
  value: string
  unit: string
  detail: string
  icon: string
}

export interface RadarCard {
  imageUrl: string
  imageAlt: string
  precipitationLabel: string
}

export interface CityWeather {
  city: WeatherCity
  current: CurrentWeather
  hourly: HourlyForecastItem[]
  weekly: WeeklyForecastItem[]
  metrics: WeatherMetric[]
  radar: RadarCard
}
