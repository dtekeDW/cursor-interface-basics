import type { ForecastApiResponse } from '../../../app/types/weather'
import { useRuntimeConfig } from '#imports'
import { useStorage } from 'nitropack/runtime'
import { withApiBuilder, getOptionalNumberQuery, getNumberQuery, getStringQuery, ApiBuilderError } from '../../utils/apiBuilder'
import { normalizeForecastPayload } from '../../utils/openMeteoMapper'

type CachedForecast = {
  expiresAt: number
  payload: ForecastApiResponse
}

const forecastHandler = withApiBuilder<ForecastApiResponse>(async (event): Promise<ForecastApiResponse> => {
  const latitude = getNumberQuery(event, 'lat', { min: -90, max: 90 })
  const longitude = getNumberQuery(event, 'lon', { min: -180, max: 180 })
  const timezone = getStringQuery(event, 'tz')
  const hours = getOptionalNumberQuery(event, 'hours', 24, { min: 24, max: 48 })

  if (![24, 48].includes(hours))
    throw new ApiBuilderError('BAD_REQUEST', 'hours must be 24 or 48', 400)

  const config = useRuntimeConfig(event)
  const cacheStorage = useStorage('cache')
  const cacheKey = `weather:forecast:${latitude.toFixed(4)}:${longitude.toFixed(4)}:${timezone}:${hours}`
  const now = Date.now()

  const cached = await cacheStorage.getItem<CachedForecast>(cacheKey)
  if (cached && cached.expiresAt > now)
    return cached.payload

  const providerResponse: Record<string, any> = await $fetch(`${config.public.weatherForecastBaseUrl}/v1/forecast`, {
    query: {
      latitude,
      longitude,
      timezone,
      forecast_hours: hours,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'weather_code',
        'cloud_cover',
        'pressure_msl',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
        'is_day',
      ].join(','),
      hourly: [
        'temperature_2m',
        'precipitation_probability',
        'precipitation',
        'weather_code',
        'wind_speed_10m',
        'wind_direction_10m',
        'wind_gusts_10m',
        'visibility',
        'is_day',
      ].join(','),
      daily: [
        'weather_code',
        'temperature_2m_max',
        'temperature_2m_min',
        'uv_index_max',
      ].join(','),
    },
  })

  const payload: ForecastApiResponse = {
    snapshot: normalizeForecastPayload(providerResponse, timezone),
  }

  await cacheStorage.setItem(cacheKey, {
    expiresAt: now + Number(config.public.weatherCacheTtlMs),
    payload,
  } satisfies CachedForecast)

  return payload
})

export default forecastHandler
