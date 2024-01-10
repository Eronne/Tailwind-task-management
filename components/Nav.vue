<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>

<template>
  <nav class="container mx-auto flex items-center justify-between" aria-label="Global">
    <div class="flex lg:flex-1">
      <Logo />
    </div>

    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      <span class="text-xs uppercase">{{ locale.code }}</span>
    </NuxtLink>
  </nav>
</template>
