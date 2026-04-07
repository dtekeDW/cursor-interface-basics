<script setup lang="ts">
import type { WeatherMetric } from '~/types/weather'
import { Icon } from '#components'

const props = defineProps<{
  metrics: WeatherMetric[]
  isLoading?: boolean
}>()
</script>

<template>
  <section class="grid grid-cols-2 gap-6 md:grid-cols-4">
    <template v-if="props.isLoading">
      <article
        v-for="item in 4"
        :key="`metric-skeleton-${item}`"
        class="rounded-[1.5rem] border border-white/5 bg-white/4 p-6"
      >
        <div class="h-3 w-14 rounded bg-white/12 animate-pulse" />
        <div class="mt-6 h-8 w-16 rounded bg-white/12 animate-pulse" />
        <div class="mt-2 h-3 w-20 rounded bg-white/12 animate-pulse" />
      </article>
    </template>

    <template v-else>
      <article
        v-for="metric in props.metrics"
        :key="metric.id"
        class="rounded-[1.5rem] border border-white/5 bg-white/4 p-6"
      >
        <div class="flex items-center justify-between text-slate-400">
          <p class="text-[0.6875rem] font-bold tracking-widest uppercase">
            {{ metric.label }}
          </p>
          <Icon :name="metric.icon" class="text-sm text-[#ffb68d]" />
        </div>

        <p class="mt-4 text-2xl font-bold">
          {{ metric.value }}
          <span class="text-xs font-medium text-slate-400">{{ metric.unit }}</span>
        </p>

        <p class="mt-1 text-xs tracking-wider text-slate-500 uppercase">
          {{ metric.detail }}
        </p>
      </article>
    </template>
  </section>
</template>
