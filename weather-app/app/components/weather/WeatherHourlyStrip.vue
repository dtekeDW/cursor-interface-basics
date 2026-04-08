<script setup lang="ts">
import type { HourlyForecastItem } from '~/types/weather'
import { Icon } from '#components'

interface WeatherHourlyStripProps {
  /** Ordered hourly forecast entries for the timeline strip. */
  hourly: HourlyForecastItem[]
  /** Loading flag used to render skeleton placeholders. */
  isLoading?: boolean
}

/** Props for the horizontal hourly forecast strip. */
const props = defineProps<WeatherHourlyStripProps>()
</script>

<template>
  <section class="min-w-0 w-full overflow-x-hidden">
    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-[0.6875rem] text-slate-400 tracking-[0.15rem] font-bold uppercase">
        Hourly Outlook
      </h3>
      <Icon name="ph:clock-countdown" class="text-base text-slate-400" />
    </div>

    <div class="px-4 py-4 border border-white/8 rounded-[2rem] bg-[linear-gradient(100deg,rgba(20,22,44,0.74),rgba(8,10,28,0.92))] relative overflow-hidden">
      <div class="w-10 pointer-events-none bottom-0 left-0 top-0 absolute z-10 from-[#0b0c1a] to-transparent bg-gradient-to-r" />
      <div class="w-10 pointer-events-none bottom-0 right-0 top-0 absolute z-10 from-[#0b0c1a] to-transparent bg-gradient-to-l" />

      <div class="hide-scrollbar pb-2 overscroll-x-contain w-full overflow-x-auto">
        <div class="pr-2 flex gap-4 w-max">
          <template v-if="props.isLoading">
            <article
              v-for="item in 12"
              :key="`hourly-skeleton-${item}`"
              class="p-6 text-center border border-white/10 rounded-3xl bg-[linear-gradient(120deg,rgba(24,26,46,0.8),rgba(15,17,37,0.95))] shrink-0 w-28"
            >
              <div class="mx-auto rounded bg-white/10 h-3 w-10 animate-pulse" />
              <div class="mx-auto my-4 rounded-full bg-[length:220%_100%] bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.16)_40%,rgba(255,255,255,0.06)_60%)] h-8 w-8 animate-[weather-shimmer_2.2s_linear_infinite]" />
              <div class="mx-auto rounded bg-white/10 h-7 w-12 animate-pulse" />
            </article>
          </template>

          <article
            v-for="hour in props.hourly"
            v-else
            :key="hour.id"
            class="p-6 text-center border rounded-3xl shrink-0 w-28 transition"
            :class="hour.isNow
              ? 'border-[#ffb68d]/45 bg-[rgba(255,182,141,0.14)] shadow-[0_0_26px_rgba(255,182,141,0.16)]'
              : 'border-white/10 bg-white/4 hover:border-white/20'"
          >
            <p
              class="text-[11px] tracking-[0.08em] font-semibold uppercase"
              :class="hour.isNow ? 'text-[#ffb68d]' : 'text-slate-300'"
            >
              {{ hour.time }}
            </p>

            <Icon :name="hour.icon" class="text-3xl my-3" :class="hour.isNow ? 'text-[#ffb68d]' : 'text-slate-100'" />

            <p class="text-xl font-bold">
              {{ hour.temperature }}°
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
