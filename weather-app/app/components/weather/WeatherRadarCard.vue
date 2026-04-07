<script setup lang="ts">
import type { RadarCard } from '~/types/weather'
import { Icon } from '#components'

defineProps<{
  radar: RadarCard
  isLoading?: boolean
}>()
</script>

<template>
  <section class="group relative h-96 overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
    <template v-if="isLoading">
      <div class="h-full w-full bg-[linear-gradient(115deg,rgba(255,255,255,0.05)_20%,rgba(255,255,255,0.12)_40%,rgba(255,255,255,0.05)_60%)] bg-[length:200%_100%] animate-[weather-shimmer_2s_linear_infinite]" />
    </template>
    <img v-else :src="radar.imageUrl" :alt="radar.imageAlt" class="h-full w-full object-cover">

    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d18]/25 to-transparent" />

    <div class="absolute top-6 left-6 flex flex-col gap-2">
      <span class="rounded-full border border-white/10 bg-[#1b1a26]/40 px-4 py-2 text-[0.6875rem] font-bold tracking-widest uppercase">
        Live Radar
      </span>
      <span class="rounded-full border border-white/10 bg-[#1b1a26]/40 px-4 py-2 text-[0.6875rem] font-bold tracking-widest text-primary uppercase">
        {{ radar.precipitationLabel }}
      </span>
    </div>

    <div class="absolute bottom-6 right-6 flex gap-2">
      <button class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#1b1a26]/40 text-white backdrop-blur-[40px] transition hover:bg-white/10" type="button" aria-label="Zoom in radar">
        <Icon name="ph:plus" class="text-sm" />
      </button>
      <button class="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#1b1a26]/40 text-white backdrop-blur-[40px] transition hover:bg-white/10" type="button" aria-label="Zoom out radar">
        <Icon name="ph:minus" class="text-sm" />
      </button>
    </div>
  </section>
</template>
