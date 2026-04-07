<script setup lang="ts">
import { Icon } from '#components'
import type { RadarCard } from '~/types/weather'

defineProps<{
  radar: RadarCard
}>()
</script>

<template>
  <section class="relative overflow-hidden rounded-[1.75rem] border border-white/10">
    <img :src="radar.imageUrl" :alt="radar.imageAlt" class="h-[280px] w-full object-cover md:h-[360px]" >

    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d18]/25 to-transparent" />

    <div class="absolute left-4 top-4 flex flex-col gap-2 sm:left-6 sm:top-6">
      <span class="rounded-full border border-white/15 bg-[#1b1a26]/65 px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase">
        Live Radar
      </span>
      <span class="rounded-full border border-primary/25 bg-[#1b1a26]/65 px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-primary uppercase">
        {{ radar.precipitationLabel }}
      </span>
    </div>

    <div class="absolute bottom-4 right-4 flex gap-2 sm:bottom-6 sm:right-6">
      <button class="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-[#1b1a26]/65 text-white transition hover:bg-[#1b1a26]" type="button" aria-label="Zoom in radar">
        <Icon name="ph:plus" class="text-2xl" />
      </button>
      <button class="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-[#1b1a26]/65 text-white transition hover:bg-[#1b1a26]" type="button" aria-label="Zoom out radar">
        <Icon name="ph:minus" class="text-2xl" />
      </button>
    </div>
  </section>
</template>
