<script setup lang="ts">
import type { CurrentWeather } from '~/types/weather'

defineProps<{
  current: CurrentWeather
}>()
</script>

<template>
  <section class="group relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:min-h-[420px] sm:p-8 lg:min-h-[500px] lg:p-14">
    <img
      :src="current.heroImageUrl"
      :alt="current.heroImageAlt"
      class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
    >

    <div class="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-[#0d0d18]/35 to-transparent" />
    <div class="absolute inset-0 bg-gradient-to-r from-[#0d0d18]/65 via-transparent to-transparent" />

    <div class="relative z-10 mt-auto flex h-full flex-col justify-end">
      <div class="mb-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
        <h1 class="leading-none text-[5rem] font-extrabold text-white drop-shadow-[0_0_30px_rgba(255,182,141,0.35)] sm:text-[7rem] lg:text-[10rem]">
          {{ current.temperature }}°
        </h1>

        <div class="pb-1 sm:pb-5">
          <h2 class="text-4xl font-bold text-white lg:text-6xl">{{ current.locationLabel }}</h2>
          <p class="mt-2 flex items-center gap-2 text-lg text-primary">
            {{ current.condition }}
            <span class="material-symbols-outlined">{{ current.icon }}</span>
          </p>
        </div>
      </div>

      <div class="flex gap-3">
        <span class="rounded-full border border-white/15 bg-[#1b1a26]/45 px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase">
          H: {{ current.high }}°
        </span>
        <span class="rounded-full border border-white/15 bg-[#1b1a26]/45 px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase">
          L: {{ current.low }}°
        </span>
      </div>
    </div>
  </section>
</template>
