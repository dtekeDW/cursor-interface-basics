<script setup lang="ts">
import WeatherBottomNav from '~/components/weather/WeatherBottomNav.vue'
import WeatherTopNav from '~/components/weather/WeatherTopNav.vue'
import { useWeatherMock } from '~/composables/useWeatherMock'

const {
  activeWeather,
} = useWeatherMock()
</script>

<template>
  <div class="relative min-h-screen bg-[#0b0b16] text-[#e3e0f1]">
    <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,182,141,0.08),rgba(13,13,24,0)_52%)]" />
    <div class="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_60%,rgba(37,99,235,0.05),rgba(13,13,24,0)_45%)]" />
    <div class="pointer-events-none fixed inset-0 bg-[linear-gradient(to_bottom,rgba(3,3,11,0.45),rgba(3,3,11,0.12)_25%,rgba(3,3,11,0.45))]" />

    <WeatherTopNav :city-name="activeWeather.current.locationLabel" />

    <div class="relative z-10">
      <slot />
    </div>

    <WeatherBottomNav />
  </div>
</template>
