export type CityId = string

export interface CityMeta {
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

export interface GeocodeResult {
  id: string
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
}

export interface GeocodeApiResponse {
  results: GeocodeResult[]
}

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

export interface WeatherSnapshot {
  current: CurrentWeather
  hourly: HourlyForecastItem[]
  weekly: WeeklyForecastItem[]
  metrics: WeatherMetric[]
  radar: RadarCard
}

export interface ForecastCoreSnapshot {
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

export interface ForecastApiResponse {
  snapshot: ForecastCoreSnapshot
}

export interface ApiErrorShape {
  error: {
    code: string
    message: string
  }
  status: number
}
