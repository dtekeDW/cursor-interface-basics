<script setup lang="ts">
import WeatherBottomNav from '~/components/weather/WeatherBottomNav.vue'
import WeatherTopNav from '~/components/weather/WeatherTopNav.vue'
import { useWeatherMock } from '~/composables/useWeatherMock'

const {
  activeWeather,
} = useWeatherMock()
</script>

<template>
  <div class="relative min-h-screen bg-[#0d0d18] text-[#e3e0f1]">
    <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,182,141,0.10),rgba(13,13,24,0)_52%)]" />
    <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(37,99,235,0.06),rgba(13,13,24,0)_45%)]" />

    <WeatherTopNav :city-name="activeWeather.current.locationLabel" />

    <div class="relative z-10">
      <slot />
    </div>

    <WeatherBottomNav />
  </div>
</template>
