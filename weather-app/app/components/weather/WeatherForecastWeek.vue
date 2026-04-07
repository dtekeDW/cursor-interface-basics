<script setup lang="ts">
import { Icon } from '#components'
import type { WeeklyForecastItem } from '~/types/weather'
import { computed } from 'vue'

const props = defineProps<{
  weekly: WeeklyForecastItem[]
}>()

const maxTemperature = computed(() => Math.max(...props.weekly.map(item => item.high)))
const minTemperature = computed(() => Math.min(...props.weekly.map(item => item.low)))
const totalRange = computed(() => Math.max(maxTemperature.value - minTemperature.value, 1))

const getBarWidth = (high: number, low: number) => {
  return `${Math.max(((high - low) / totalRange.value) * 100, 18)}%`
}

const getBarOffset = (low: number) => {
  return `${((low - minTemperature.value) / totalRange.value) * 100}%`
}
</script>

<template>
  <section>
    <h3 class="mb-4 text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">7-Day Forecast</h3>

    <div class="hidden rounded-[1.5rem] border border-white/10 bg-white/4 p-4 md:block">
      <article
        v-for="day in props.weekly"
        :key="day.id"
        class="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all hover:bg-white/10"
      >
        <span class="w-10 text-4.5 font-medium text-slate-300 transition-colors group-hover:text-slate-100">{{ day.day }}</span>
        <Icon :name="day.icon" class="text-2xl text-slate-200 transition-colors group-hover:text-primary" />

        <div class="flex flex-1 items-center gap-3">
          <span class="text-xs font-semibold text-slate-500">{{ day.low }}°</span>
          <div class="h-1.5 flex-1 rounded-full bg-surface-variant/80">
            <div
              class="h-full rounded-full bg-gradient-to-r from-[#ffb68d]/75 to-[#ffa34f] transition-all group-hover:from-[#ffb68d] group-hover:to-[#ff8e2b]"
              :style="{ width: getBarWidth(day.high, day.low), marginLeft: getBarOffset(day.low) }"
            />
          </div>
          <span class="text-base font-bold text-white transition-colors group-hover:text-primary">{{ day.high }}°</span>
        </div>
      </article>
    </div>

    <div class="space-y-3 md:hidden">
      <article
        v-for="day in props.weekly"
        :key="`mobile-${day.id}`"
        class="flex items-center justify-between rounded-xl border border-white/10 bg-white/4 px-4 py-3"
      >
        <span class="w-14 text-xl text-slate-100 leading-none">{{ day.day }}</span>
        <Icon :name="day.icon" class="text-3xl text-primary" />
        <div class="flex items-baseline gap-3">
          <span class="text-2xl font-semibold text-white leading-none">{{ day.high }}°</span>
          <span class="text-2xl text-slate-500 leading-none">{{ day.low }}°</span>
        </div>
      </article>
    </div>
  </section>
</template>
