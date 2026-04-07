<script setup lang="ts">
import type { WeeklyForecastItem } from '~/types/weather'
import { computed } from 'vue'

const props = defineProps<{
  weekly: WeeklyForecastItem[]
}>()

const maxTemperature = computed(() => Math.max(...props.weekly.map(item => item.high)))
const minTemperature = computed(() => Math.min(...props.weekly.map(item => item.low)))

function getBarWidth(high: number, low: number) {
  const range = Math.max(maxTemperature.value - minTemperature.value, 1)
  return `${Math.max(((high - low) / range) * 100, 25)}%`
}
</script>

<template>
  <section>
    <h3 class="text-[11px] text-slate-500 tracking-[0.16em] font-bold mb-4 uppercase">
      7-Day Forecast
    </h3>

    <div class="p-4 border border-white/10 rounded-[1.5rem] bg-white/4 hidden md:block">
      <article
        v-for="day in props.weekly"
        :key="day.id"
        class="px-3 py-3 rounded-xl flex gap-3 transition items-center justify-between hover:bg-white/6"
      >
        <span class="text-sm text-slate-300 font-medium w-10">{{ day.day }}</span>
        <span class="material-symbols-outlined text-primary">{{ day.icon }}</span>

        <div class="flex flex-1 gap-3 items-center">
          <span class="text-xs text-slate-500 font-semibold">{{ day.low }}°</span>
          <div class="bg-surface-variant/80 rounded-full flex-1 h-1.5">
            <div class="from-primary/75 to-primary rounded-full h-full bg-gradient-to-r" :style="{ width: getBarWidth(day.high, day.low) }" />
          </div>
          <span class="text-base text-white font-bold">{{ day.high }}°</span>
        </div>
      </article>
    </div>

    <div class="space-y-3 md:hidden">
      <article
        v-for="day in props.weekly"
        :key="`mobile-${day.id}`"
        class="px-4 py-3 border border-white/10 rounded-xl bg-white/4 flex items-center justify-between"
      >
        <span class="text-xl text-slate-100 leading-none w-14">{{ day.day }}</span>
        <span class="material-symbols-outlined text-primary">{{ day.icon }}</span>
        <div class="flex gap-3 items-baseline">
          <span class="text-2xl text-white leading-none font-semibold">{{ day.high }}°</span>
          <span class="text-2xl text-slate-500 leading-none">{{ day.low }}°</span>
        </div>
      </article>
    </div>
  </section>
</template>
