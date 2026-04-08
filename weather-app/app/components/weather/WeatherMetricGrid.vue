<script setup lang="ts">
import type { WeatherMetric } from '~/types/weather'
import { Icon } from '#components'

interface WeatherMetricGridProps {
  /** Metric cards shown below radar (wind, UV, humidity, visibility). */
  metrics: WeatherMetric[]
  /** Loading flag used to render skeleton placeholders. */
  isLoading?: boolean
}

/** Props for the compact weather metric grid. */
const props = defineProps<WeatherMetricGridProps>()
</script>

<template>
  <section class="gap-6 grid grid-cols-2 md:grid-cols-4">
    <template v-if="props.isLoading">
      <article
        v-for="item in 4"
        :key="`metric-skeleton-${item}`"
        class="p-6 border border-white/5 rounded-[1.5rem] bg-white/4"
      >
        <div class="rounded bg-white/12 h-3 w-14 animate-pulse" />
        <div class="mt-6 rounded bg-white/12 h-8 w-16 animate-pulse" />
        <div class="mt-2 rounded bg-white/12 h-3 w-20 animate-pulse" />
      </article>
    </template>

    <template v-else>
      <article
        v-for="metric in props.metrics"
        :key="metric.id"
        class="p-6 border border-white/5 rounded-[1.5rem] bg-white/4"
      >
        <div class="text-slate-400 flex items-center justify-between">
          <p class="text-[0.6875rem] tracking-widest font-bold uppercase">
            {{ metric.label }}
          </p>
          <Icon :name="metric.icon" class="text-sm text-[#ffb68d]" />
        </div>

        <p class="text-2xl font-bold mt-4">
          {{ metric.value }}
          <span class="text-xs text-slate-400 font-medium">{{ metric.unit }}</span>
        </p>

        <p class="text-xs text-slate-500 tracking-wider mt-1 uppercase">
          {{ metric.detail }}
        </p>
      </article>
    </template>
  </section>
</template>
