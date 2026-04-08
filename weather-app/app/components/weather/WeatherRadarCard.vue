<script setup lang="ts">
import type { RadarCard } from '~/types/weather'
import { Icon } from '#components'

interface WeatherRadarCardProps {
  /** Radar image and precipitation summary for the active city. */
  radar: RadarCard
  /** Loading flag used to render skeleton placeholders. */
  isLoading?: boolean
}

/** Props for the radar teaser card. */
defineProps<WeatherRadarCardProps>()
</script>

<template>
  <section class="group border border-white/5 rounded-[2rem] h-96 shadow-2xl relative overflow-hidden">
    <template v-if="isLoading">
      <div class="bg-[length:200%_100%] bg-[linear-gradient(115deg,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.12)_40%,rgba(255,255,255,0.05)_60%)] h-full w-full animate-[weather-shimmer_2s_linear_infinite]" />
    </template>
    <img v-else :src="radar.imageUrl" :alt="radar.imageAlt" class="h-full w-full object-cover">

    <div class="pointer-events-none inset-0 absolute from-[#0d0d18]/25 to-transparent bg-gradient-to-t" />

    <div class="flex flex-col gap-2 left-6 top-6 absolute">
      <span class="text-[0.6875rem] tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full bg-[#1b1a26]/40 uppercase">
        Live Radar
      </span>
      <span class="text-primary text-[0.6875rem] tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full bg-[#1b1a26]/40 uppercase">
        {{ radar.precipitationLabel }}
      </span>
    </div>

    <div class="flex gap-2 bottom-6 right-6 absolute">
      <button class="text-white border border-white/10 rounded-full bg-[#1b1a26]/40 grid h-10 w-10 transition place-items-center backdrop-blur-[40px] hover:bg-white/10" type="button" aria-label="Zoom in radar">
        <Icon name="ph:plus" class="text-sm" />
      </button>
      <button class="text-white border border-white/10 rounded-full bg-[#1b1a26]/40 grid h-10 w-10 transition place-items-center backdrop-blur-[40px] hover:bg-white/10" type="button" aria-label="Zoom out radar">
        <Icon name="ph:minus" class="text-sm" />
      </button>
    </div>
  </section>
</template>
