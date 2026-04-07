<script setup lang="ts">
import type { HourlyForecastItem } from '~/types/weather'
import { Icon } from '#components'

const props = defineProps<{
  hourly: HourlyForecastItem[]
}>()
</script>

<template>
  <section>
    <div class="mb-6 flex items-center justify-between">
      <h3 class="text-[0.6875rem] font-bold tracking-[0.15rem] text-slate-400 uppercase">
        Hourly Outlook
      </h3>
      <Icon name="ph:clock-countdown" class="text-base text-slate-400" />
    </div>

    <div class="hide-scrollbar -mx-2 flex gap-4 overflow-x-auto px-2 pb-4">
      <article
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
  </section>
</template>
