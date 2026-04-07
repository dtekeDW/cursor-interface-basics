<script setup lang="ts">
import { Icon } from '#components'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'ph:squares-four', active: true },
  { id: 'forecast', label: 'Forecast', icon: 'ph:calendar-dots', active: false },
  { id: 'radar', label: 'Radar', icon: 'ph:map-trifold', active: false },
  { id: 'settings', label: 'Settings', icon: 'ph:gear-six', active: false },
]
</script>

<template>
  <nav class="fixed inset-x-0 bottom-6 z-50 px-6 md:hidden">
    <div class="mx-auto max-w-lg rounded-[2rem] border border-white/10 bg-[#1b1a26]/60 p-3 backdrop-blur-3xl">
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="flex flex-col items-center rounded-full px-3 py-2 text-[11px] tracking-[0.08em] uppercase transition"
          :class="item.active ? 'bg-primary/15 text-primary shadow-[0_0_20px_rgba(255,182,141,0.2)]' : 'text-slate-400 hover:text-white'"
          type="button"
        >
          <Icon :name="item.icon" class="text-2xl" />
          <span class="mt-1">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>
