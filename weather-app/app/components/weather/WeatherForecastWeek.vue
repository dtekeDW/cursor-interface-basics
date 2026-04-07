<script setup lang="ts">
import type { WeeklyForecastItem } from '~/types/weather'
import { Icon } from '#components'
import { computed } from 'vue'

const props = defineProps<{
  weekly: WeeklyForecastItem[]
  isLoading?: boolean
}>()

const maxTemperature = computed(() => Math.max(...props.weekly.map(item => item.high)))
const minTemperature = computed(() => Math.min(...props.weekly.map(item => item.low)))
const totalRange = computed(() => Math.max(maxTemperature.value - minTemperature.value, 1))

function getBarWidth(high: number, low: number) {
  return `${Math.max(((high - low) / totalRange.value) * 100, 18)}%`
}

function getBarOffset(low: number) {
  return `${((low - minTemperature.value) / totalRange.value) * 100}%`
}
</script>

<template>
  <section>
    <h3 class="mb-4 text-[0.6875rem] font-bold tracking-[0.15rem] text-slate-400 uppercase">
      7-Day Forecast
    </h3>

    <div v-if="props.isLoading" class="hidden rounded-[2rem] border border-white/5 bg-white/4 p-6 md:flex md:flex-col md:gap-2">
      <div v-for="item in 7" :key="`desktop-weekly-skeleton-${item}`" class="flex items-center gap-4 rounded-2xl p-4">
        <div class="h-4 w-10 rounded bg-white/12 animate-pulse" />
        <div class="h-6 w-6 rounded-full bg-white/12 animate-pulse" />
        <div class="h-1.5 flex-1 rounded-full bg-white/10" />
        <div class="h-4 w-8 rounded bg-white/12 animate-pulse" />
      </div>
    </div>

    <div v-else class="hidden rounded-[2rem] border border-white/5 bg-white/4 p-6 md:flex md:flex-col md:gap-2">
      <article
        v-for="day in props.weekly"
        :key="day.id"
        class="group flex items-center justify-between rounded-2xl p-4 transition-colors hover:bg-white/5"
      >
        <span class="w-12 text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-200">{{ day.day }}</span>
        <Icon :name="day.icon" class="text-xl text-slate-100 transition-colors group-hover:text-[#ffb68d]" />

        <div class="flex flex-1 items-center gap-3">
          <span class="text-xs font-semibold text-slate-500">{{ day.low }}°</span>
          <div class="h-1.5 flex-1 rounded-full bg-surface-variant/80">
            <div
              class="h-full rounded-full bg-gradient-to-r from-[#ffb68d]/75 to-[#ffa34f] transition-all group-hover:from-[#ffb68d] group-hover:to-[#ff8e2b]"
              :style="{ width: getBarWidth(day.high, day.low), marginLeft: getBarOffset(day.low) }"
            />
          </div>
          <span class="text-sm font-bold text-white transition-colors group-hover:text-[#ffb68d]">{{ day.high }}°</span>
        </div>
      </article>
    </div>

    <div v-if="props.isLoading" class="space-y-3 md:hidden">
      <div v-for="item in 5" :key="`mobile-weekly-skeleton-${item}`" class="rounded-xl border border-white/10 bg-white/4 px-4 py-3">
        <div class="h-4 w-24 rounded bg-white/12 animate-pulse" />
      </div>
    </div>

    <div v-else class="space-y-3 md:hidden">
      <article
        v-for="day in props.weekly"
        :key="`mobile-${day.id}`"
        class="px-4 py-3 border border-white/10 rounded-xl bg-white/4 flex items-center justify-between"
      >
        <span class="text-base text-slate-100 leading-none w-14">{{ day.day }}</span>
        <Icon :name="day.icon" class="text-primary text-2xl" />
        <div class="flex gap-3 items-baseline">
          <span class="text-2xl text-white leading-none font-semibold">{{ day.high }}°</span>
          <span class="text-2xl text-slate-500 leading-none">{{ day.low }}°</span>
        </div>
      </article>
    </div>
  </section>
</template>
