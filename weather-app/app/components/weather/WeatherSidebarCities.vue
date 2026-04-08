<script setup lang="ts">
import type {
  CityId,
  WeatherCity,
} from '~/types/weather'
import { Icon } from '#components'

interface WeatherSidebarCitiesProps {
  /** Sidebar city cards with compact snapshot values. */
  cities: WeatherCity[]
  /** Currently active city id used for visual selection state. */
  activeCityId: CityId
  /** Loading flag used to render skeleton placeholders. */
  isLoading?: boolean
}

interface WeatherSidebarCitiesEmits {
  /** Emits when a user selects a city card. */
  select: [cityId: CityId]
  /** Emits when a user opens the add city flow. */
  addCity: []
}

/** Props for desktop and mobile city sidebar navigation. */
const props = defineProps<WeatherSidebarCitiesProps>()

/** Events emitted by the city sidebar component. */
const emit = defineEmits<WeatherSidebarCitiesEmits>()

/**
 * Emits the selected city id to the page-level container.
 *
 * @param cityId Chosen city identifier.
 * @example
 * ```ts
 * handleSelect('koeln-germany-50.9375-6.9603')
 * ```
 */
function handleSelect(cityId: CityId) {
  emit('select', cityId)
}

/**
 * Opens the add-city modal flow in the parent container.
 *
 * @example
 * ```ts
 * handleAddCity()
 * ```
 */
function handleAddCity() {
  emit('addCity')
}
</script>

<template>
  <section class="space-y-4 lg:shrink-0 lg:w-80 lg:space-y-6">
    <div class="hide-scrollbar pb-2 flex gap-3 overflow-x-auto lg:hidden">
      <template v-if="props.isLoading">
        <div v-for="item in 3" :key="`mobile-skeleton-${item}`" class="p-4 border border-white/10 rounded-xl bg-white/5 min-w-[128px]">
          <div class="rounded bg-white/10 h-2.5 w-14 animate-pulse" />
          <div class="mt-2.5 rounded bg-white/10 h-7 w-10 animate-pulse" />
        </div>
      </template>

      <button
        v-for="city in props.cities"
        v-else
        :key="city.id"
        class="p-4 text-left border rounded-xl min-w-[128px] transition"
        :class="city.id === props.activeCityId
          ? 'border-[#ffb68d]/45 bg-[rgba(255,182,141,0.14)] text-white shadow-[0_0_22px_rgba(255,182,141,0.12)]'
          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'"
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
      <h3 class="text-[0.6875rem] text-slate-400 tracking-[0.15rem] font-bold mb-4 uppercase">
        My Cities
      </h3>

      <div class="pr-2 overflow-y-auto space-y-3">
        <template v-if="props.isLoading">
          <div v-for="item in 4" :key="`desktop-skeleton-${item}`" class="p-4 border border-white/10 rounded-xl bg-white/4 w-full">
            <div class="rounded bg-white/10 h-2.5 w-[5.5rem] animate-pulse" />
            <div class="mt-2.5 rounded bg-white/10 h-6 w-24 animate-pulse" />
            <div class="mt-2.5 rounded bg-white/10 h-2.5 w-[4.5rem] animate-pulse" />
          </div>
        </template>

        <button
          v-for="city in props.cities"
          v-else
          :key="city.id"
          class="p-4 text-left border rounded-xl w-full transition"
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
              <p class="text-lg text-slate-100 leading-tight font-bold">
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
        class="text-xs text-slate-400 tracking-[0.12em] font-semibold mt-auto px-4 py-3 border border-white/25 rounded-xl border-dashed uppercase transition hover:text-white hover:border-white/40"
        type="button"
        @click="handleAddCity"
      >
        + Add City
      </button>
    </aside>
  </section>
</template>
