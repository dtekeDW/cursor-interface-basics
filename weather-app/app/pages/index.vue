<script setup lang="ts">
import type { GeocodeResult } from '~/types/weather'
import { useHead, useSeoMeta } from '#imports'
import { onMounted, ref } from 'vue'
import WeatherAddCityModal from '~/components/weather/WeatherAddCityModal.vue'
import WeatherForecastWeek from '~/components/weather/WeatherForecastWeek.vue'
import WeatherHeroCard from '~/components/weather/WeatherHeroCard.vue'
import WeatherHourlyStrip from '~/components/weather/WeatherHourlyStrip.vue'
import WeatherMetricGrid from '~/components/weather/WeatherMetricGrid.vue'
import WeatherRadarCard from '~/components/weather/WeatherRadarCard.vue'
import WeatherSidebarCities from '~/components/weather/WeatherSidebarCities.vue'
import { useWeatherData } from '~/composables/useWeatherData'

const {
  activeCityId,
  activeCityError,
  activeWeather,
  addCity,
  cities,
  initialize,
  isActiveCityLoading,
  isSidebarLoading,
  selectCity,
} = useWeatherData()

/**
 * Performs initial hydration for the active city to get a fast first paint.
 *
 * @example
 * ```ts
 * await initialize({ includeAllCities: false })
 * ```
 */
await initialize({ includeAllCities: false })

/** Completes background initialization after mount for sidebar city cards. */
onMounted(() => {
  void initialize({ includeAllCities: true })
})

const isAddCityModalOpen = ref(false)

/** Opens the city search modal from the sidebar CTA. */
function openAddCityModal() {
  isAddCityModalOpen.value = true
}

/**
 * Persists a selected geocoding result into the weather store.
 *
 * @param city Selected city candidate from modal search results.
 */
async function handleAddCity(city: GeocodeResult) {
  await addCity(city)
}

useSeoMeta({
  title: 'Celestial Weather Dashboard',
  description: 'Pixel-focused weather dashboard mock in Nuxt 4 with responsive desktop and mobile views.',
  ogTitle: 'Celestial Weather Dashboard',
  ogDescription: 'Interactive weather dashboard onepager with hourly and weekly forecast modules.',
})

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
    },
  ],
})
</script>

<template>
  <div class="mx-auto px-4 pb-32 pt-20 max-w-[1600px] lg:px-8 sm:px-6 lg:pb-12">
    <div class="space-y-6 lg:flex lg:gap-8 lg:space-y-0">
      <WeatherSidebarCities
        :cities="cities"
        :active-city-id="activeCityId"
        :is-loading="isSidebarLoading"
        @select="selectCity"
        @add-city="openAddCityModal"
      />

      <main class="flex-1 min-w-0 space-y-10 lg:pt-4">
        <p
          v-if="activeCityError"
          class="text-sm text-rose-200 px-4 py-3 border border-rose-400/30 rounded-xl bg-rose-400/10"
        >
          {{ activeCityError }}
        </p>

        <WeatherHeroCard :current="activeWeather.current" :is-loading="isActiveCityLoading" />

        <WeatherHourlyStrip :hourly="activeWeather.hourly" :is-loading="isActiveCityLoading" />

        <div class="gap-8 grid grid-cols-1 xl:grid-cols-12">
          <div class="xl:col-span-4">
            <WeatherForecastWeek :weekly="activeWeather.weekly" :is-loading="isActiveCityLoading" />
          </div>

          <div class="space-y-8 xl:col-span-8">
            <WeatherRadarCard :radar="activeWeather.radar" :is-loading="isActiveCityLoading" />
            <WeatherMetricGrid :metrics="activeWeather.metrics" :is-loading="isActiveCityLoading" />
          </div>
        </div>

        <footer class="mb-10 mt-20 text-center opacity-40">
          <p class="text-[0.6875rem] tracking-[0.2rem] font-bold uppercase">
            Last Updated: Oct 24, 14:45 Local Time
          </p>
        </footer>
      </main>
    </div>
  </div>

  <WeatherAddCityModal v-model="isAddCityModalOpen" @select="handleAddCity" />
</template>
