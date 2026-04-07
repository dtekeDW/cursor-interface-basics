<script setup lang="ts">
import type { HourlyForecastItem } from '~/types/weather'
import { Icon } from '#components'

const props = defineProps<{
  hourly: HourlyForecastItem[]
  isLoading?: boolean
}>()
</script>

<template>
  <section class="w-full min-w-0 overflow-x-hidden">
    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-[0.6875rem] font-bold tracking-[0.15rem] text-slate-400 uppercase">
        Hourly Outlook
      </h3>
      <Icon name="ph:clock-countdown" class="text-base text-slate-400" />
    </div>

    <div class="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(100deg,rgba(20,22,44,0.74),rgba(8,10,28,0.92))] px-4 py-4">
      <div class="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0b0c1a] to-transparent" />
      <div class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-10 bg-gradient-to-l from-[#0b0c1a] to-transparent" />

      <div class="hide-scrollbar w-full overflow-x-auto overscroll-x-contain pb-2">
        <div class="flex w-max gap-4 pr-2">
          <template v-if="props.isLoading">
            <article
              v-for="item in 12"
              :key="`hourly-skeleton-${item}`"
              class="w-28 shrink-0 rounded-3xl border border-white/10 bg-[linear-gradient(120deg,rgba(24,26,46,0.8),rgba(15,17,37,0.95))] p-6 text-center"
            >
              <div class="mx-auto h-3 w-10 rounded bg-white/10 animate-pulse" />
              <div class="mx-auto my-4 h-8 w-8 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.16)_40%,rgba(255,255,255,0.06)_60%)] bg-[length:220%_100%] animate-[weather-shimmer_2.2s_linear_infinite]" />
              <div class="mx-auto h-7 w-12 rounded bg-white/10 animate-pulse" />
            </article>
          </template>

          <article
            v-else
            v-for="hour in props.hourly"
            :key="hour.id"
            class="w-28 shrink-0 rounded-3xl border p-6 text-center transition"
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

            <Icon :name="hour.icon" class="my-3 text-3xl" :class="hour.isNow ? 'text-[#ffb68d]' : 'text-slate-100'" />

            <p class="text-xl font-bold">
              {{ hour.temperature }}°
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
