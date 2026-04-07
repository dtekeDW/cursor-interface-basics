<script setup lang="ts">
import { Icon } from '#components'
import type { HourlyForecastItem } from '~/types/weather'

const props = defineProps<{
  hourly: HourlyForecastItem[]
}>()
</script>

<template>
  <section>
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">Hourly Outlook</h3>
      <Icon name="ph:clock-countdown" class="text-xl text-slate-500" />
    </div>

    <div class="hide-scrollbar flex gap-3 overflow-x-auto pb-2 sm:gap-4">
      <article
        v-for="hour in props.hourly"
        :key="hour.id"
        class="w-24 shrink-0 rounded-[1.25rem] border p-4 text-center transition sm:w-28 sm:p-5"
        :class="hour.isNow
          ? 'border-[#ffb68d]/45 bg-[rgba(255,182,141,0.14)] shadow-[0_0_26px_rgba(255,182,141,0.16)]'
          : 'border-white/10 bg-white/4 hover:border-white/20'"
      >
        <p
          class="text-[11px] font-semibold tracking-[0.08em] uppercase"
          :class="hour.isNow ? 'text-[#ffb68d]' : 'text-slate-300'"
        >
          {{ hour.time }}
        </p>

        <Icon :name="hour.icon" class="my-3 text-5xl" :class="hour.isNow ? 'text-[#ffb68d]' : 'text-slate-100'" />

        <p class="text-3xl font-semibold leading-none">{{ hour.temperature }}°</p>
      </article>
    </div>
  </section>
</template>
