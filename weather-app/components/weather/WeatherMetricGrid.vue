<script setup lang="ts">
import type { WeatherMetric } from '~/types/weather'

const props = defineProps<{
  metrics: WeatherMetric[]
}>()
</script>

<template>
  <section class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <article
      v-for="metric in props.metrics"
      :key="metric.id"
      class="rounded-[1.5rem] border border-white/10 bg-white/4 p-5"
    >
      <div class="mb-5 flex items-center justify-between gap-2">
        <p class="text-[11px] font-semibold tracking-[0.1em] text-slate-400 uppercase">{{ metric.label }}</p>
        <span class="material-symbols-outlined text-primary text-lg">{{ metric.icon }}</span>
      </div>

      <p class="text-5xl font-semibold leading-none sm:text-4xl lg:text-5xl">
        {{ metric.value }}
        <span class="text-2xl text-slate-400">{{ metric.unit }}</span>
      </p>

      <p class="mt-3 text-[11px] font-medium tracking-[0.1em] text-slate-500 uppercase">{{ metric.detail }}</p>
    </article>
  </section>
</template>
