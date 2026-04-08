<script setup lang="ts">
import type { WeeklyForecastItem } from '~/types/weather'
import { Icon } from '#components'
import { computed } from 'vue'

interface WeatherForecastWeekProps {
  /** Seven-day forecast entries used by desktop and mobile weekly cards. */
  weekly: WeeklyForecastItem[]
  /** Loading flag used to render skeleton placeholders. */
  isLoading?: boolean
}

/** Props for the weekly forecast widget. */
const props = defineProps<WeatherForecastWeekProps>()

/** Highest weekly temperature used for relative bar scaling. */
const maxTemperature = computed(() => Math.max(...props.weekly.map(item => item.high)))
/** Lowest weekly temperature used for relative bar scaling. */
const minTemperature = computed(() => Math.min(...props.weekly.map(item => item.low)))
/** Safe temperature span preventing divide-by-zero for equal ranges. */
const totalRange = computed(() => Math.max(maxTemperature.value - minTemperature.value, 1))

/**
 * Calculates horizontal range bar width for one day.
 *
 * @param high Daily high temperature.
 * @param low Daily low temperature.
 * @returns CSS width percentage string.
 */
function getBarWidth(high: number, low: number) {
  return `${Math.max(((high - low) / totalRange.value) * 100, 18)}%`
}

/**
 * Calculates left offset so daily ranges are aligned within the common min/max band.
 *
 * @param low Daily low temperature.
 * @returns CSS margin-left percentage string.
 */
function getBarOffset(low: number) {
  return `${((low - minTemperature.value) / totalRange.value) * 100}%`
}
</script>

<template>
  <section>
    <h3 class="text-[0.6875rem] text-slate-400 tracking-[0.15rem] font-bold mb-4 uppercase">
      7-Day Forecast
    </h3>

    <div v-if="props.isLoading" class="p-6 border border-white/5 rounded-[2rem] bg-white/4 hidden md:flex md:flex-col md:gap-2">
      <div v-for="item in 7" :key="`desktop-weekly-skeleton-${item}`" class="p-4 rounded-2xl flex gap-4 items-center">
        <div class="rounded bg-white/12 h-4 w-10 animate-pulse" />
        <div class="rounded-full bg-white/12 h-6 w-6 animate-pulse" />
        <div class="rounded-full bg-white/10 flex-1 h-1.5" />
        <div class="rounded bg-white/12 h-4 w-8 animate-pulse" />
      </div>
    </div>

    <div v-else class="p-6 border border-white/5 rounded-[2rem] bg-white/4 hidden md:flex md:flex-col md:gap-2">
      <article
        v-for="day in props.weekly"
        :key="day.id"
        class="group p-4 rounded-2xl flex transition-colors items-center justify-between hover:bg-white/5"
      >
        <span class="text-sm text-slate-400 font-medium w-12 transition-colors group-hover:text-slate-200">{{ day.day }}</span>
        <Icon :name="day.icon" class="text-xl text-slate-100 transition-colors group-hover:text-[#ffb68d]" />

        <div class="flex flex-1 gap-3 items-center">
          <span class="text-xs text-slate-500 font-semibold">{{ day.low }}°</span>
          <div class="bg-surface-variant/80 rounded-full flex-1 h-1.5">
            <div
              class="rounded-full h-full transition-all from-[#ffb68d]/75 to-[#ffa34f] bg-gradient-to-r group-hover:from-[#ffb68d] group-hover:to-[#ff8e2b]"
              :style="{ width: getBarWidth(day.high, day.low), marginLeft: getBarOffset(day.low) }"
            />
          </div>
          <span class="text-sm text-white font-bold transition-colors group-hover:text-[#ffb68d]">{{ day.high }}°</span>
        </div>
      </article>
    </div>

    <div v-if="props.isLoading" class="space-y-3 md:hidden">
      <div v-for="item in 5" :key="`mobile-weekly-skeleton-${item}`" class="px-4 py-3 border border-white/10 rounded-xl bg-white/4">
        <div class="rounded bg-white/12 h-4 w-24 animate-pulse" />
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
