<script setup lang="ts">
defineProps<{ cityName: string }>()

const navItems = [
  'Dashboard',
  'Forecast',
  'Radar',
  'Settings',
]
</script>

<template>
  <header class="border-b border-white/6 bg-[#0d0d18]/80 h-16 w-full top-0 fixed z-50 backdrop-blur-xl">
    <div class="mx-auto px-4 flex h-full max-w-[1600px] items-center justify-between lg:px-8 sm:px-6">
      <div class="text-sm text-slate-100 tracking-[0.2em] font-bold flex gap-2 uppercase items-center sm:text-base">
        <span class="material-symbols-outlined text-primary text-lg">location_on</span>
        <span>{{ cityName }}</span>
      </div>

      <nav class="text-xs text-slate-400 tracking-[0.18em] font-medium gap-6 hidden uppercase items-center md:flex">
        <a
          v-for="item in navItems"
          :key="item"
          href="#"
          class="transition-colors"
          :class="item === 'Dashboard' ? 'text-primary' : 'hover:text-white'"
        >
          {{ item }}
        </a>
      </nav>

      <div class="text-slate-400 flex gap-3 items-center">
        <button class="p-1 rounded-full transition hover:text-white" type="button" aria-label="Open notifications">
          <span class="material-symbols-outlined text-xl">notifications</span>
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
