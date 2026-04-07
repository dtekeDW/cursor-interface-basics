<script setup lang="ts">
import type { CurrentWeather } from '~/types/weather'

defineProps<{
  current: CurrentWeather
}>()
</script>

<template>
  <section class="group p-6 border border-white/10 rounded-[2rem] min-h-[360px] relative overflow-hidden lg:p-14 sm:p-8 lg:min-h-[500px] sm:min-h-[420px]">
    <img
      :src="current.heroImageUrl"
      :alt="current.heroImageAlt"
      class="h-full w-full transition duration-700 inset-0 absolute object-cover group-hover:scale-105"
    >

    <div class="inset-0 absolute from-[#0d0d18] to-transparent via-[#0d0d18]/35 bg-gradient-to-t" />
    <div class="inset-0 absolute from-[#0d0d18]/65 to-transparent via-transparent bg-gradient-to-r" />

    <div class="mt-auto flex flex-col h-full justify-end relative z-10">
      <div class="mb-2 flex flex-col gap-3 sm:flex-row sm:gap-6 sm:items-end">
        <h1 class="text-[5rem] text-white leading-none font-extrabold drop-shadow-[0_0_30px_rgba(255,182,141,0.35)] lg:text-[10rem] sm:text-[7rem]">
          {{ current.temperature }}°
        </h1>

        <div class="pb-1 sm:pb-5">
          <h2 class="text-4xl text-white font-bold lg:text-6xl">
            {{ current.locationLabel }}
          </h2>
          <p class="text-primary text-lg mt-2 flex gap-2 items-center">
            {{ current.condition }}
            <span class="material-symbols-outlined">{{ current.icon }}</span>
          </p>
        </div>
      </div>

      <div class="flex gap-3">
        <span class="text-xs tracking-[0.08em] font-semibold px-4 py-2 border border-white/15 rounded-full bg-[#1b1a26]/45 uppercase">
          H: {{ current.high }}°
        </span>
        <span class="text-xs tracking-[0.08em] font-semibold px-4 py-2 border border-white/15 rounded-full bg-[#1b1a26]/45 uppercase">
          L: {{ current.low }}°
        </span>
      </div>
    </div>
  </section>
</template>
