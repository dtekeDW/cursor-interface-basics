<script setup lang="ts">
import type { HourlyForecastItem } from '~/types/weather'

const props = defineProps<{
  hourly: HourlyForecastItem[]
}>()
</script>

<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-[11px] text-slate-500 tracking-[0.16em] font-bold uppercase">
        Hourly Outlook
      </h3>
      <span class="material-symbols-outlined text-slate-500">schedule</span>
    </div>

    <div class="hide-scrollbar pb-2 flex gap-3 overflow-x-auto sm:gap-4">
      <article
        v-for="hour in props.hourly"
        :key="hour.id"
        class="p-4 text-center border rounded-[1.25rem] shrink-0 w-24 transition sm:p-5 sm:w-28"
        :class="hour.isNow
          ? 'border-primary/35 bg-primary/10 shadow-[0_0_24px_rgba(255,182,141,0.15)]'
          : 'border-white/10 bg-white/4 hover:border-white/20'"
      >
        <p class="text-[11px] text-slate-300 tracking-[0.08em] font-semibold uppercase">
          {{ hour.time }}
        </p>

        <span class="material-symbols-outlined text-primary text-3xl my-3">{{ hour.icon }}</span>

        <p class="text-3xl leading-none font-semibold">
          {{ hour.temperature }}°
        </p>
      </article>
    </div>
  </section>
</template>
