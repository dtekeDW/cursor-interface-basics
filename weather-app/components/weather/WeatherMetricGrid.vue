<script setup lang="ts">
import type { WeatherMetric } from '~/types/weather'

const props = defineProps<{
  metrics: WeatherMetric[]
}>()
</script>

<template>
  <section class="gap-4 grid grid-cols-2 lg:grid-cols-4">
    <article
      v-for="metric in props.metrics"
      :key="metric.id"
      class="p-5 border border-white/10 rounded-[1.5rem] bg-white/4"
    >
      <div class="mb-5 flex gap-2 items-center justify-between">
        <p class="text-[11px] text-slate-400 tracking-[0.1em] font-semibold uppercase">
          {{ metric.label }}
        </p>
        <span class="material-symbols-outlined text-primary text-lg">{{ metric.icon }}</span>
      </div>

      <p class="text-5xl leading-none font-semibold lg:text-5xl sm:text-4xl">
        {{ metric.value }}
        <span class="text-2xl text-slate-400">{{ metric.unit }}</span>
      </p>

      <p class="text-[11px] text-slate-500 tracking-[0.1em] font-medium mt-3 uppercase">
        {{ metric.detail }}
      </p>
    </article>
  </section>
</template>
