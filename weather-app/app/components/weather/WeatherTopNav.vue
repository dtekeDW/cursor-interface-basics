<script setup lang="ts">
import { Icon } from '#components'

defineProps<{ cityName: string }>()

const navItems = [
  'Dashboard',
  'Forecast',
  'Radar',
  'Settings',
]
</script>

<template>
  <header class="fixed top-0 z-50 h-16 w-full border-b border-white/6 bg-[#0d0d18]/80 backdrop-blur-xl">
    <div class="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-2 text-sm font-bold tracking-[0.2em] text-[#f0ecff] uppercase sm:text-base">
        <Icon name="ph:map-pin-fill" class="text-2xl text-[#ffb68d]" />
        <span>{{ cityName }}</span>
      </div>

      <nav class="hidden items-center gap-6 text-xs font-medium tracking-[0.18em] text-slate-400 uppercase md:flex">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="transition-colors"
          :class="item === 'Dashboard' ? 'text-[#ffb68d]' : 'hover:text-white'"
        >
          {{ item }}
        </a>
      </nav>

      <div class="flex items-center gap-3 text-slate-400">
        <button class="rounded-full p-1 transition hover:text-white" type="button" aria-label="Open notifications">
          <Icon name="ph:bell" class="text-2xl" />
        </button>

        <div class="hidden h-8 w-8 overflow-hidden rounded-full border border-white/15 md:block">
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
