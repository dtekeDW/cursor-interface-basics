import type { GeocodeApiResponse } from '../../../app/types/weather'
import { useRuntimeConfig } from '#imports'
import { withApiBuilder, getOptionalNumberQuery, getStringQuery } from '../../utils/apiBuilder'
import { normalizeGeocodeResults } from '../../utils/openMeteoMapper'

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
