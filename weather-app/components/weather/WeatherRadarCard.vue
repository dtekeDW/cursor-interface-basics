<script setup lang="ts">
import type { RadarCard } from '~/types/weather'

defineProps<{
  radar: RadarCard
}>()
</script>

<template>
  <section class="border border-white/10 rounded-[1.75rem] relative overflow-hidden">
    <img :src="radar.imageUrl" :alt="radar.imageAlt" class="h-[280px] w-full object-cover md:h-[360px]">

    <div class="pointer-events-none inset-0 absolute from-[#0d0d18]/25 to-transparent bg-gradient-to-t" />

    <div class="flex flex-col gap-2 left-4 top-4 absolute sm:left-6 sm:top-6">
      <span class="text-[11px] tracking-[0.12em] font-bold px-4 py-2 border border-white/15 rounded-full bg-[#1b1a26]/65 uppercase">
        Live Radar
      </span>
      <span class="border-primary/25 text-primary text-[11px] tracking-[0.12em] font-bold px-4 py-2 border rounded-full bg-[#1b1a26]/65 uppercase">
        {{ radar.precipitationLabel }}
      </span>
    </div>

    <div class="flex gap-2 bottom-4 right-4 absolute sm:bottom-6 sm:right-6">
      <button class="text-white border border-white/15 rounded-full bg-[#1b1a26]/65 grid h-10 w-10 transition place-items-center hover:bg-[#1b1a26]" type="button" aria-label="Zoom in radar">
        <span class="material-symbols-outlined text-lg">add</span>
      </button>
      <button class="text-white border border-white/15 rounded-full bg-[#1b1a26]/65 grid h-10 w-10 transition place-items-center hover:bg-[#1b1a26]" type="button" aria-label="Zoom out radar">
        <span class="material-symbols-outlined text-lg">remove</span>
      </button>
    </div>
  </section>
</template>
