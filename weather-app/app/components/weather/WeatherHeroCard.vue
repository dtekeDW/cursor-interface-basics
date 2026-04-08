<script setup lang="ts">
import type { CurrentWeather } from '~/types/weather'
import { Icon } from '#components'

interface WeatherHeroCardProps {
  /** Current weather values rendered in the hero section. */
  current: CurrentWeather
  /** Loading flag used to render skeleton placeholders. */
  isLoading?: boolean
}

/** Props for the primary weather hero card. */
defineProps<WeatherHeroCardProps>()
</script>

<template>
  <section class="group p-8 border border-white/10 rounded-[2.5rem] min-h-[500px] relative overflow-hidden lg:p-16">
    <img
      :src="current.heroImageUrl"
      :alt="current.heroImageAlt"
      class="h-full w-full transition-transform duration-700 inset-0 absolute object-cover group-hover:scale-105"
    >

    <div class="inset-0 absolute from-[#0d0d18] to-transparent via-transparent bg-gradient-to-t" />
    <div class="inset-0 absolute from-[#0d0d18]/40 to-transparent bg-gradient-to-r" />

    <div class="mt-auto flex flex-col h-full justify-end relative z-10">
      <template v-if="isLoading">
        <div class="mb-2 flex gap-6 items-end">
          <div class="rounded-2xl bg-white/10 h-32 w-56 animate-pulse lg:h-40 lg:w-72" />
          <div class="mb-6 space-y-3">
            <div class="rounded-xl bg-white/10 h-10 w-44 animate-pulse" />
            <div class="rounded-xl bg-white/10 h-5 w-32 animate-pulse" />
          </div>
        </div>

        <div class="flex gap-3">
          <div class="rounded-full bg-white/10 h-9 w-20 animate-pulse" />
          <div class="rounded-full bg-white/10 h-9 w-20 animate-pulse" />
        </div>
      </template>

      <template v-else>
        <div class="mb-2 flex gap-6 items-end">
          <h1 class="text-[8rem] text-white leading-none tracking-tighter font-extrabold drop-shadow-[0_0_20px_rgba(255,182,141,0.3)] lg:text-[10rem]">
            {{ current.temperature }}°
          </h1>

          <div class="mb-6">
            <h2 class="text-4xl text-white font-bold mb-2 lg:text-5xl">
              {{ current.locationLabel }}
            </h2>
            <p class="text-primary text-lg font-medium flex gap-2 items-center">
              {{ current.condition }}
              <Icon :name="current.icon" class="text-xl" />
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <span class="text-xs tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full bg-[#1b1a26]/40 uppercase">
            H: {{ current.high }}°
          </span>
          <span class="text-xs tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full bg-[#1b1a26]/40 uppercase">
            L: {{ current.low }}°
          </span>
        </div>
      </template>
    </div>
  </section>
</template>
