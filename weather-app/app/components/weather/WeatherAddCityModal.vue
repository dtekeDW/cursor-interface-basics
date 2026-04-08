<script setup lang="ts">
import type {
  GeocodeApiResponse,
  GeocodeResult,
} from '~/types/weather'
import { Icon } from '#components'
import { computed, ref, watch } from 'vue'

interface WeatherAddCityModalProps {
  /** Controls modal visibility from the parent via v-model. */
  modelValue: boolean
}

interface WeatherAddCityModalEmits {
  /** Sync event for v-model modal state. */
  'update:modelValue': [value: boolean]
  /** Selected city candidate to add into persistent city list. */
  'select': [city: GeocodeResult]
}

/** Props for the add-city modal component. */
const props = defineProps<WeatherAddCityModalProps>()

/** Emits for modal state and selected city handoff. */
const emit = defineEmits<WeatherAddCityModalEmits>()

const searchValue = ref('')
const isSearching = ref(false)
const results = ref<GeocodeResult[]>([])
const selectedIndex = ref(0)
const errorMessage = ref('')
const debounceTimer = ref<number | null>(null)

/** Computed empty-state flag used when search finished but returned no city candidates. */
const hasNoResults = computed(() => !isSearching.value && searchValue.value.trim().length >= 2 && !results.value.length && !errorMessage.value)

/**
 * Closes the modal by syncing `v-model` state back to the parent.
 *
 * @example
 * ```ts
 * closeModal()
 * ```
 */
function closeModal() {
  emit('update:modelValue', false)
}

/**
 * Emits a city selection and closes the modal in one user action.
 *
 * @param city Selected geocoding result.
 */
function handleSelect(city: GeocodeResult) {
  emit('select', city)
  emit('update:modelValue', false)
}

/**
 * Queries the geocoding endpoint and updates result list state.
 *
 * @param query User-entered city query text.
 */
async function searchCities(query: string) {
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

/**
 * Handles text input with debounce to reduce request pressure during typing.
 *
 * @param value Raw input value from the search field.
 */
function handleInput(value: string) {
  searchValue.value = value

  if (debounceTimer.value)
    window.clearTimeout(debounceTimer.value)

  debounceTimer.value = window.setTimeout(() => {
    void searchCities(searchValue.value.trim())
  }, 300)
}

/**
 * Supports keyboard list navigation and submit behavior for accessibility.
 *
 * @param event Keyboard event from the search input.
 */
function handleKeydown(event: KeyboardEvent) {
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

/** Resets transient modal state every time the modal closes. */
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
      class="p-4 bg-[#07070f]/70 flex items-center inset-0 justify-center fixed z-[70] backdrop-blur-sm"
      @click.self="closeModal"
    >
      <section class="p-6 border border-white/10 rounded-3xl bg-[#111120]/95 max-w-xl w-full shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-sm text-slate-200 tracking-[0.12em] font-semibold uppercase">
            Add City
          </h3>

          <button
            type="button"
            class="text-slate-300 border border-white/15 rounded-full grid h-8 w-8 transition place-items-center hover:text-white hover:border-white/30"
            aria-label="Close add city modal"
            @click="closeModal"
          >
            <Icon name="ph:x" class="text-base" />
          </button>
        </div>

        <label class="text-xs text-slate-400 tracking-[0.08em] font-medium mb-3 block uppercase" for="city-search-input">
          Search City
        </label>

        <div class="relative">
          <input
            id="city-search-input"
            :value="searchValue"
            type="text"
            placeholder="Type city name, e.g. Hamburg"
            class="text-sm text-slate-100 px-4 py-3 outline-none border border-white/15 rounded-xl bg-white/5 w-full transition placeholder:text-slate-500 focus:border-[#ffb68d]/60"
            @input="handleInput(($event.target as HTMLInputElement).value)"
            @keydown="handleKeydown"
          >

          <Icon
            v-if="isSearching"
            name="ph:spinner"
            class="text-slate-400 right-3 top-1/2 absolute animate-spin -translate-y-1/2"
          />
        </div>

        <p v-if="errorMessage" class="text-sm text-rose-300 mt-3">
          {{ errorMessage }}
        </p>

        <p v-else-if="hasNoResults" class="text-sm text-slate-400 mt-3">
          No matching cities found.
        </p>

        <ul v-else class="mt-4 pr-1 max-h-72 overflow-y-auto space-y-2">
          <li v-for="(city, index) in results" :key="city.id">
            <button
              type="button"
              class="px-4 py-3 text-left border rounded-xl w-full transition"
              :class="index === selectedIndex
                ? 'border-[#ffb68d]/55 bg-[rgba(255,182,141,0.14)] text-white'
                : 'border-white/10 bg-white/4 text-slate-200 hover:border-white/20'"
              @click="handleSelect(city)"
            >
              <p class="text-sm font-semibold">
                {{ city.name }}
              </p>
              <p class="text-xs text-slate-400 mt-1">
                {{ city.country }} • {{ city.timezone }}
              </p>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </Teleport>
</template>
