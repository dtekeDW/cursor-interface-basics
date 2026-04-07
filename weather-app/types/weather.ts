export type CityId = 'koeln' | 'frankfurt' | 'hannover' | 'bremen' | 'san-francisco'

export type WeatherCity = {
  id: CityId
  name: string
  localTime: string
  temperature: number
  condition: string
  icon: string
}

export type CurrentWeather = {
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

export type HourlyForecastItem = {
  id: string
  time: string
  temperature: number
  icon: string
  isNow?: boolean
}

export type WeeklyForecastItem = {
  id: string
  day: string
  high: number
  low: number
  icon: string
}

export type WeatherMetric = {
  id: string
  label: string
  value: string
  unit: string
  detail: string
  icon: string
}

export type RadarCard = {
  imageUrl: string
  imageAlt: string
  precipitationLabel: string
}

export type CityWeather = {
  city: WeatherCity
  current: CurrentWeather
  hourly: HourlyForecastItem[]
  weekly: WeeklyForecastItem[]
  metrics: WeatherMetric[]
  radar: RadarCard
}
