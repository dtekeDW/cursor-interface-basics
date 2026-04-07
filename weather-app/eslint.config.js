import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  vue: true,
  // Nuxt pulls TS transitively; explicit so ESLint enables TS parser for .vue scripts
  typescript: true,
})
