import type {
  ForecastCoreSnapshot,
  GeocodeResult,
  HourlyForecastItem,
  WeatherMetric,
  WeeklyForecastItem,
} from '../../app/types/weather'

const CONDITION_BY_CODE: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mostly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Heavy Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Freezing Rain',
  67: 'Freezing Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Rain Showers',
  81: 'Rain Showers',
  82: 'Heavy Showers',
  85: 'Snow Showers',
  86: 'Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Thunderstorm',
}

/** Maps Open-Meteo weather codes to UI-friendly condition labels. */
const getConditionFromCode = (weatherCode: number) => CONDITION_BY_CODE[weatherCode] ?? 'Unknown'

/** Maps Open-Meteo weather codes to icon names, including day/night variants. */
function getIconFromCode(weatherCode: number, isDay = true) {
  if (weatherCode === 0)
    return isDay ? 'ph:sun-fill' : 'ph:moon-stars-fill'

  if ([1, 2].includes(weatherCode))
    return isDay ? 'ph:cloud-sun-fill' : 'ph:cloud-moon-fill'

  if ([3, 45, 48].includes(weatherCode))
    return 'ph:cloud-fill'

  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
    return 'ph:cloud-rain-fill'

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
    return 'ph:cloud-snow-fill'

  if ([95, 96, 99].includes(weatherCode))
    return 'ph:cloud-lightning-fill'

  return isDay ? 'ph:sun-fill' : 'ph:moon-stars-fill'
}

/** Formats current local time for sidebar city chips. */
function formatLocalTime(timezone: string) {
  return new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(new Date())
}

/** Formats current local time for the hero card label. */
function formatCurrentTimeLabel(timezone: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  }).format(new Date())
}

/** Formats an hourly forecast timestamp in 24h format for timeline items. */
function formatHourLabel(isoTime: string, timezone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(new Date(isoTime))
}

/** Converts degrees into a compass direction label. */
function toCompass(degrees: number) {
  const normalized = ((degrees % 360) + 360) % 360
  if (normalized < 22.5 || normalized >= 337.5)
    return 'North'
  if (normalized < 67.5)
    return 'North East'
  if (normalized < 112.5)
    return 'East'
  if (normalized < 157.5)
    return 'South East'
  if (normalized < 202.5)
    return 'South'
  if (normalized < 247.5)
    return 'South West'
  if (normalized < 292.5)
    return 'West'
  return 'North West'
}

/** Converts a UV index value into a concise risk label for the UI. */
function toUvUnit(uvIndex: number) {
  if (uvIndex >= 8)
    return 'Very High'
  if (uvIndex >= 6)
    return 'High'
  if (uvIndex >= 3)
    return 'Moderate'
  return 'Low'
}

/** Builds the next 24 hourly forecast points used in the hourly strip. */
function buildHourly(raw: any, timezone: string): HourlyForecastItem[] {
  const times = raw.hourly?.time ?? []
  const temperatures = raw.hourly?.temperature_2m ?? []
  const weatherCodes = raw.hourly?.weather_code ?? []
  const dayFlags = raw.hourly?.is_day ?? []

  return times.slice(0, 24).map((time: string, index: number) => ({
    id: `${time}-${index}`,
    time: index === 0 ? 'Now' : formatHourLabel(time, timezone),
    temperature: Math.round(Number(temperatures[index] ?? 0)),
    icon: getIconFromCode(Number(weatherCodes[index] ?? 0), Number(dayFlags[index] ?? 1) === 1),
    isNow: index === 0,
  }))
}

/** Builds the seven-day forecast used in the weekly widget. */
function buildWeekly(raw: any): WeeklyForecastItem[] {
  const dailyTimes = raw.daily?.time ?? []
  const maxTemperatures = raw.daily?.temperature_2m_max ?? []
  const minTemperatures = raw.daily?.temperature_2m_min ?? []
  const weatherCodes = raw.daily?.weather_code ?? []

  return dailyTimes.slice(0, 7).map((time: string, index: number) => ({
    id: time,
    day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
    high: Math.round(Number(maxTemperatures[index] ?? 0)),
    low: Math.round(Number(minTemperatures[index] ?? 0)),
    icon: getIconFromCode(Number(weatherCodes[index] ?? 0), true),
  }))
}

/** Builds compact weather metrics cards from current, daily, and hourly provider fields. */
function buildMetrics(raw: any): WeatherMetric[] {
  const humidity = Math.round(Number(raw.current?.relative_humidity_2m ?? 0))
  const windSpeed = Math.round(Number(raw.current?.wind_speed_10m ?? 0))
  const windDirection = Number(raw.current?.wind_direction_10m ?? 0)
  const pressure = Math.round(Number(raw.current?.pressure_msl ?? 0))

  const uvMax = Number(raw.daily?.uv_index_max?.[0] ?? 0)
  const visibilityMeters = Number(raw.hourly?.visibility?.[0] ?? 0)
  const visibilityKm = Number.isFinite(visibilityMeters) && visibilityMeters > 0
    ? Math.round(visibilityMeters / 1000)
    : 10

  return [
    {
      id: 'wind',
      label: 'Wind',
      value: String(windSpeed),
      unit: 'km/h',
      detail: toCompass(windDirection),
      icon: 'ph:wind',
    },
    {
      id: 'uv',
      label: 'UV Index',
      value: String(Math.round(uvMax)),
      unit: toUvUnit(uvMax),
      detail: 'Solar Index',
      icon: 'ph:sun-dim',
    },
    {
      id: 'humidity',
      label: 'Humidity',
      value: String(humidity),
      unit: '%',
      detail: `Pressure ${pressure} hPa`,
      icon: 'ph:drop',
    },
    {
      id: 'visibility',
      label: 'Visibility',
      value: String(visibilityKm),
      unit: 'km',
      detail: 'Clear View',
      icon: 'ph:eye',
    },
  ]
}

/**
 * Normalizes raw geocoding payload into validated city candidates.
 *
 * This mapper filters incomplete entries so downstream UI/store logic can rely
 * on required fields being present and typed.
 *
 * @param raw Raw Open-Meteo geocoding response.
 * @returns Sanitized list of geocode results.
 *
 * @example
 * ```ts
 * const result = normalizeGeocodeResults({
 *   results: [{ name: 'Cologne', country: 'Germany', timezone: 'Europe/Berlin', latitude: 50.94, longitude: 6.96 }],
 * })
 * ```
 */
export function normalizeGeocodeResults(raw: any): GeocodeResult[] {
  const results = Array.isArray(raw?.results) ? raw.results : []

  return results
    .map((item: any) => {
      const name = String(item?.name ?? '').trim()
      const country = String(item?.country ?? '').trim()
      const timezone = String(item?.timezone ?? '').trim()
      const latitude = Number(item?.latitude)
      const longitude = Number(item?.longitude)

      if (!name || !country || !timezone || !Number.isFinite(latitude) || !Number.isFinite(longitude))
        return null

      return {
        id: `${name.toLowerCase()}-${country.toLowerCase()}-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
        name,
        country,
        latitude,
        longitude,
        timezone,
      } satisfies GeocodeResult
    })
    .filter((item: GeocodeResult | null): item is GeocodeResult => item !== null)
}

/**
 * Normalizes raw forecast payload into the app's view model snapshot.
 *
 * The output is a fully composed structure for hero, hourly, weekly, and
 * metrics widgets, so UI components do not need provider-specific mapping.
 *
 * @param raw Raw Open-Meteo forecast response.
 * @param timezone IANA timezone used for localized labels.
 * @returns UI-ready weather snapshot.
 *
 * @example
 * ```ts
 * const snapshot = normalizeForecastPayload(providerResponse, 'Europe/Berlin')
 * ```
 */
export function normalizeForecastPayload(raw: any, timezone: string): ForecastCoreSnapshot {
  const currentCode = Number(raw.current?.weather_code ?? 0)
  const currentIsDay = Number(raw.current?.is_day ?? 1) === 1
  const currentTemperature = Math.round(Number(raw.current?.temperature_2m ?? 0))
  const dailyHigh = Math.round(Number(raw.daily?.temperature_2m_max?.[0] ?? currentTemperature))
  const dailyLow = Math.round(Number(raw.daily?.temperature_2m_min?.[0] ?? currentTemperature))
  const precipitationCurrent = Number(raw.current?.precipitation ?? 0)
  const precipitationProbability = Number(raw.hourly?.precipitation_probability?.[0] ?? 0)

  const precipitationPercent = Number.isFinite(precipitationProbability) && precipitationProbability > 0
    ? Math.round(precipitationProbability)
    : Math.max(0, Math.min(100, Math.round(precipitationCurrent * 100)))

  return {
    localTime: formatLocalTime(timezone),
    current: {
      timeLabel: formatCurrentTimeLabel(timezone),
      temperature: currentTemperature,
      high: dailyHigh,
      low: dailyLow,
      condition: getConditionFromCode(currentCode),
      icon: getIconFromCode(currentCode, currentIsDay),
    },
    hourly: buildHourly(raw, timezone),
    weekly: buildWeekly(raw),
    metrics: buildMetrics(raw),
    precipitationPercent,
  }
}
