import type {
  CityId,
  CityMeta,
  ForecastApiResponse,
  ForecastCoreSnapshot,
  GeocodeResult,
  WeatherCity,
  WeatherSnapshot,
} from '~/types/weather'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const MAX_CITY_COUNT = 10
const STORAGE_KEY = 'weather-dashboard-cities-v1'

const DEFAULT_HERO = 'https://r4.wallpaperflare.com/wallpaper/1021/414/334/cologne-koln-germany-sunset-wallpaper-78a66c9aef4cc729ae4059d23239fb80.jpg'
const DEFAULT_RADAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX0aeQnk_ZBQsvnn_jD3lOclWs65JegyUD4YdGtO_Uy4IdXRBZA8VAt5xCPPd6gS7DUP5wndg3xA3C5lgoxdMLEkm_OU9RUzXQDNtQSJApgVXg3eJ6P-lOlOxnhOTij4X7I_1ESf5n7gu-nfz9QINvyH2QJtwUPkgceYwf2HQHDlZUgT84oyTCVXGzWbgoj2lYDp8dPWSmi_W50SI5fHTuYq2DUb3zDLXQGdWWYEpiSx-s1iHfkQW3v7ff7HHR1sJXl2lLfhTLdVg'

const DEFAULT_CITIES: CityMeta[] = [
  {
    id: 'koeln-germany-50.9375-6.9603',
    name: 'Köln',
    country: 'Germany',
    latitude: 50.9375,
    longitude: 6.9603,
    timezone: 'Europe/Berlin',
    heroImageUrl: DEFAULT_HERO,
    heroImageAlt: 'Cologne skyline in warm sunset light.',
    radarImageUrl: DEFAULT_RADAR,
    radarImageAlt: 'Satellite map with precipitation overlays around Cologne.',
  },
  {
    id: 'frankfurt-germany-50.1109-8.6821',
    name: 'Frankfurt',
    country: 'Germany',
    latitude: 50.1109,
    longitude: 8.6821,
    timezone: 'Europe/Berlin',
    heroImageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=80',
    heroImageAlt: 'Frankfurt skyline during sunset.',
    radarImageUrl: DEFAULT_RADAR,
    radarImageAlt: 'Radar map style weather image.',
  },
  {
    id: 'hannover-germany-52.3759-9.7320',
    name: 'Hannover',
    country: 'Germany',
    latitude: 52.3759,
    longitude: 9.732,
    timezone: 'Europe/Berlin',
    heroImageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1800&q=80',
    heroImageAlt: 'Rainy city street with reflections.',
    radarImageUrl: DEFAULT_RADAR,
    radarImageAlt: 'Radar map style weather image.',
  },
  {
    id: 'bremen-germany-53.0793-8.8017',
    name: 'Bremen',
    country: 'Germany',
    latitude: 53.0793,
    longitude: 8.8017,
    timezone: 'Europe/Berlin',
    heroImageUrl: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=1800&q=80',
    heroImageAlt: 'Overcast weather over city rooftops.',
    radarImageUrl: DEFAULT_RADAR,
    radarImageAlt: 'Radar map style weather image.',
  },
]
const DEFAULT_CITY = DEFAULT_CITIES[0]!

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/\p{Diacritic}/gu, '')
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/^-|-$/g, '')
}

function toCityId(name: string, country: string, latitude: number, longitude: number) {
  return `${slugify(name)}-${slugify(country)}-${latitude.toFixed(4)}-${longitude.toFixed(4)}`
}

function toFallbackCoreSnapshot(): ForecastCoreSnapshot {
  return {
    localTime: '--:--',
    current: {
      timeLabel: '--:--',
      temperature: 0,
      high: 0,
      low: 0,
      condition: 'Loading',
      icon: 'ph:cloud-fill',
    },
    hourly: [],
    weekly: [],
    metrics: [],
    precipitationPercent: 0,
  }
}

function toWeatherSnapshot(city: CityMeta, core: ForecastCoreSnapshot): WeatherSnapshot {
  return {
    current: {
      locationLabel: city.name,
      timeLabel: core.current.timeLabel,
      temperature: core.current.temperature,
      high: core.current.high,
      low: core.current.low,
      condition: core.current.condition,
      icon: core.current.icon,
      heroImageUrl: city.heroImageUrl,
      heroImageAlt: city.heroImageAlt,
    },
    hourly: core.hourly,
    weekly: core.weekly,
    metrics: core.metrics,
    radar: {
      imageUrl: city.radarImageUrl,
      imageAlt: city.radarImageAlt,
      precipitationLabel: `Precipitation: ${core.precipitationPercent}%`,
    },
  }
}

function readCitiesFromStorage(): CityMeta[] | null {
  if (!import.meta.client)
    return null

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw)
    return null

  try {
    const parsed = JSON.parse(raw) as CityMeta[]
    if (!Array.isArray(parsed))
      return null

    const validCities = parsed.filter(city =>
      typeof city?.name === 'string'
      && typeof city?.country === 'string'
      && Number.isFinite(city?.latitude)
      && Number.isFinite(city?.longitude)
      && typeof city?.timezone === 'string'
      && typeof city?.heroImageUrl === 'string'
      && typeof city?.radarImageUrl === 'string',
    )

    return validCities.length ? validCities : null
  }
  catch {
    return null
  }
}

function persistCities(cities: CityMeta[]) {
  if (!import.meta.client)
    return

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities))
}

function isSameCity(left: CityMeta, right: CityMeta) {
  const sameName = left.name.toLowerCase() === right.name.toLowerCase()
  const sameCountry = left.country.toLowerCase() === right.country.toLowerCase()
  const latitudeDiff = Math.abs(left.latitude - right.latitude)
  const longitudeDiff = Math.abs(left.longitude - right.longitude)

  return sameName && sameCountry && latitudeDiff < 0.01 && longitudeDiff < 0.01
}

export const useWeatherStore = defineStore('weather', () => {
  const citiesState = ref<CityMeta[]>([...DEFAULT_CITIES])
  const activeCityId = ref<CityId>(DEFAULT_CITY.id)
  const snapshotByCity = ref<Record<CityId, ForecastCoreSnapshot | undefined>>({})
  const pendingByCity = ref<Record<CityId, boolean>>({})
  const errorByCity = ref<Record<CityId, string | undefined>>({})
  const isInitialized = ref(false)

  const activeCity = computed<CityMeta>(() => citiesState.value.find(city => city.id === activeCityId.value) ?? citiesState.value[0] ?? DEFAULT_CITY)

  const activeCoreSnapshot = computed(() => {
    const city = activeCity.value
    return city ? snapshotByCity.value[city.id] : undefined
  })

  const activeWeather = computed<WeatherSnapshot>(() => {
    const city = activeCity.value
    const core = activeCoreSnapshot.value ?? toFallbackCoreSnapshot()
    return toWeatherSnapshot(city, core)
  })

  const cities = computed<WeatherCity[]>(() => {
    return citiesState.value.map((city) => {
      const snapshot = snapshotByCity.value[city.id]

      return {
        id: city.id,
        name: city.name,
        localTime: snapshot?.localTime ?? '--:--',
        temperature: snapshot?.current.temperature ?? 0,
        condition: snapshot?.current.condition ?? 'Loading',
        icon: snapshot?.current.icon ?? 'ph:cloud-fill',
      }
    })
  })

  const isActiveCityLoading = computed(() => {
    return pendingByCity.value[activeCity.value.id] || !snapshotByCity.value[activeCity.value.id]
  })

  const isSidebarLoading = computed(() => {
    return citiesState.value.some(city => !snapshotByCity.value[city.id])
  })

  const activeCityError = computed(() => errorByCity.value[activeCity.value.id])

  const fetchForecastForCity = async (city: CityMeta) => {
    if (pendingByCity.value[city.id])
      return

    pendingByCity.value = {
      ...pendingByCity.value,
      [city.id]: true,
    }

    try {
      const response = await $fetch<ForecastApiResponse>('/api/weather/forecast', {
        query: {
          lat: city.latitude,
          lon: city.longitude,
          tz: city.timezone,
          hours: 24,
        },
      })

      snapshotByCity.value = {
        ...snapshotByCity.value,
        [city.id]: response.snapshot,
      }

      errorByCity.value = {
        ...errorByCity.value,
        [city.id]: undefined,
      }
    }
    catch (error) {
      errorByCity.value = {
        ...errorByCity.value,
        [city.id]: error instanceof Error ? error.message : 'Unable to load weather data.',
      }
    }
    finally {
      pendingByCity.value = {
        ...pendingByCity.value,
        [city.id]: false,
      }
    }
  }

  const hydrateCities = () => {
    const storedCities = readCitiesFromStorage()
    if (storedCities?.length) {
      citiesState.value = storedCities.map(city => ({
        ...city,
        id: city.id || toCityId(city.name, city.country, city.latitude, city.longitude),
      }))

      if (!citiesState.value.some(city => city.id === activeCityId.value))
        activeCityId.value = citiesState.value[0]?.id ?? DEFAULT_CITY.id
    }
  }

  const fetchCitiesWeather = async (citiesToLoad: CityMeta[]) => {
    await Promise.all(citiesToLoad.map(city => fetchForecastForCity(city)))
  }

  const ensureInitialized = async (options?: { includeAllCities?: boolean }) => {
    const shouldIncludeAllCities = options?.includeAllCities ?? import.meta.client

    if (isInitialized.value) {
      if (shouldIncludeAllCities) {
        const remainingCities = citiesState.value.filter(city => !snapshotByCity.value[city.id] && !pendingByCity.value[city.id])
        if (remainingCities.length)
          void fetchCitiesWeather(remainingCities)
      }
      return
    }

    isInitialized.value = true
    hydrateCities()

    const selected = citiesState.value.find(city => city.id === activeCityId.value)
    if (selected)
      await fetchForecastForCity(selected)

    if (shouldIncludeAllCities) {
      const rest = citiesState.value.filter(city => city.id !== activeCityId.value)
      void fetchCitiesWeather(rest)
    }
  }

  const selectCity = (cityId: CityId) => {
    const city = citiesState.value.find(item => item.id === cityId)
    if (!city)
      return

    activeCityId.value = cityId

    if (!snapshotByCity.value[city.id])
      void fetchForecastForCity(city)
  }

  const addCity = async (cityResult: GeocodeResult) => {
    const newCity: CityMeta = {
      id: toCityId(cityResult.name, cityResult.country, cityResult.latitude, cityResult.longitude),
      name: cityResult.name,
      country: cityResult.country,
      latitude: cityResult.latitude,
      longitude: cityResult.longitude,
      timezone: cityResult.timezone,
      heroImageUrl: DEFAULT_HERO,
      heroImageAlt: `${cityResult.name} skyline under atmospheric weather light.`,
      radarImageUrl: DEFAULT_RADAR,
      radarImageAlt: `Weather radar style map for ${cityResult.name}.`,
    }

    const existing = citiesState.value.find(city => isSameCity(city, newCity))
    if (existing) {
      activeCityId.value = existing.id
      if (!snapshotByCity.value[existing.id])
        await fetchForecastForCity(existing)
      return { added: false as const, reason: 'duplicate' as const }
    }

    if (citiesState.value.length >= MAX_CITY_COUNT)
      return { added: false as const, reason: 'limit' as const }

    citiesState.value = [...citiesState.value, newCity]
    persistCities(citiesState.value)

    activeCityId.value = newCity.id
    await fetchForecastForCity(newCity)

    return { added: true as const }
  }

  return {
    activeCityId,
    activeCity,
    activeWeather,
    cities,
    isActiveCityLoading,
    isSidebarLoading,
    activeCityError,
    ensureInitialized,
    selectCity,
    addCity,
  }
})
