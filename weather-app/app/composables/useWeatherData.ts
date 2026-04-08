import { callOnce } from '#imports'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '~/stores/weather'

/** Exposes store-backed weather state plus an idempotent initialization entrypoint. */
export function useWeatherData() {
  const weatherStore = useWeatherStore()
  const refs = storeToRefs(weatherStore)

  /** Initializes weather data once per mode to avoid duplicate bootstrap fetches. */
  const initialize = async (options?: { includeAllCities?: boolean }) => {
    const key = options?.includeAllCities ? 'weather-init-all' : 'weather-init-active'
    await callOnce(key, async () => {
      await weatherStore.ensureInitialized(options)
    })
  }

  return {
    ...refs,
    initialize,
    selectCity: weatherStore.selectCity,
    addCity: weatherStore.addCity,
  }
}
