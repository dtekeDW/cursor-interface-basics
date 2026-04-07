<script setup lang="ts">
import WeatherBottomNav from '~/components/weather/WeatherBottomNav.vue'
import WeatherTopNav from '~/components/weather/WeatherTopNav.vue'
import { useWeatherMock } from '~/composables/useWeatherMock'

const {
  activeWeather,
} = useWeatherMock()
</script>

<template>
  <div class="text-[#e3e0f1] bg-[#0d0d18] min-h-screen relative">
    <div class="bg-[radial-gradient(circle_at_80%_15%,rgba(255,182,141,0.16),rgba(13,13,24,0)_52%)] pointer-events-none inset-0 fixed" />
    <div class="bg-[radial-gradient(circle_at_15%_60%,rgba(59,130,246,0.10),rgba(13,13,24,0)_45%)] pointer-events-none inset-0 fixed" />

    <WeatherTopNav :city-name="activeWeather.current.locationLabel" />

    <div class="relative z-10">
      <slot />
    </div>

    <WeatherBottomNav />
  </div>
</template>
