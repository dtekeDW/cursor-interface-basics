<script setup lang="ts">
import type {
  CityId,
  WeatherCity,
} from '~/types/weather'

const props = defineProps<{
  cities: WeatherCity[]
  activeCityId: CityId
}>()

const emit = defineEmits<{
  select: [cityId: CityId]
}>()

function handleSelect(cityId: CityId) {
  emit('select', cityId)
}
</script>

<template>
  <section class="space-y-4 lg:shrink-0 lg:w-80 lg:space-y-6">
    <div class="hide-scrollbar pb-2 flex gap-3 overflow-x-auto lg:hidden">
      <button
        v-for="city in props.cities"
        :key="city.id"
        class="p-4 text-left border rounded-xl min-w-[128px] transition"
        :class="city.id === props.activeCityId ? 'border-primary/35 bg-primary/10 text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'"
        type="button"
        @click="handleSelect(city.id)"
      >
        <p class="text-[11px] tracking-[0.08em] font-medium uppercase">
          {{ city.name }}
        </p>
        <p class="text-3xl leading-none font-bold mt-2">
          {{ city.temperature }}°
        </p>
      </button>
    </div>

    <aside class="pr-6 border-r border-white/5 flex-col h-[calc(100vh-7.5rem)] hidden lg:flex">
      <h3 class="text-[11px] text-slate-500 tracking-[0.16em] font-bold mb-4 uppercase">
        My Cities
      </h3>

      <div class="pr-2 overflow-y-auto space-y-3">
        <button
          v-for="city in props.cities.filter(item => item.id !== 'san-francisco')"
          :key="city.id"
          class="p-4 text-left border rounded-xl w-full transition"
          :class="city.id === props.activeCityId ? 'border-primary/40 bg-primary/10' : 'border-white/10 bg-white/3 hover:border-white/20'"
          type="button"
          @click="handleSelect(city.id)"
        >
          <div class="mb-1 flex items-start justify-between">
            <div>
              <p class="text-xs text-slate-400">
                Local Time: {{ city.localTime }}
              </p>
              <p class="text-2xl text-slate-100 leading-tight font-semibold">
                {{ city.name }}
              </p>
            </div>
            <p class="text-primary text-4xl font-light">
              {{ city.temperature }}°
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-sm text-slate-400">
              {{ city.condition }}
            </p>
            <span class="material-symbols-outlined text-sm text-slate-300">{{ city.icon }}</span>
          </div>
        </button>
      </div>

      <button
        class="text-xs text-slate-400 tracking-[0.12em] font-semibold mt-auto px-4 py-3 border border-white/25 rounded-xl border-dashed uppercase transition hover:text-white hover:border-white/40"
        type="button"
      >
        + Add City
      </button>
    </aside>
  </section>
</template>
