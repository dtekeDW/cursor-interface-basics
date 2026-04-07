export type CityId = string

export type CityMeta = {
  id: CityId
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  heroImageUrl: string
  heroImageAlt: string
  radarImageUrl: string
  radarImageAlt: string
}

export type GeocodeResult = {
  id: string
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

export type GeocodeApiResponse = {
  results: GeocodeResult[]
}

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

export type WeatherSnapshot = {
  current: CurrentWeather
  hourly: HourlyForecastItem[]
  weekly: WeeklyForecastItem[]
  metrics: WeatherMetric[]
  radar: RadarCard
}

export type ForecastCoreSnapshot = {
  localTime: string
  current: {
    timeLabel: string
    temperature: number
    high: number
    low: number
    condition: string
    icon: string
  }
  hourly: HourlyForecastItem[]
  weekly: WeeklyForecastItem[]
  metrics: WeatherMetric[]
  precipitationPercent: number
}

export type ForecastApiResponse = {
  snapshot: ForecastCoreSnapshot
}

export type ApiErrorShape = {
  error: {
    code: string
    message: string
  }
  status: number
}
