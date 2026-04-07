<script setup lang="ts">
import WeatherForecastWeek from '~/components/weather/WeatherForecastWeek.vue'
import WeatherHeroCard from '~/components/weather/WeatherHeroCard.vue'
import WeatherHourlyStrip from '~/components/weather/WeatherHourlyStrip.vue'
import WeatherMetricGrid from '~/components/weather/WeatherMetricGrid.vue'
import WeatherRadarCard from '~/components/weather/WeatherRadarCard.vue'
import WeatherSidebarCities from '~/components/weather/WeatherSidebarCities.vue'
import { useWeatherMock } from '~/composables/useWeatherMock'
import { useHead, useSeoMeta } from '#imports'

const {
  activeCityId,
  activeWeather,
  cities,
  selectCity,
} = useWeatherMock()

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
  <div class="mx-auto max-w-[1600px] px-4 pb-32 pt-20 sm:px-6 lg:px-8 lg:pb-12">
    <div class="space-y-6 lg:flex lg:gap-8 lg:space-y-0">
      <WeatherSidebarCities :cities="cities" :active-city-id="activeCityId" @select="selectCity" />

      <main class="flex-1 space-y-8 lg:pt-4">
        <WeatherHeroCard :current="activeWeather.current" />

        <WeatherHourlyStrip :hourly="activeWeather.hourly" />

        <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div class="xl:col-span-4">
            <WeatherForecastWeek :weekly="activeWeather.weekly" />
          </div>

          <div class="space-y-6 xl:col-span-8">
            <WeatherRadarCard :radar="activeWeather.radar" />
            <WeatherMetricGrid :metrics="activeWeather.metrics" />
          </div>
        </div>

        <footer class="pt-6 text-center text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
          Last Updated: Oct 24, 14:45 Local Time
        </footer>
      </main>
    </div>
  </div>
</template>
