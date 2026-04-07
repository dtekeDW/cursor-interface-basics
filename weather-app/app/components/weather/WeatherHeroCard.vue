<script setup lang="ts">
import type { CurrentWeather } from '~/types/weather'
import { Icon } from '#components'

defineProps<{
  current: CurrentWeather
}>()
</script>

<template>
  <section class="group relative min-h-[500px] overflow-hidden rounded-[2.5rem] border border-white/10 p-8 lg:p-16">
    <img
      :src="current.heroImageUrl"
      :alt="current.heroImageAlt"
      class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    >

    <div class="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent" />
    <div class="absolute inset-0 bg-gradient-to-r from-[#0d0d18]/40 to-transparent" />

    <div class="mt-auto flex flex-col h-full justify-end relative z-10">
      <div class="mb-2 flex items-end gap-6">
        <h1 class="text-[8rem] font-extrabold leading-none tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,182,141,0.3)] lg:text-[10rem]">
          {{ current.temperature }}°
        </h1>

        <div class="mb-6">
          <h2 class="mb-2 text-4xl font-bold text-white lg:text-5xl">
            {{ current.locationLabel }}
          </h2>
          <p class="flex items-center gap-2 text-lg font-medium text-primary">
            {{ current.condition }}
            <Icon :name="current.icon" class="text-xl" />
          </p>
        </div>
      </div>

      <div class="flex gap-3">
        <span class="rounded-full border border-white/10 bg-[#1b1a26]/40 px-4 py-2 text-xs font-bold tracking-widest uppercase">
          H: {{ current.high }}°
        </span>
        <span class="rounded-full border border-white/10 bg-[#1b1a26]/40 px-4 py-2 text-xs font-bold tracking-widest uppercase">
          L: {{ current.low }}°
        </span>
      </div>
    </div>
  </section>
</template>
