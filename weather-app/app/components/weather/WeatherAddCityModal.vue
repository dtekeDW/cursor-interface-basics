<script setup lang="ts">
import type {
  GeocodeApiResponse,
  GeocodeResult,
} from '~/types/weather'
import { Icon } from '#components'
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  select: [city: GeocodeResult]
}>()

const searchValue = ref('')
const isSearching = ref(false)
const results = ref<GeocodeResult[]>([])
const selectedIndex = ref(0)
const errorMessage = ref('')
const debounceTimer = ref<number | null>(null)

const hasNoResults = computed(() => !isSearching.value && searchValue.value.trim().length >= 2 && !results.value.length && !errorMessage.value)

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleSelect = (city: GeocodeResult) => {
  emit('select', city)
  emit('update:modelValue', false)
}

const searchCities = async (query: string) => {
  if (query.length < 2) {
    results.value = []
    errorMessage.value = ''
    return
  }

  isSearching.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch<GeocodeApiResponse>('/api/weather/geocode', {
      query: {
        q: query,
        limit: 8,
      },
    })

    results.value = response.results
    selectedIndex.value = 0
  }
  catch {
    results.value = []
    errorMessage.value = 'City search failed. Please try again.'
  }
  finally {
    isSearching.value = false
  }
}

const handleInput = (value: string) => {
  searchValue.value = value

  if (debounceTimer.value)
    window.clearTimeout(debounceTimer.value)

  debounceTimer.value = window.setTimeout(() => {
    void searchCities(searchValue.value.trim())
  }, 300)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!results.value.length)
    return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % results.value.length
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value - 1 + results.value.length) % results.value.length
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    const selected = results.value[selectedIndex.value]
    if (selected)
      handleSelect(selected)
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (!isOpen) {
    searchValue.value = ''
    results.value = []
    errorMessage.value = ''
    selectedIndex.value = 0
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.modelValue"
      class="fixed inset-0 z-[70] flex items-center justify-center bg-[#07070f]/70 p-4 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <section class="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111120]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-sm font-semibold tracking-[0.12em] text-slate-200 uppercase">
            Add City
          </h3>

          <button
            type="button"
            class="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-white/30 hover:text-white"
            aria-label="Close add city modal"
            @click="closeModal"
          >
            <Icon name="ph:x" class="text-base" />
          </button>
        </div>

        <label class="mb-3 block text-xs font-medium tracking-[0.08em] text-slate-400 uppercase" for="city-search-input">
          Search City
        </label>

        <div class="relative">
          <input
            id="city-search-input"
            :value="searchValue"
            type="text"
            placeholder="Type city name, e.g. Hamburg"
            class="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-[#ffb68d]/60"
            @input="handleInput(($event.target as HTMLInputElement).value)"
            @keydown="handleKeydown"
          >

          <Icon
            v-if="isSearching"
            name="ph:spinner"
            class="absolute top-1/2 right-3 -translate-y-1/2 animate-spin text-slate-400"
          />
        </div>

        <p v-if="errorMessage" class="mt-3 text-sm text-rose-300">
          {{ errorMessage }}
        </p>

        <p v-else-if="hasNoResults" class="mt-3 text-sm text-slate-400">
          No matching cities found.
        </p>

        <ul v-else class="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
          <li v-for="(city, index) in results" :key="city.id">
            <button
              type="button"
              class="w-full rounded-xl border px-4 py-3 text-left transition"
              :class="index === selectedIndex
                ? 'border-[#ffb68d]/55 bg-[rgba(255,182,141,0.14)] text-white'
                : 'border-white/10 bg-white/4 text-slate-200 hover:border-white/20'"
              @click="handleSelect(city)"
            >
              <p class="text-sm font-semibold">
                {{ city.name }}
              </p>
              <p class="mt-1 text-xs text-slate-400">
                {{ city.country }} • {{ city.timezone }}
              </p>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </Teleport>
</template>
