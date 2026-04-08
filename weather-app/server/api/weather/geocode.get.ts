import type { GeocodeApiResponse } from '../../../app/types/weather'
import { useRuntimeConfig } from '#imports'
import { getOptionalNumberQuery, getStringQuery, withApiBuilder } from '../../utils/apiBuilder'
import { normalizeGeocodeResults } from '../../utils/openMeteoMapper'

/**
 * City search endpoint for weather locations.
 *
 * Accepts a free-text query and optional result limit, forwards request to the
 * geocoding provider, and returns normalized results for the app.
 *
 * @example
 * ```txt
 * GET /api/weather/geocode?q=vienna&limit=5
 * ```
 */
const geocodeHandler = withApiBuilder<GeocodeApiResponse>(async (event): Promise<GeocodeApiResponse> => {
  const query = getStringQuery(event, 'q')
  const limit = getOptionalNumberQuery(event, 'limit', 8, { min: 1, max: 20 })
  const config = useRuntimeConfig(event)

  const response: { results?: unknown[] } = await $fetch(`${config.public.weatherGeocodeBaseUrl}/v1/search`, {
    query: {
      name: query,
      count: limit,
      language: 'en',
      format: 'json',
    },
  })

  return {
    results: normalizeGeocodeResults(response),
  }
})

export default geocodeHandler
