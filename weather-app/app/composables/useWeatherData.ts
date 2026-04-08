import { storeToRefs } from 'pinia'
import { callOnce } from '#imports'
import { useWeatherStore } from '~/stores/weather'

export const useWeatherData = () => {
  const weatherStore = useWeatherStore()
  const refs = storeToRefs(weatherStore)

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
