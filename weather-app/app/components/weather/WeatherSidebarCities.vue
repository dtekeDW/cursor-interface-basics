<script setup lang="ts">
import type {
  CityId,
  WeatherCity,
} from '~/types/weather'
import { Icon } from '#components'

const props = defineProps<{
  cities: WeatherCity[]
  activeCityId: CityId
  isLoading?: boolean
}>()

const emit = defineEmits<{
  select: [cityId: CityId]
  addCity: []
}>()

function handleSelect(cityId: CityId) {
  emit('select', cityId)
}

function handleAddCity() {
  emit('addCity')
}
</script>

<template>
  <section class="space-y-4 lg:w-80 lg:shrink-0 lg:space-y-6">
    <div class="hide-scrollbar flex gap-3 overflow-x-auto pb-2 lg:hidden">
      <template v-if="props.isLoading">
        <div v-for="item in 3" :key="`mobile-skeleton-${item}`" class="min-w-[128px] rounded-xl border border-white/10 bg-white/5 p-4">
          <div class="h-3 w-16 rounded bg-white/12 animate-pulse" />
          <div class="mt-3 h-9 w-12 rounded bg-white/12 animate-pulse" />
        </div>
      </template>

      <button
        v-else
        v-for="city in props.cities"
        :key="city.id"
        class="min-w-[128px] rounded-xl border p-4 text-left transition"
        :class="city.id === props.activeCityId
          ? 'border-[#ffb68d]/45 bg-[rgba(255,182,141,0.14)] text-white shadow-[0_0_22px_rgba(255,182,141,0.12)]'
          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'"
        type="button"
        @click="handleSelect(city.id)"
      >
        <p class="text-[11px] font-medium tracking-[0.08em] uppercase">
          {{ city.name }}
        </p>
        <p class="mt-2 text-3xl font-bold leading-none">
          {{ city.temperature }}°
        </p>
      </button>
    </div>

    <aside class="hidden h-[calc(100vh-7.5rem)] flex-col border-r border-white/5 pr-6 lg:flex">
      <h3 class="mb-4 text-[0.6875rem] font-bold tracking-[0.15rem] text-slate-400 uppercase">
        My Cities
      </h3>

      <div class="space-y-3 overflow-y-auto pr-2">
        <template v-if="props.isLoading">
          <div v-for="item in 4" :key="`desktop-skeleton-${item}`" class="w-full rounded-xl border border-white/10 bg-white/4 p-4">
            <div class="h-3 w-24 rounded bg-white/12 animate-pulse" />
            <div class="mt-3 h-7 w-28 rounded bg-white/12 animate-pulse" />
            <div class="mt-3 h-3 w-20 rounded bg-white/12 animate-pulse" />
          </div>
        </template>

        <button
          v-else
          v-for="city in props.cities"
          :key="city.id"
          class="w-full rounded-xl border p-4 text-left transition"
          :class="city.id === props.activeCityId
            ? 'border-[#ffb68d]/45 bg-[rgba(255,182,141,0.10)] shadow-[0_0_22px_rgba(255,182,141,0.10)]'
            : 'border-white/10 bg-white/3 hover:border-white/20'"
          type="button"
          @click="handleSelect(city.id)"
        >
          <div class="mb-1 flex items-start justify-between">
            <div>
              <p class="text-xs text-slate-400">
                Local Time: {{ city.localTime }}
              </p>
              <p class="text-lg font-bold leading-tight text-slate-100">
                {{ city.name }}
              </p>
            </div>
            <p class="text-2xl font-light" :class="city.id === props.activeCityId ? 'text-[#ffb68d]' : 'text-slate-300'">
              {{ city.temperature }}°
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-xs text-slate-400">
              {{ city.condition }}
            </p>
            <Icon :name="city.icon" class="text-sm" :class="city.id === props.activeCityId ? 'text-[#ffb68d]' : 'text-slate-300'" />
          </div>
        </button>
      </div>

      <button
        class="mt-auto rounded-xl border border-dashed border-white/25 px-4 py-3 text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase transition hover:border-white/40 hover:text-white"
        type="button"
        @click="handleAddCity"
      >
        + Add City
      </button>
    </aside>
  </section>
</template>
