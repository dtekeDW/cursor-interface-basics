<script setup lang="ts">
import { useHead, useSeoMeta } from '#imports'
import type { GeocodeResult } from '~/types/weather'
import WeatherAddCityModal from '~/components/weather/WeatherAddCityModal.vue'
import WeatherForecastWeek from '~/components/weather/WeatherForecastWeek.vue'
import WeatherHeroCard from '~/components/weather/WeatherHeroCard.vue'
import WeatherHourlyStrip from '~/components/weather/WeatherHourlyStrip.vue'
import WeatherMetricGrid from '~/components/weather/WeatherMetricGrid.vue'
import WeatherRadarCard from '~/components/weather/WeatherRadarCard.vue'
import WeatherSidebarCities from '~/components/weather/WeatherSidebarCities.vue'
import { useWeatherData } from '~/composables/useWeatherData'
import { ref } from 'vue'

const {
  activeCityId,
  activeCityError,
  activeWeather,
  addCity,
  cities,
  isActiveCityLoading,
  isSidebarLoading,
  selectCity,
} = useWeatherData()

const isAddCityModalOpen = ref(false)

const openAddCityModal = () => {
  isAddCityModalOpen.value = true
}

const handleAddCity = async (city: GeocodeResult) => {
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
  <div class="mx-auto max-w-[1600px] px-4 pt-20 pb-32 sm:px-6 lg:px-8 lg:pb-12">
    <div class="space-y-6 lg:flex lg:gap-8 lg:space-y-0">
      <WeatherSidebarCities
        :cities="cities"
        :active-city-id="activeCityId"
        :is-loading="isSidebarLoading"
        @select="selectCity"
        @add-city="openAddCityModal"
      />

      <main class="min-w-0 flex-1 space-y-10 lg:pt-4">
        <p
          v-if="activeCityError"
          class="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"
        >
          {{ activeCityError }}
        </p>

        <WeatherHeroCard :current="activeWeather.current" :is-loading="isActiveCityLoading" />

        <WeatherHourlyStrip :hourly="activeWeather.hourly" :is-loading="isActiveCityLoading" />

        <div class="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div class="xl:col-span-4">
            <WeatherForecastWeek :weekly="activeWeather.weekly" :is-loading="isActiveCityLoading" />
          </div>

          <div class="space-y-8 xl:col-span-8">
            <WeatherRadarCard :radar="activeWeather.radar" :is-loading="isActiveCityLoading" />
            <WeatherMetricGrid :metrics="activeWeather.metrics" :is-loading="isActiveCityLoading" />
          </div>
        </div>

        <footer class="mt-20 mb-10 text-center opacity-40">
          <p class="text-[0.6875rem] font-bold tracking-[0.2rem] uppercase">
            Last Updated: Oct 24, 14:45 Local Time
          </p>
        </footer>
      </main>
    </div>
  </div>

  <WeatherAddCityModal v-model="isAddCityModalOpen" @select="handleAddCity" />
</template>
