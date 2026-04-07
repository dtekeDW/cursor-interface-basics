<script setup lang="ts">
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', active: true },
  { id: 'forecast', label: 'Forecast', icon: 'calendar_month', active: false },
  { id: 'radar', label: 'Radar', icon: 'map', active: false },
  { id: 'settings', label: 'Settings', icon: 'settings', active: false },
]
</script>

<template>
  <nav class="px-6 inset-x-0 bottom-6 fixed z-50 md:hidden">
    <div class="mx-auto p-3 border border-white/10 rounded-[2rem] bg-[#1b1a26]/60 max-w-lg backdrop-blur-3xl">
      <div class="gap-2 grid grid-cols-4">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="text-[11px] tracking-[0.08em] px-3 py-2 rounded-full flex flex-col uppercase transition items-center"
          :class="item.active ? 'bg-primary/15 text-primary shadow-[0_0_20px_rgba(255,182,141,0.2)]' : 'text-slate-400 hover:text-white'"
          type="button"
        >
          <span class="material-symbols-outlined text-lg">{{ item.icon }}</span>
          <span class="mt-1">{{ item.label }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>
