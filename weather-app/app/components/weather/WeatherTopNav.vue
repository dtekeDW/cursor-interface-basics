<script setup lang="ts">
import { Icon } from '#components'

interface WeatherTopNavProps {
  /** Active city name shown in the top-left location badge. */
  cityName: string
}

/** Top navigation props for location-aware weather context. */
defineProps<WeatherTopNavProps>()

/** Static navigation labels used by the desktop top bar. */
const navItems = [
  'Dashboard',
  'Forecast',
  'Radar',
  'Settings',
]
</script>

<template>
  <header class="border-b border-white/6 bg-[#0d0d18]/80 h-16 w-full shadow-[0_8px_32px_rgba(13,13,24,0.5)] top-0 fixed z-50 backdrop-blur-xl">
    <div class="mx-auto px-4 flex h-full max-w-[1600px] items-center justify-between lg:px-8 sm:px-6">
      <div class="text-lg text-slate-100 tracking-widest font-bold flex gap-3 uppercase items-center">
        <Icon name="ph:map-pin-fill" class="text-lg text-[#ffb68d]" />
        <span>{{ cityName }}</span>
      </div>

      <nav class="gap-8 hidden items-center md:flex">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="text-sm tracking-widest font-medium uppercase transition-opacity"
          :class="item === 'Dashboard' ? 'text-[#ffb68d]' : 'hover:text-white'"
        >
          {{ item }}
        </a>
      </nav>

      <div class="text-slate-400 flex gap-3 items-center">
        <button class="p-1 rounded-full transition hover:text-white" type="button" aria-label="Open notifications">
          <Icon name="ph:bell" class="text-lg" />
        </button>

        <div class="border border-white/15 rounded-full h-8 w-8 hidden overflow-hidden md:block">
          <img
            class="h-full w-full object-cover"
            alt="Profile avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeg47dP3xaRvRpFdH2AO9Oqnfou3VbSSsBOR6EMcN6Rj4xgW44dK2_91KiwFoV_vG67UCzQlrwAAUnHajwEP5SrTcvmZIpshBIaQRAL4AOz53NKg-9MprcWKGYCBOO94yU5Bo5y3wR31_X4kKoEdE5QVRyIAcN2qiB095HzgWqa2PxlzgvJXP0iOamAYRnwVFO0WTmQeADwywL1YU5_ueim5H29P5zOSu_xmF1Zx4VNS9OahDVSU44mab67AfuVjMWHtBIAtSsJaw"
          >
        </div>
      </div>
    </div>
  </header>
</template>
